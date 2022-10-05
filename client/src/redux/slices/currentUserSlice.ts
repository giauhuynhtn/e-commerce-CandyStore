import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrentUser = {
  userId: string;
  userFitstname: string;
  permission: string;
  banStatus: boolean;
  isAdmin: boolean;
  orders: string[];
  iat: number;
  exp: number;
};

export interface CurrentUserState {
  data: CurrentUser;
}

const initialState: CurrentUserState = {
  data: {
    userId: "",
    userFitstname: "",
    permission: "",
    banStatus: false,
    isAdmin: false,
    orders: [],
    iat: 0,
    exp: 0,
  },
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.data = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
