class ReceiptUtil{

    static localData : string[] = Object.keys(localStorage);
    // 로컬스토리지의 모든 키
    static filteredData : string[] = this.localData ? this.localData.filter((e)=>e.includes(`receipt`)).sort() : [] ;
    // 로컬스토리지에서 receipt 포함하는 키
    static getAllData(): string[] {
        let returnData : string[] = [];
        this.filteredData.map((receipt)=>{
                const data = localStorage.getItem(receipt);
                // key안의 value 가져오기
                if(data){
                    // value가 있다면 JSON Parsing
                    const parsedData = JSON.parse(data);
                    console.log(parsedData);
                    returnData.push(parsedData);
                }
        })
        return returnData ; // 배열 리턴
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
console.log(ReceiptUtil.getDataByMonth('7'));

// 위의 함수들은 이중 배열을 리턴함... 쓰레기 코드

class ChartUtil {
    
    static getSalesTotal(array : string[][]): number {
        let total : number = 0;
        array.map((innerArray : string[])=>{
            innerArray.map((e : any)=>{
                total += (parseInt(e.count) * parseInt(e.price))
            })
        })
        return total;
    }
  
    static getAverage(array: string[][]): number {
        let total: number = 0;
        let count: number = 0;
      
        array.forEach((innerArray: string[]) => {
          innerArray.forEach((e: any) => {
            total += parseInt(e.count) * parseInt(e.price);
            count++;
          });
        });
      
        if (count === 0) {
          return 0;
        }
      
        const average: number = total / count;
        return average;
      }
  
      static getMaxVal(array: string[][]): number {
        let maxVal: number = Number.NEGATIVE_INFINITY;
      
        array.forEach((innerArray: string[]) => {
          innerArray.forEach((e: any) => {
            const val: number = parseInt(e.count) * parseInt(e.price);
            if (val > maxVal) {
              maxVal = val;
            }
          });
        });
      
        return maxVal;
      }
      
      static getMinVal(array: string[][]): number {
        let minVal: number = Number.POSITIVE_INFINITY;
      
        array.forEach((innerArray: string[]) => {
          innerArray.forEach((e: any) => {
            const val: number = parseInt(e.count) * parseInt(e.price);
            if (val < minVal) {
              minVal = val;
            }
          });
        });
      
        return minVal;
      }
  }

  console.log(ChartUtil.getSalesTotal(ReceiptUtil.getDataByDate('7','15')));




export{
    ChartUtil,
    ReceiptUtil,
}
// function 매출 구하기 ( 날짜 ) return '날짜'의 매출
// function 매출 평균 구하기 (시작 날짜, 종료 날짜) return 평균
// function 매출 최대 값 구하기 (시작 날짜, 종료 날짜 ) return 최대값;
// function 매출 최소 값 구하기 (시작 날짜, 종료 날짜 ) return 최대값;
// function 메뉴 이름으로 검색하기 return 배열
// function 메뉴 인덱스로 검색하기 return 배열
//
//


