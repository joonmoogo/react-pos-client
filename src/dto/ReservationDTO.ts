export type ReservationSaveDTO = {
    accountId : number,
    tableId : number,
    reservationTime : string,
    orderCode? : number,
}

export type ReservationApproveDTO = {
    id : number,
    orderCode? : number,
    reservationDenyDetail : string
}