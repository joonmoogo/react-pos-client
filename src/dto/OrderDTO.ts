export type OrderDTO = {

}

export type OrderSaveDTO = {
    accountId : number,
    tableId : number,
    orderTime? : string,
    paymentTime? : string,
    reservationTime? : string,
    orderCode : number,
    reservationDenyDetail? : string,
}