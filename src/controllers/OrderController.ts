import { OrderEditDTO, OrderSaveDTO } from "../dto/OrderDTO.ts";
import axios from "axios";

export const saveOrder = async (data : OrderSaveDTO) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token,
      }
      const response = await axios.post('/orders',null,{params:data,headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };

  export const deleteOrder = async (orderId : number) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.delete(`/orders/${orderId}`,{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      console.error('DELETE 요청 에러:', error.request.responseText);
    }
  };

  export const getOrder = async () : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get('/orders',{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

  export const editOrder = async (data : OrderEditDTO) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.patch('/orders',null,{params:data,headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };