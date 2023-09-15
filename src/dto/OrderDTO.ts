export type OrderDTO = {

}

export type OrderSaveDTO = {
    accountId : number,
    tableId : number,
    orderTime? : string,
    paymentTime? : string,
    reservationTime? : string,
    orderCode : string,
    reservationDenyDetail? : string,
}
export type OrderEditDTO = {
    id : number,
    tableId : number,
    orderTime? : string,
    paymentTime? : string,
    reservationTime? : string,
    orderCode : string,
}

export type OrderDetailSaveDTO = {
    orderId: number, 
    menuId: number,
    amount: number,
}