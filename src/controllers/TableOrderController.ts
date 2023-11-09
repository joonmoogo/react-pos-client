import axios from "axios";

export const getStoreByCoordinate = async (latitude:number, longitude:number, distance:number) : Promise<any> => {
    try {
      const response = await axios.get(`/table-orders/stores?latitude=${latitude}&longitude=${longitude}&distance=${distance}`,);
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };

  export const getMenusByTableId = async (tableId:number) : Promise<any> => {
    try {
      const response = await axios.get(`/table-orders/menus/${tableId}`,);
      const responseCode = response.status;
      console.log(responseCode);
      return response;
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };