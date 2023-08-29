import axios from "axios";
import { TableSaveDTO } from "../dto/TableDTO.ts";

export const saveTable = async (data : TableSaveDTO ) : Promise<any> => {
    try {
        const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.post('/tables',null,{params:data,headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response.data; 
    } catch (error : any) {
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };

  export const getTables = async () : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get('/tables',{headers});
      const responseCode = response.status;
      console.log(responseCode);
      console.log(response);
      return response;
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };
