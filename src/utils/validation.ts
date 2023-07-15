export default class Validator{
    static isIdValid(id:string) : boolean{
        const usernameRegex : RegExp = /^[a-zA-Z0-9]{5,20}$/;
        return usernameRegex.test(id);
    }
    static isPasswordValid(password:string) : boolean{
        const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;
        return passwordRegex.test(password);
    }
    static isEmailValid(email:string) : boolean{
        const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    }
    static isPhonenumberValid(phonenumber:string) : boolean{
        const phoneNumberRegex: RegExp = /^01([0|1|6|7|8|9])-?\d{3,4}-?\d{4}$/;
        return phoneNumberRegex.test(phonenumber);
    }
}

