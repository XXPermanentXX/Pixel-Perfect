import { FirestoreDataConverter } from "firebase/firestore";
import { User} from "./types";

// Define Firestore data converters for transforming Firestore documents to User objects
export const userDataConverter: FirestoreDataConverter<User> = {
  toFirestore: (userData: User) => {
    return {
      userId: userData.userId,
      username: userData.username,
      avatarUrl: userData.avatarUrl,
      email: userData.email,
      promptRequewst:userData.promptRequest
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      userId: data.userId,
      username: data.username,
      avatarUrl: data.avatarUrl,
      email: data.email,
      promptRequest:data.promptRequest
    };
  }
};
