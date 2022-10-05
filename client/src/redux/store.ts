import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ordersSlice from "./slices/ordersSlice";
import productsSlice from "./slices/productsSlice";
import usersSlice from "./slices/usersSlice";
import currentUserSlice from "./slices/currentUserSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    users: usersSlice,
    currentUser: currentUserSlice,
    orders: ordersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
