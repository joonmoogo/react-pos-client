import axios from "axios";

export const checkEmail = async (email : string ) : Promise<any> => {
    try {
      const response = await axios.post('/check/email',null,{params:email});
      console.log(`server response :${response.data}`);
      return response.data;
    } catch (error : any) {
      
      console.error(error);
    }
  };

  export const checkNickName = async (email : string ) : Promise<any> => {
    try {
      const response = await axios.post('/check/nickname',null,{params:email});
      console.log(`server response :${response.data}`);
      return response.data;
    } catch (error : any) {
      
      console.error(error);
    }
  };

  export const checkPhoneNumber = async (email : string ) : Promise<any> => {
    try {
      const response = await axios.post('/check/phone-number',null,{params:email});
      console.log(`server response :${response.data}`);
      return response.data;
    } catch (error : any) {
      
      console.error(error);
    }
  };
