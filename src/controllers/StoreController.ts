import axios from "axios";

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
      console.log(responseCode);
      console.log(response);
      return response.data; // 서버의 응답 데이터를 반환할 수도 있습니다.
    } catch (error : any) {
      // 에러 처리를 원한다면 여기서 처리합니다.
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

