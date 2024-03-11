import { mockGenereList, mockShowList } from "../../shared/mocks/mock-data";
import showReducer,{recievedGeneres, recievedShowList, updateError, updateSearchString} from "../showSlice";


describe("show reducer",()=>{
    it("should return the intial state when empty action is passed",()=>{
        const intialState = undefined;
        const action =  {type:""};
        const result = showReducer(intialState,action);
        expect(result).toEqual({generesList:[],showList:[],searchString:"",error:false});
    })

    it("should return the genere state when data  is passed",()=>{
        const intialState = undefined;
        const action =  recievedGeneres(mockGenereList);
        const result = showReducer(intialState,action);
        expect(result.generesList.length).toEqual(mockGenereList.length);
    })

    it("should return the tvshows state when data  is passed",()=>{
        const intialState = undefined;
        const action =  recievedShowList(mockShowList);
        const result = showReducer(intialState,action);
        expect(result.showList.length).toEqual(mockShowList.length);
    })

    it("should return the searchstring state when data  is passed",()=>{
        const intialState = undefined;
        const action =  updateSearchString("uservalue");
        const result = showReducer(intialState,action);
        expect(result.searchString).toBe("uservalue");
    })
    it("should return the error state when data  is passed",()=>{
        const intialState = undefined;
        const action =  updateError(true);
        const result = showReducer(intialState,action);
        expect(result.error).toBe(true);
    })
})