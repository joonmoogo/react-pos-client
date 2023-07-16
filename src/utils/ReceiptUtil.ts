export default class ReceiptUtil{

    static localData : string[] = Object.keys(localStorage);
    // 로컬스토리지의 모든 키
    static filteredData : string[] = this.localData ? this.localData.filter((e)=>e.includes(`receipt`)).sort() : [] ;
    // 로컬스토리지에서 receipt 포함하는 키
    static getAllData(): string[][] {
        let receipts : string[][] = [];
        this.filteredData.map((receipt)=>{
                const data = localStorage.getItem(receipt);
                // key안의 value 가져오기
                if(data){
                    // value가 있다면 JSON Parsing
                    const parsedData = JSON.parse(data);
                    receipts.push(parsedData);
                }
        })
        return receipts ; // 배열 리턴
    }

    static getDataByDate(month: string , date: string): string[][] {
        const filteredByDate = this.filteredData.filter((receipt) =>
        receipt.includes(month)&&receipt.includes(date)
        );
        let returnData: string[][] = [];
        filteredByDate.forEach((receipt) => {
          const data = localStorage.getItem(receipt);
          if (data) {
            const parsedData = JSON.parse(data);
            returnData.push(parsedData);
          }
        });
        console.log(`${month}month -${date}date data `)
        return returnData;
      }
    
      static getDataByMonth(month: string): string[][] {
        const filteredByMonth = this.filteredData.filter((receipt) =>
          receipt.includes(month)
        );
        let returnData: string[][] = [];
        filteredByMonth.forEach((receipt) => {
          const data = localStorage.getItem(receipt);
          if (data) {
            const parsedData = JSON.parse(data);
            returnData.push(parsedData);
          }
        });
        console.log(`${month} month data`)
        return returnData;
      }
}



// function 매출 구하기 ( 날짜 ) return '날짜'의 매출
// function 매출 평균 구하기 (시작 날짜, 종료 날짜) return 평균
// function 매출 최대 값 구하기 (시작 날짜, 종료 날짜 ) return 최대값;
// function 매출 최소 값 구하기 (시작 날짜, 종료 날짜 ) return 최대값;


