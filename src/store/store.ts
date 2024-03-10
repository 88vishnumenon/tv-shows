import { configureStore } from "@reduxjs/toolkit";
import showReducer from "./showSlice";

const reducer = {
    tvshow:showReducer
}

  export const store = configureStore(
    {
        reducer
    }
  )
  export function getStoreWithState(preloadedState?:RootState){
      return configureStore({reducer,preloadedState});
  }
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;