import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducere/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "cart",
  storage,
};

const cartPresistReducer = combineReducers({
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, cartPresistReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
