import TimeUtil from "./moment";

type list = string[] | string;
let timeUtil = new TimeUtil();

export default class OrderFactory{
    clickedTable : number|undefined;
    
    constructor(clickedTable : number|undefined){
        this.clickedTable = clickedTable;
    }

    static setReceipt(list : list ) : void {
        localStorage.setItem(`receipt | ${timeUtil.getMonth()}월${timeUtil.getDate()}일 | ${timeUtil.getTime()} | ${new Date()}`, JSON.stringify(list));
    }
    setOrder(list : list):void{
        localStorage.setItem(`${this.clickedTable}`,JSON.stringify(list));
    }
    setKitchenOrder(list : list):void{
        localStorage.setItem(`kitchen${this.clickedTable}`,JSON.stringify(list));
    }
}

