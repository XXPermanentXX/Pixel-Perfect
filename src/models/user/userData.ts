import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseModel";
import { User } from "./types";
import { userDataConverter } from "./userDataConverter";
import { debounce } from "lodash";

// 设置用户数据
const setUserFromDb = async (User: User) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid)
      .withConverter(userDataConverter);
      await setDoc(userDocRef, User);
      console.log("User data successfully stored.");
    } else {
      throw new Error("User not authenticated.");
    }
  } catch (error) {
    console.error("Error setting user data:", error);
  }
};

// 获取用户数据
const getUserFromDb = async (): Promise<User | null> => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid).withConverter(userDataConverter);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const User = userDocSnap.data();
        console.log("User data:", User);
        return User;
      } else {
        console.log("No such user data found.");
        return null;
      }
    } else {
      throw new Error("User not authenticated.");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// 更新用户数据
const updateUserFromDb =debounce( async (updatedData: Partial<User>) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid).withConverter(userDataConverter);
      console.log("Updating user data:", updatedData);
      await updateDoc(userDocRef, updatedData);
      console.log("User data successfully updated.");
    } else {
      throw new Error("User not authenticated.");
    }
  } catch (error) {
    console.error("Error updating user data:", error);
  }
},500)

export { getUserFromDb, updateUserFromDb, setUserFromDb };