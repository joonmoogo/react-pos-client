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
    name : any,
    latitude:any,
    longitude:any,
    address : any,
    info : any,
    phoneNumber:any,
    canReservation:any,
    operatingTime : any,
    profilePhoto:any,
    storeCategory:any,
}

export type StoreEditDTO={
    name : any,
    latitude:any,
    longitude:any,
    address : any,
    info : any,
    phoneNumber:any,
    canReservation:any,
    operatingTime : any,
    profilePhoto:any,
    storeCategory:any,
}

export type StoreOpenDTO = {
    id: number,
    isOpen : boolean,
}

