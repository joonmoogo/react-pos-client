import axios from 'axios';
import {UserDTO, UserEditDTO, UserSaveDTO} from '../dto/UserDTO.ts'

export const saveUser = async (data : UserSaveDTO ) : Promise<any> => {
  try {
    const response = await axios.post('/users',null,{params:data});
    const responseCode = response.status;
    console.log(responseCode);
    return response.data; 
  } catch (error : any) {
    
    console.error('POST 요청 에러:', error.request.responseText);
  }
};
export const editUser = async (data : UserEditDTO) : Promise<any> => {
  try {
    let formData = new FormData();
    formData.append('nickname',data.nickname);
    formData.append('phoneNumber',data.phoneNumber);
    formData.append('paymentCard',data.paymentCard);
    formData.append('profilePhoto',data.profilePhoto);
    
    const localItem = localStorage.getItem('hknuToken');
    let access_token;
    if(localItem){
      access_token = JSON.parse(localItem);
    }
    const headers ={
      'Content-Type': 'multipart/form-data',
      'access_token' : access_token
    }
    const response = await axios.patch('/users',formData,{headers});
    const responseCode = response.status;
    console.log(responseCode);
    console.log(response);
    return response;
    
  } catch (error : any) {
    console.error('POST 요청 에러:', error.request.responseText);
  }
};

  export const getUser = async () : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get('/users',{headers});
      const responseCode = response.status;
      console.log(responseCode);
      console.log(response);
      return response.data; 
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

  export const getUserById = async (id:number) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get(`/users/${id}`,{headers});
      const responseCode = response.status;
      console.log(responseCode);
      console.log(response);
      return response.data; 
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };