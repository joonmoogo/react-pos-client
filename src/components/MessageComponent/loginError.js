import React, { useEffect, useState } from "react"
import { Message } from "semantic-ui-react"

export function LoginErrorMessage(prop){
    const [errorMsg,setErrorMsg] = useState(prop.msg);
    console.log(errorMsg);
    return(
        <Message className="bounce" negative>
            <Message.Header>{errorMsg}</Message.Header>
            <Message.List>
            <Message.Item>이메일과 비밀번호를 확인하세요</Message.Item>
            <Message.Item>You can check your email or password</Message.Item>
            </Message.List>
        </Message>
    )
} 