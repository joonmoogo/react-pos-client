function formatPhoneNumber(phoneNumber : string) { // 01022202479 
    // 숫자 이외의 문자 모두 제거
    const cleaned : string = phoneNumber.replace(/\D/g, '');

    // 11자리인 경우만 변환 (예: 01012345678)
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
        // 다른 경우에는 그대로 반환
        return cleaned;
    }
}
function formatCurrency(amount:string) { // 10000 -> 10,000
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export{
    formatPhoneNumber,
    formatCurrency
}