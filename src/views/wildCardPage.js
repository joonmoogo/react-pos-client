import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { emailAuthorize } from '../controllers/AuthController'

function WildCardPage() { 
    // 주소의 파라미터 값이 설정되지 않은 값으로의 요청을 받을 때 출력하는 컴포넌트다
    // 만약에 토큰값이 입력되면 서버로 인증 요청을 보내며 인증완료 페이지를 출력한다, 그렇지 않은 경우 404페이지를 출력한다. 

    const [emailAuthrorization, setEmailAuthorization] = useState(false);
    const location = useLocation();
    if (location.pathname.length > 100) {
        console.log(location.pathname);
        const token = location.pathname.substring(1);
        emailAuthorize({ token: token }).then((data) => {
            if (data) {
                setEmailAuthorization(true);
            }
        })
    }
    return (
        <>
            {emailAuthrorization == true ? <div>이메일 인증됨</div> : <div>404</div>}
        </>
    )
}

export default WildCardPage