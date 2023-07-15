const SAMPLE = [
        {
            date:'2022-07-24',
            time:'4:54 PM',
            product: "마징가",
            option: "메인 메뉴",
            price: "1234",
            count: '6',
            tableNumber: 1,
            timestamp: 1689150320509,
        },
        {
            date:'2022-07-25',
            time : '4:55 PM',
            product: "마마마",
            option: "사이드 메뉴",
            price: "2345",
            count: '3',
            tableNumber: 1,
            timestamp: 1689150320509,
        },
        {
            date:'2022-07-25',
            time : '4:55 PM',
            product: "마마마",
            option: "사이드 메뉴",
            price: "2345",
            count: '3',
            tableNumber: 1,
            timestamp: 1689150320509,
        },
        {
            date:'2022-07-26',
            time : '4:56 PM',
            product: "마마마이",
            option: "사이드 메뉴",
            price: "3456",
            count: '3',
            tableNumber: '1',
            timestamp: 1689150320509,
        }    
    ]
    let localData = Object.keys(localStorage);
    console.log(localData);
    let filtered = localData ? localData.filter((e)=>e.includes('receipt')).sort() : [] ;
    const sampledata = filtered;
    
    // sample data


export default class ChartUtil{

    static getSales(date:string) : number {
        
        return 10;
    }
    static getSalesMonth(sDate:string, eDate:string) : number{
        return 2022;
    }

    static getArrayByDate(date:string) : any[] {
        let array : any[] = [];
        SAMPLE.map((e) =>{
            if(e.date === date){
                array.push(e);
            }
        })
        return array;
    }
    
    static getAverage(sTime:string, eTime:string) : void {
        let average = 0;
        SAMPLE.map((e,i)=>{

        })
    }
    static getMaxVal(stime:string, eTime:string): void{

    }
    static getMinVal(sTime:string, eTime:string): void{

    }
    static searchByName(name:string): void{

    }
    static searchByIndex(index:string): void{

    }
}   
// function 매출 구하기 ( 날짜 ) return '날짜'의 매출
// function 매출 평균 구하기 (시작 날짜, 종료 날짜) return 평균
// function 매출 최대 값 구하기 (시작 날짜, 종료 날짜 ) return 최대값;
// function 매출 최소 값 구하기 (시작 날짜, 종료 날짜 ) return 최대값;
// function 메뉴 이름으로 검색하기 return 배열
// function 메뉴 인덱스로 검색하기 return 배열
//
//


