import axios from "axios";
import CryptoJS from "crypto-js";

export default function send_message() {
    const serviceId = process.env.REACT_APP_NAVER_SERVICEID;
    const accessKey = process.env.REACT_APP_NAVER_ACCESSKEY;
    const secretKey = process.env.REACT_APP_NAVER_SECRETKEY;
    const my_number = '01022202479';
    const your_number = '01022202479'
    const date = Date.now().toString();
    const method = "POST";
    const endpoint = `/sms/v2/services/${serviceId}/messages`;
    const space = " ";
    const newLine = "\n";

    // HMAC 암호화 알고리즘을 HmacSHA256로 변경
    var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
	hmac.update(method);
	hmac.update(space);
	hmac.update(endpoint);
	hmac.update(newLine);
	hmac.update(date);
	hmac.update(newLine);
	hmac.update(accessKey);

	var hash = hmac.finalize();
    console.log(hash.toString(CryptoJS.enc.Base64));


    // Axios를 사용하여 프록시를 통해 API 요청 보내기
    axios({
        method,
        url: endpoint,
        baseURL: process.env.REACT_APP_API_PROXY,
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "x-ncp-apigw-timestamp": date,
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-signature-v2": hash,
        },
        data: {
            type: "SMS",
            countryCode: "82",
            from: my_number,
            content: '테스트',
            messages: [
                { to: your_number },
            ],
        },
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    });
}