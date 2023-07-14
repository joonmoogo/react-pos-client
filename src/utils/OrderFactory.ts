import TimeUtil from "./moment";

type list = string[] | string;
type tableNum = number | undefined;
let timeUtil = new TimeUtil();

export default class OrderFactory{
    clickedTable : number|undefined;
    
    constructor(clickedTable : number|undefined){
        this.clickedTable = clickedTable;
    }
    getReceipt(list : list) : Receipt {
        return new Receipt(this.clickedTable, list)
    }
    getOrder(list : list) : Order {
        return new Order(this.clickedTable, list);
    }
    getKitchenOrder(list : list) : KitchenOrder {
        return new KitchenOrder(this.clickedTable, list);
    }
}

class Order{
    clickedTable : tableNum;
    list : list;

    constructor(clickedTable : tableNum ,list : list){
        this.clickedTable = clickedTable;
        this.list = list;
    }
    setLocalStorage(): void{
        localStorage.setItem(`${this.clickedTable}`,JSON.stringify(this.list));
    }
}

class KitchenOrder extends Order{
    setLocalStorage(): void {
        localStorage.setItem(`kitchen${this.clickedTable}`,JSON.stringify(this.list));
    }
}

class Receipt extends Order{
    setLocalStorage(): void {
        localStorage.setItem(`receipt | ${timeUtil.getMonth()}월${timeUtil.getDate()}일 | ${timeUtil.getTime()} | ${new Date()}`, JSON.stringify(this.list));
    }
}

