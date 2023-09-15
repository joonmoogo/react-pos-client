import { OrderDetailSaveDTO } from "../dto/OrderDTO";
import axios from "axios";

export const saveOrderDetail = async (DTO : OrderDetailSaveDTO) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.post(`/orders/details`,null,{params:DTO,headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };

  export const getOrderDetail = async (data:number) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get(`/orders/details/${data}`,{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

  export const deleteOrderDetail = async (data : number) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.delete(`/orders/details/${data}`,{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('DELETE 요청 에러:', error.request.responseText);
    }
  };
