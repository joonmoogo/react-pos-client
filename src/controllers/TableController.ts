import axios from "axios";
import { TableSaveDTO,TableListSaveDTO } from "../dto/TableDTO.ts";

export const saveTable = async (data: TableListSaveDTO): Promise<any> => {
  try {
    const localItem = localStorage.getItem('hknuToken');
    let access_token;
    if (localItem) {
      access_token = JSON.parse(localItem);
    }
    const formdata = new FormData();
    data.tableList.forEach((e, i) => {
      console.log(e);
      formdata.append(`tableList[${i}].name`, e.name);
      formdata.append(`tableList[${i}].coordX`, e.coordX);
      formdata.append(`tableList[${i}].coordY`, e.coordY);
      formdata.append(`tableList[${i}].width`, e.width);
      formdata.append(`tableList[${i}].height`, e.height);
      formdata.append(`tableList[${i}].privateKey`, e.privateKey);
    });
    console.log(data);
    const headers = {
      'access_token': access_token
    };
    console.log(data);
    console.log(data.tableList);
    const response = await axios.post('/tables',formdata,{headers});
    const responseCode = response.status;
    console.log(responseCode);
    return response.data;
  } catch (error: any) {
    console.error('POST 요청 에러:', error);
  }
};
      
      
  export const getTables = async () : Promise<any> => {
    try {
      const localItem = localStorage.getItem('hknuToken');
      let access_token;
      if(localItem){
        access_token = JSON.parse(localItem);
      }
      const headers ={
        'access_token' : access_token
      }
      const response = await axios.get('/tables',{headers});
      const responseCode = response.status;
      console.log(responseCode);
      console.log(response);
      return response;
    } catch (error : any) {
      
      console.error('GET 요청 에러:', error.request.responseText);
    }
  };
