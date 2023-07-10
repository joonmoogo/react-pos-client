import { React } from "react";
import { Checkbox, Button, Form } from "semantic-ui-react";


export default function EditUserInfo() {
    return (
        <Form>
            <Form.Field>
                <label>닉네임</label>
                <input placeholder='First Name' value='람머스' />
            </Form.Field>
            <Form.Field>
                <label>현재 비밀번호</label>
                <input placeholder='present password' />
            </Form.Field>
            <Form.Field>
            </Form.Field>
            <Form.Field>
                <label>변경 비밀번호</label>
                <input placeholder='password' />
            </Form.Field>
            <Form.Field>
                <label>변경 비밀번호 확인</label>
                <input placeholder='password check' />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Form.Field>
                <label>이메일</label>
                <input placeholder='E-mail' />
            </Form.Field>
            <Form.Field>
                <label>전화번호</label>
                <input placeholder='Phone-number' />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>변경</Button>
        </Form>
    )
}
