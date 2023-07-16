export default class ChartUtil {
    
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