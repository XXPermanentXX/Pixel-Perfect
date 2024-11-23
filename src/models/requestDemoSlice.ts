import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "./apiConfig";

// 在文件顶部添加接口定义
interface RequestDemoState {
    FormData: Record<string, unknown>;
    isLoading: boolean;
    isSubmitted: boolean;
}

const initialState: RequestDemoState = {
    FormData: {}, // Holds form data
    isLoading: false, // TMark as loading request start
    isSubmitted: false, // Mark as submitted on request completion
};

// 添加接口定义
interface DemoRequestParams {
    firstName: string;
    lastName: string;
    email: string;
    companySize: string;
    industry: string;
    requestContent: string;
}

export const putDemoRequest = createAsyncThunk('requestDemo/putDemoRequest', async (params: DemoRequestParams, {rejectWithValue}) => {
    const formData = JSON.stringify({
        first_name:params.firstName,
        last_name: params.lastName,
        email: params.email,
        company_size: params.companySize,
        industry: params.industry,
        product_link: params.requestContent, //Assuming this maps to a "product lin=" field.
    });

    return fetch(BASE_URL + "/put-demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                // Manually throw an error if the HTTP response is not ok
                return rejectWithValue("HTTP error! status: " + response.status);
            }
            return response.json();
        })
        .catch((error) => {
            return rejectWithValue(error.message);
        });
});


const requestDemoSlice = createSlice({
    name: "requestDemo",
    initialState,
    reducers: {
        // Initialize request state
        initializeRequest: (state: RequestDemoState,action: PayloadAction<Record<string, unknown>>) =>{
            state.FormData = action.payload;
            state.isLoading = false;
            state.isSubmitted = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(putDemoRequest.pending, (state: RequestDemoState) => {
                state.isLoading = true;
                state.isSubmitted = false;
            })
            .addCase(putDemoRequest.fulfilled, (state: RequestDemoState) => {
                state.isLoading = false;
                state.isSubmitted = true;
            })
            .addCase(putDemoRequest.rejected, (state: RequestDemoState) => {
                state.isLoading = false;
                state.isSubmitted = false;
            });
    },
});

// Export the action creators for  submitting a request
export const { initializeRequest } = requestDemoSlice.actions;
export default requestDemoSlice.reducer;
