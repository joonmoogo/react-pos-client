export type UserDTO = {
    email : string,
    password : string,
    nickname : string,
    phoneNumber : string,
    wishList : string,
    couponList : string,
    paymentCard : string,
}

export type UserSaveDTO = {
    email : string,
    password : string,
    nickname : string,
    phoneNumber : string,
}

export type UserEditDTO = {
    nickname : string,
    phoneNumber : string,
    paymentCard:any,
    profilePhoto:any,
}

export type UserLoginDTO = {
    email : string,
    password : string,
}
