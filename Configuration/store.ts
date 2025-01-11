import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import agencySlice from "./agencySlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Create a storage fallback for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, _value: string) {
      return Promise.resolve();
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Use localStorage in the browser or noopStorage in SSR
const storageFallback =
  typeof window !== "undefined" ? storage : createNoopStorage(); // Use noopStorage on the server

// Combine all reducers
const rootReducer = combineReducers({
  user: userSlice,
  agency: agencySlice,
});

// Persist configuration
const persistConfig = {
  key: "root", // The key for persisted state
  storage: storageFallback, // Use the appropriate storage
  version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const myStore = configureStore({
  reducer: persistedReducer, // Use the persisted reducer as the root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create a persistor only on the client side to avoid SSR issues
let persistor: any;
if (typeof window !== "undefined") {
  persistor = persistStore(myStore);
}

export { persistor };
export default myStore;

// Export RootState and AppDispatch types for usage in TypeScript
export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
