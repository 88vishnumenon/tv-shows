import { PayloadAction,createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { TVShow } from "../types/types";

export interface ShowState{
  showList:TVShow[];
  generesList:string[]
}

const initialState:ShowState ={
    showList:[],
    generesList:[]

}
const showSlice = createSlice({
  name:"shows",
  initialState,
  reducers:{
    recievedGeneres(state,action: PayloadAction<string[]>){
        const genereList = action.payload;
        state.generesList = genereList;
        //["Drama","Comedy"];
        //genereList;
    },
    recievedShowList(state,action: PayloadAction<TVShow[]>){
        const showList = action.payload;
        state.showList = showList;
    }
  }
})

export default showSlice.reducer;
export const {recievedGeneres, recievedShowList} = showSlice.actions;