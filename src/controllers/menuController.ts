import { MenuSaveDTO } from "../dto/MenuDTO.ts";
import axios from "axios";
export const saveMenu = async (data : MenuSaveDTO) : Promise<any> => {
    try {
      let formData = new FormData();
      formData.append('name',data.name);
      formData.append('price',data.price);
      formData.append('photo',data.photo);
      formData.append('category',data.category);
      formData.append('detail',data.detail);
      
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'Content-Type': 'multipart/form-data',
        'access_token' : access_token
      }
      const response = await axios.post('/menus',formData,{headers});
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
  export const getMenuById = async (id : number) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get(`/menus/${id}`,{headers});
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