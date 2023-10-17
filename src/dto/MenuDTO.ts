export type MenuDTO = {
    id : number,
    storeId : number,
    photo?: string,
    name : string,
    price : string,
    category : string,
}

export type MenuSaveDTO = {
    name : string,
    price : string,
    category : string,
    detail : string,
    photo : any,
}
