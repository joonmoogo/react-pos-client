import { MenuSaveDTO } from "../dto/MenuDTO.ts";
import axios from "axios";
export const saveMenu = async (data : MenuSaveDTO) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.post('/menus',null,{params:data,headers});
      const responseCode = response.status;
      console.log(responseCode);
      console.log(response);
      return response;
      
    } catch (error : any) {
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };

  export const getMenus = async () : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get('/menus',{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

  export const deleteMenu = async (data : number) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.delete(`/menus/${data}`,{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('DELETE 요청 에러:', error.request.responseText);
    }
  };