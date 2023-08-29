import axios from "axios";
import { ReservationApproveDTO, ReservationSaveDTO } from "../dto/ReservationDTO.ts";

export const getReservations = async () : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get('/reservations',{headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

  export const saveReservation = async (data : ReservationSaveDTO) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.post('/reservations',null,{params:data,headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };

  export const approve = async (data : ReservationApproveDTO) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.post('/reservations/approve',null,{params:data,headers});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };

