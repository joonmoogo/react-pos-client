import React from "react"
import { Message } from "semantic-ui-react"

export function LoginErrorMessage(){
    return(
        <Message negative>
            <Message.Header>로그인에 실패했습니다.</Message.Header>
            <Message.List>
            <Message.Item>이메일과 비밀번호 체크하세요</Message.Item>
            <Message.Item>You can check your email or password</Message.Item>
            </Message.List>
        </Message>
    )
}