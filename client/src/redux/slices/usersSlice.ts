import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersThunk } from "services/thunks.services";

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

export default usersSlice.reducer;
