export type StoreDTO = {
    id : number,
    accountId : number,
    name : string,
    address : string,
    info : string,
    phoneNumber : string,
    canReservation : boolean,
    operatingTime : string,
    isOpen : string,
}

export type StoreSaveDTO = {
    name : string,
    address : string,
    info : string,
    operatingTime : string,
}

