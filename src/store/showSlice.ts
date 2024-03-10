import { PayloadAction,createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { TVShow } from "../types/types";

export interface ShowState{
  showList:TVShow[];
  generesList:string[]
  searchString:string
  error:boolean
}

const initialState:ShowState ={
    showList:[],
    generesList:[],
    searchString:"",
    error:false


}
const showSlice = createSlice({
  name:"shows",
  initialState,
  reducers:{
    recievedGeneres(state,action: PayloadAction<string[]>){
        const genereList = action.payload;
        state.generesList = genereList;

    },
    recievedShowList(state,action: PayloadAction<TVShow[]>){
        const showList = action.payload;
        state.showList = showList;
        state.error = false;
    },
    updateSearchString(state,action:PayloadAction<string>){
        const searchString = action.payload;
        state.searchString = searchString;
        state.error = false;
    },
    updateError(state,action:PayloadAction<boolean>){
       const errorValue = action.payload;
       state.error = errorValue;
    }
  }
})

export default showSlice.reducer;
export const {recievedGeneres, recievedShowList,updateSearchString, updateError} = showSlice.actions;