const SAMPLE = [
        {
            date:'2022-07-24',
            time:'4:54 PM',
            product: "마징가",
            option: "메인 메뉴",
            price: "1234",
            count: 6,
            tableNumber: 1,
            time: 1689150320509,
        },
        {
            date:'2022-07-25',
            time : '4:55 PM',
            product: "마마마",
            option: "사이드 메뉴",
            price: "2345",
            count: 3,
            tableNumber: 1,
            time: 1689150320509,
        },
        {
            date:'2022-07-25',
            time : '4:55 PM',
            product: "마마마",
            option: "사이드 메뉴",
            price: "2345",
            count: 3,
            tableNumber: 1,
            time: 1689150320509,
        },
        {
            date:'2022-07-26',
            time : '4:56 PM',
            product: "마마마이",
            option: "사이드 메뉴",
            price: "3456",
            count: 3,
            tableNumber: 1,
            time: 1689150320509,
        }    
    ]

const chartUtil = {

    getSales : (date) => {
        let total = 0;
        SAMPLE.map((e)=>{
            if(e.date === date) {
                total += (parseInt(e.count) * parseInt(e.price));
            }
        })
        return total;
    },

    getArrayByDate: (date) => {
        let array = [];
        SAMPLE.map((e) =>{
            if(e.date === date){
                array.push(e);
            }
        })
        return array;
    },
    
    getAverage : (sTime, eTime) => {
        let average = 0;
        SAMPLE.map((e,i)=>{

        })
    },
    getMaxVal : (stime, eTime) => {

    },
    getMinVal : (sTime, eTime) => {

    },
    searchByName : (name) => {

    },
    searchByIndex : (index) => {

    },



}   
// function 매출 구하기 ( 날짜 ) return '날짜'의 매출
// function 매출 평균 구하기 (시작 날짜, 종료 날짜) return 평균
// function 매출 최대 값 구하기 (시작 날짜, 종료 날짜 ) return 최대값;
// function 매출 최소 값 구하기 (시작 날짜, 종료 날짜 ) return 최대값;
// function 메뉴 이름으로 검색하기 return 배열
// function 메뉴 인덱스로 검색하기 return 배열
//
//

console.log(chartUtil.getSales('2022-07-25'))
console.log(chartUtil.getArrayByDate('2022-07-25'))

export default chartUtil;