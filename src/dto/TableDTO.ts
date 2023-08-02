export type TableDTO = {
    id : number,
    storeId : number,
    name : string,
    coordX : string,
    coordY : string,
    width : string,
    height : string,
    privateKey : string,
}

export type TableEditDTO = {
    id : number,
    name : string,
    coordX : string,
    coordY : string,
    width : string,
    height : string,
    privateKey : string,
}

export type TableSaveDTO = {
    name : string,
    coordX : string,
    coordY : string,
    width : string,
    height : string,
    privateKey : string,
}