import { BASE_URL } from "@/models/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, formState } from "./types";



// Define the initial state for the authentication part of the Redux store
const initialState : AuthState = {
    isLoggedIn: false, // Tracks whether the user is logged in
    isLoading: false, // Indicates if an async operation is in progress
    error: null, // Holds error messages, if any
    adminKey: null , // Holds the authentication token or key
}

// Async thunk for validating login credentials
export const validateLogin = createAsyncThunk<string,formState,{ rejectValue: string}>(
    "auth/validateLogin",
    async ({username,password},{rejectWithValue}) => {
        const formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);

        // Attempt to POST login credentials to the server
        try {
            const res = await fetch(BASE_URL + "admin/validate",{
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                // Manually throw an error if the HTTP response is not ok
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();

            if (!data.success) {
                const errorMessage = 
                    data.messgae === "Invalid credentials provided. Access denied."
                        ? "The username or password is incorrect."
                        : data.message;
                throw new Error(errorMessage);
            }

            return data.admin_id;
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
);

// Slice definition for authentication
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState, 
    reducers: {
        // Initialize auth state from a cookie or persisted state
        initialStateFromCookie: (state, action) => {
            state.adminKey = action.payload;
            state.isLoggedIn = !!action.payload;
        },
        // Handle user logout
        logout: (state) => {
            state.isLoggedIn = false;
            state.adminKey = null;
            state.error = null;
        },
        // clear any authentication errors
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(validateLogin.pending,(state) => {
                state.isLoading = false; //Mark as loading on request start
            })
            .addCase(validateLogin.fulfilled,(state,action) => {
                state.isLoading = false; // Remove loading indicator on success
                state.isLoggedIn = true; // Set login status to true 
                state.adminKey = action.payload; //Store the admin key
                state.error = null;
            })
            .addCase(validateLogin.rejected,(state,action) => {
                console.log("Rejected action:", action.payload);
                state.isLoading = false; // Remove loaing indicatior on failure 
                state.error = action.payload; //Store the error message from the rejected action
                console.log(action.payload);
            })
    },
});


// Export the action creators 
export const {initialStateFromCookie,logout,clearError} = authSlice.actions

// Export the reducer as the default export
export default authSlice.reducer;