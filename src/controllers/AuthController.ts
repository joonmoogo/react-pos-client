import axios from "axios";
import { UserLoginDTO } from "../dto/UserDTO.ts";

export const authorize = async (data : UserLoginDTO ) : Promise<any> => {
    try {
      const response = await axios.post('/auth',null,{params:data});
      const responseCode = response.status;
      if(responseCode == 200){
        console.log(response.headers.access_token);
        localStorage.setItem('hknuToken',JSON.stringify(response.headers.access_token));
        alert('accepted');
      }
      return true; 
    } catch (error : any) {
      
      const responseCode = (error.response.status);
      if(responseCode==401){
        console.error('POST 요청 에러:', error.request.responseText);
      }
      return false;
    }
  };
