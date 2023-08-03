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
      return response.data; 
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

