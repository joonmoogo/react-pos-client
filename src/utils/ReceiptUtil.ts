export default class ReceiptUtil{

  static localData : string[] = Object.keys(localStorage);
  static filteredData : string[] = this.localData ? this.localData.filter((e)=>e.includes(`receipt`)).sort() : [] ;

  static filterByDate(month:string,date:string):string[]{
    return this.filteredData.filter((receipt) =>
    receipt.includes(`${month}월`)&&receipt.includes(`${date}일`)
  );
  }

  static filterByMonth(month:string) : string[]{
    return this.filteredData.filter((receipt) =>
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
