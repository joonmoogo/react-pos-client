import React from "react"
import { Message } from "semantic-ui-react"

export function LoginErrorMessage(){
    return(
        <Message className="fade-in" negative>
            <Message.Header>로그인에 실패했습니다.</Message.Header>
            <Message.List>
            <Message.Item>이메일과 비밀번호를 확인하세요</Message.Item>
            <Message.Item>You can check your email or password</Message.Item>
            </Message.List>
        </Message>
    )
} 