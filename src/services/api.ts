import { AxiosResponse } from "axios";
import axios from "../shared/services/interceptor";
import { TVShowDetailValues, TVShowDetails } from "../types/types";



export const  listallTvShows = async() : Promise<TVShowDetailValues[]>=>{
 const results = await axios.get("/shows");
 return results.data;
}

export const  listShowsBySearch= async(searchValue:string) : Promise<TVShowDetails[]>=>{
    const results = await axios.get(`/search/shows?q=${searchValue}`);
    return results.data;
   }