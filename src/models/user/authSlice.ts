import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  User as FirebaseUser,
  inMemoryPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";

import { Status } from "@/models/types";
import { auth } from "../firebaseModel";
import { User } from "./types";
import { getUserFromDb, setUserFromDb, updateUserFromDb } from "./userData";
import { generateRandomAvatarURL, generateRandomUsername } from "./utils";
import { BASE_URL } from "../apiConfig";
import { INITIAL_PROMPT, PRODUCT_LIST, STYLE_LIST } from "../staticDataModel";
// Define the authentication state interface
interface AuthState {
  user: User | null; // Current user
  authState: Status; // Loading state
  resetEmailState: Status | 'wait'; // Reset email state
  adminKey:string | null, // Holds the authentication token or key
}

// Initial authentication state
const initialState: AuthState = {
  user: null,
  authState: "idle",
  resetEmailState: "idle",
  adminKey: null, // Holds the authentication token or key
};
export const  validateLogin = createAsyncThunk("auth/validateLogin", 
  async ({ username, password }:{
    username:string,
    password:string
  }, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  // Attempt to POST login credentials to the server
  return fetch(BASE_URL + "/admin/validate", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        // Manually throw an error if the HTTP response is not ok
        return rejectWithValue(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (!data.success) {
        return rejectWithValue(data.message === "Invalid credentials provided. Access denied." ? "The username or password is incorrect." : data.message);
      }
      return data.admin_id;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

// Sign in
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({
    email,
    password,
    isRememberMe,
  }: {
    email: string;
    password: string;
    isRememberMe: boolean;
  }, { rejectWithValue }) => {
    try {
      console.log(email,password);
      if (isRememberMe) {
        await setPersistence(auth, browserLocalPersistence); // Keep the user logged in
      } else {
        await setPersistence(auth, inMemoryPersistence); // Do not keep the user logged in
      }

      // Attempt to sign in with email and password using Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // If the user does not exist, catch the exception and register
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        try {
          
          // Register and sign in the user
          await createUserWithEmailAndPassword(auth, email, password);
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          return rejectWithValue(error);
        }
      }
      else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Sign out
export const logout = createAsyncThunk("auth/logout", async () => {
  // Sign out using Firebase
  await signOut(auth);
});

export const sendPasswordReset = createAsyncThunk(
  "auth/sendPasswordReset",
  async (email: string) => {
    let lastRequestTime: number | null = parseInt(localStorage.getItem('lastRequestTime') || '0', 10);
    const THROTTLE_TIME = 60 * 1000;
    const currentTime = Date.now();

    if (lastRequestTime && currentTime - lastRequestTime < THROTTLE_TIME) {
      throw new Error('wait');
    }

    await sendPasswordResetEmail(auth, email);

    lastRequestTime = currentTime;
    localStorage.setItem('lastRequestTime', lastRequestTime.toString());
  }
);

// Update user data
export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (updatedData: Partial<User>) => {
    console.log('updatedData', updatedData);
    await updateUserFromDb(updatedData);
    return updatedData;
  }
);

// Get user data
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (user: FirebaseUser) => {
    // Check if there is user data in the database
    let userData = await getUserFromDb();

    if (!userData) {
      // If there is no user data in the database, create data for the new user
      userData = {
        userId: user.uid,
        username: generateRandomUsername(),
        avatarUrl: generateRandomAvatarURL(),
        email: user.email!,
        promptRequest:INITIAL_PROMPT,
      };

      await setUserFromDb(userData);
    }

    // Return existing or newly created user data
    return userData;
  }
);
// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState (state) {
      state.authState = "idle";
      state.resetEmailState = "idle";
    },
    initializeAuthFromCookie: (state, action) => {
      state.adminKey = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      // Handle sign-in state
      .addCase(signIn.pending, (state) => {
        state.authState = "loading";
      })

      .addCase(signIn.rejected, (state) => {
        state.authState = "failed";
      })

      // Handle sign-out state
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.authState = "idle"
      })

      // Handle update user data state
      .addCase(updateUserData.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })

      // Handle get user data state
      .addCase(getUserData.fulfilled, (state, action) => {
        state.authState = "succeeded";
        state.user = action.payload;
      })

      .addCase(sendPasswordReset.pending, (state) => {
        state.resetEmailState = "loading";
      })

      .addCase(sendPasswordReset.fulfilled, (state) => {
        state.resetEmailState = "succeeded";
      })

      .addCase(sendPasswordReset.rejected, (state, action) => {
        if (action.error.message === 'wait') {
          state.resetEmailState = 'wait';
        } else {
          state.resetEmailState = 'failed';
        }
      })
      .addCase(validateLogin.fulfilled, (state, action) => {
        state.adminKey = action.payload; // Store the admin key
      })
  },
});

// Export the reducer
export default authSlice.reducer;
export const { resetAuthState,initializeAuthFromCookie} = authSlice.actions;
