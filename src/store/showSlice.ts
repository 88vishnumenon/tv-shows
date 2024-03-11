import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { TVShow } from "../types/types";

export interface ShowState {
  showList: TVShow[];    // all the shows listed to the user
  generesList: string[]; // all the generes listed to the user
  searchString: string;  // search text provided by the user  
  error: boolean;        // error state of the application
}

const initialState: ShowState = {
  showList: [],
  generesList: [],
  searchString: "",
  error: false,
};
const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    recievedGeneres(state, action: PayloadAction<string[]>) {
      const genereList = action.payload;
      state.generesList = genereList;
      state.error = false;
    },
    recievedShowList(state, action: PayloadAction<TVShow[]>) {
      const showList = action.payload;
      state.showList = showList;
      state.error = false;
    },
    updateSearchString(state, action: PayloadAction<string>) {
      const searchString = action.payload;
      state.searchString = searchString;
      state.error = false;
    },
    updateError(state, action: PayloadAction<boolean>) {
      const errorValue = action.payload;
      state.error = errorValue;
    },
  },
});

export default showSlice.reducer;
export const {
  recievedGeneres,
  recievedShowList,
  updateSearchString,
  updateError,
} = showSlice.actions;
