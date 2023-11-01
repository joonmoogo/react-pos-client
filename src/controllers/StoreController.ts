import axios from "axios";
import { StoreSaveDTO,StoreOpenDTO, StoreEditDTO } from "../dto/StoreDTO.ts";

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
      console.log(response);
      return response;
    } catch (error : any) {
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

  export const getStore = async () : Promise<any> => {
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
      console.log(response);
      return response;
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

  export const saveStores = async (data : StoreSaveDTO) : Promise<any> => {
    let formData = new FormData();
    formData.append('name',data.name);
    formData.append('latitude',data.latitude);
    formData.append('longitude',data.longitude);
    formData.append('address',data.address);
    formData.append('info',data.info);
    formData.append('phoneNumber',data.phoneNumber);
    formData.append('canReservation',data.canReservation);
    // formData.append('operatingDays',data.operatingTime);
    formData.append('profilePhoto',data.profilePhoto);
    formData.append('storeCategory',data.storeCategory);
    
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'Content-Type': 'multipart/form-data',
        'access_token' : access_token
      }
      const response = await axios.post('/stores',formData,{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('POST 요청 에러:', error.request.responseText);
      console.error(error);
    }
  };
  export const editStores = async (data : StoreEditDTO) : Promise<any> => {
    let formData = new FormData();
    formData.append('name',data.name);
    formData.append('latitude',data.latitude);
    formData.append('longitude',data.longitude);
    formData.append('address',data.address);
    formData.append('info',data.info);
    formData.append('phoneNumber',data.phoneNumber);
    formData.append('canReservation',data.canReservation);
    formData.append('operatingDays',data.operatingTime);
    formData.append('profilePhoto',data.profilePhoto);
    formData.append('storeCategory',data.storeCategory);
    
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'Content-Type': 'multipart/form-data',
        'access_token' : access_token
      }
      const response = await axios.post('/stores',formData,{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('POST 요청 에러:', error.request.responseText);
      console.error(error);
    }
  };

  export const setOpen = async (data : StoreOpenDTO) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.post('/stores/open',null,{params:data,headers});
      const responseCode = response.status;
      console.log(responseCode);
      console.log(response);
      return response;
      
    } catch (error : any) {
      
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };