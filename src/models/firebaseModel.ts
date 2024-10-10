import { firebaseConfig } from "./apiConfig";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  onValue,
  remove,
  child,
} from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { GeneratedImage } from "./types";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const setHistoryImageData = (urlList: GeneratedImage[]) => {
  const historyRef = ref(db, "history");
  urlList.forEach(({ url }) => {
    push(historyRef, {
      id: uuidv4(),
      url: url,
      date: new Date().toISOString(),
    });
  });
};

const deleteHistoryImageDataByURL = async (imageUrl: string) => {
  const historyRef = ref(db, "history");

  try {
    // Fetch all history data
    const snapshot = await get(historyRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Find the entry key that matches the given URL
      const entryKey = Object.keys(data).find(
        (key) => data[key].url === imageUrl
      );

      if (entryKey) {
        // Remove the matching entry
        await remove(child(historyRef, entryKey));
        console.log(`Image with URL ${imageUrl} deleted successfully`);
      } else {
        console.log(`No image found with URL ${imageUrl}`);
      }
    } else {
      console.log("No history data found.");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

const getHistoryImageData = (setImageList: Function) => {
  const historyRef = ref(db, "history");
  onValue(historyRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const sortedData = (Object.values(data) as GeneratedImage[]).sort(
        (a: GeneratedImage, b:GeneratedImage) => +new Date(b.date) - +new Date(a.date)
      );
      const imageList = sortedData.map((item) => ({ src: item.url }));
      setImageList(imageList);
    } else {
      setImageList([]);
    }
  });
};

export { setHistoryImageData, getHistoryImageData, deleteHistoryImageDataByURL, };
