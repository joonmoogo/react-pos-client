import React, { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { emailAuthorize } from '../controllers/AuthController'

function WildCardPage(){
    const [emailAuthrorization,setEmailAuthorization] = useState(false);
    const location = useLocation();
    if(location.pathname.length>100){
        console.log(location.pathname);
        const token = location.pathname.substring(1);
        emailAuthorize({token:token}).then((data)=>{
            if(data){
                setEmailAuthorization(true);
            }
        })
    }
    return(
        <>
            {emailAuthrorization==true?<div>이메일 인증됨</div>:<div>404</div>}
        </>
    )
}

export default WildCardPage