import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducere/cartSlice"; // Correct path
import foodSlice from "./reducere/foodSlice"; // Correct path
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartSlice,
  food: foodSlice,
  // Add other reducers here if you have them
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
