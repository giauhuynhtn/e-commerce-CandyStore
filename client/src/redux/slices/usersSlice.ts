import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
  firstname: string;
  lastname: string;
  email: string;
  username?: string;
  password?: string;
  orders: string[];
  isBanned: boolean;
};

export interface UsersState {
  items: User[];
  isLoading: boolean;
}

const initialState: UsersState = {
  items: [],
  isLoading: false,
};

const path = "http://localhost:4000/api/v1/users";

const fetchUsersThunk = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(path);
  return { data: response.data, status: response.status };
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.isLoading = false;
    });
  },
});

export { fetchUsersThunk };

export default usersSlice.reducer;
