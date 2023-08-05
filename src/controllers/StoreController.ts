import axios from "axios";
import { StoreSaveDTO } from "../dto/StoreDTO.ts";

export const getStores = async () : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get('/stores',{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

  export const saveStores = async (data : StoreSaveDTO) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.post('/stores',null,{params:data,headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };
