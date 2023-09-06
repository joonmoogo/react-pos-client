import { React } from "react";


export default function QrCode(props) {
    let item = props.item;
    console.log(item);
    return (
        <div className="slide-from-right">
            {item.map((e, i) => {
                return (
                    <h3>{`${i + 1}번 테이블 localHost:3000/home/order/${e.privateKey}`}</h3>
                )
            })}

            <a href="https://ko.online-qrcode-generator.com/">qr생성사이트</a>
            <h1>qr은 셀프</h1>
        </div>
    )
}
