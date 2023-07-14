import TimeUtil from "./moment.ts";
type list = string[] | string;

export default class ReceiptFactory{
    static setReceipt(list : list ) : void {
        localStorage.setItem(`receipt | ${TimeUtil.getMonth()}월${TimeUtil.getDate()}일 | ${TimeUtil.getTime()} | ${new Date()}`, JSON.stringify(list));
    }
}