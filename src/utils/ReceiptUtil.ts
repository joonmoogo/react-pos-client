export default class ReceiptUtil{

  static getLocalData() : string[]{
    const data = Object.keys(localStorage);
    if(data){
      return data;
    }
    throw Error('localStorage is empty');

  }
  static getFilteredData() : string[] {
    const data = this.getLocalData();
    return data ? data.filter((e)=>e.includes(`receipt`)).sort() : [] ;
  }

  static filterByDate(month:string,date:string):string[]{
    const data = this.getFilteredData();
    return data.filter((receipt) =>
    receipt.includes(`${month}월`)&&receipt.includes(`${date}일`)
  );
  }

  static filterByMonth(month:string) : string[]{
    const data = this.getFilteredData();
    return data.filter((receipt) =>
    receipt.includes(`${month}월`)
  );
  }

  static parse(array : string[]) : string[][]{
    let returnData : string[][] = [];
    array.forEach((receipt) => {
      const data = localStorage.getItem(receipt);
      if (data) {
        const parsedData = JSON.parse(data);
        returnData.push(parsedData);
      }
    });
    return returnData;
  }
}
