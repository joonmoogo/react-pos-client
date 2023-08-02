import axios from "axios";
import { UserLoginDTO } from "../dto/UserDTO.ts";

export const authorize = async (data : UserLoginDTO ) : Promise<any> => {
    try {
      const response = await axios.post('/auth',null,{params:data});
      const responseCode = response.status;
      if(responseCode == 200){
        console.log(response.headers.access_token);
        localStorage.setItem('hknuToken',JSON.stringify(response.headers.access_token));
        alert('login good');
      }
      return response.data; // 서버의 응답 데이터를 반환할 수도 있습니다.
    } catch (error : any) {
      // 에러 처리를 원한다면 여기서 처리합니다.
      const responseCode = (error.response.status);
      if(responseCode==401){
        console.error('POST 요청 에러:', error.request.responseText);
      }
    }
  };
