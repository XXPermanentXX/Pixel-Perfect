import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// 定义 App 状态类型
interface AppState {
  isExpanded: boolean; // 控制 Sidebar 展开或折叠
}

// 定义初始状态
const initialState: AppState = {
  isExpanded: true, // Sidebar 默认展开
};

// 创建 AppSlice
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // 设置 Sidebar 展开或折叠状态
    setSidebarExpanded: (state, action: PayloadAction<boolean>) => {
      state.isExpanded = action.payload;
    },
  },
});

// 导出 actions 和 reducer
export const { setSidebarExpanded } = appSlice.actions;
export default appSlice.reducer;
