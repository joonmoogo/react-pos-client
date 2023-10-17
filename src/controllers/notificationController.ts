import axios from "axios";

export const serverConnect = async (eventTargetId:number) : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      const storeId = localStorage.getItem('storeId');
      const message = 'SERVER_CONNECT';
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token,
      }
      const data ={
        targetSSEId:storeId,
        sseEvent:message,
        eventTargetId:eventTargetId
      }
      const response = await axios.post('/notifications',null,{params:data});
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      console.error('POST 요청 에러:', error.request.responseText);
    }
  };