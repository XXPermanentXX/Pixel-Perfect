import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { GeneratedImage } from "../types";
import { db } from "@/models/firebaseModel";

const setHistoryImageData = async (urlList: GeneratedImage[], userId: string) => {
  const historyRef = collection(db, "users", userId, "history");
  
  const promises = urlList.map(({ url }) => {
    return addDoc(historyRef, {
      id: uuidv4(),
      url: url,
      date: new Date().toISOString(),
    });
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error("Error adding images to history:", error);
  }
};

const deleteHistoryImageDataByURL = async (imageUrl: string, userId: string) => {
  const historyRef = collection(db, "users", userId, "history");

  try {
    const q = query(historyRef, where("url", "==", imageUrl));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      await deleteDoc(doc.ref);
      console.log(`Image with URL ${imageUrl} deleted successfully`);
    } else {
      console.log(`No image found with URL ${imageUrl}`);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

const getHistoryImageData = (setImageList: Function, userId: string) => {
  const historyRef = collection(db, "users", userId, "history");
  const q = query(historyRef, orderBy("date", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const imageList = snapshot.docs.map(doc => ({
        src: doc.data().url
      }));
      setImageList(imageList);
    } else {
      setImageList([]);
    }
  });

  // Return unsubscribe function for cleanup
  return unsubscribe;
};

export { setHistoryImageData, getHistoryImageData, deleteHistoryImageDataByURL };