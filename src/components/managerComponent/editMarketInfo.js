import { React } from "react";
import { TextArea, Checkbox, Button, Form } from "semantic-ui-react";

export default function EditMarketInfo() {
    return (
        <>
            <Form>
                <Form.Field>
                    <label>상호명</label>
                    <input id="company" placeholder='Name' value='행복 맥주' />
                </Form.Field>
                <Form.Field>
                    <label>오픈 시간</label>
                    <input id="openingTime" placeholder='Opening time' value='18:00pm' />
                </Form.Field>
                <Form.Field>
                </Form.Field>
                <Form.Field>
                    <label>마감 시간</label>
                    <input id='closingTime' placeholder='마감 시간' value='00:00am' />
                </Form.Field>
                <Form.Field>
                    <label>check</label>
                    <Checkbox label=' 예약 ' />
                    <Checkbox label=' 대기 ' />
                    <Checkbox label=' 실시간 조회 ' />

                </Form.Field>
                <Form.Field>
                    <label>주소</label>
                    <input id="address" placeholder='Address' value='안성시 비룡2길 32' />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Form reply >
                    <label>가게 소개</label>
                    <TextArea id='companyIntroduce' value='맥주맛집' />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => {
                        const company = document.querySelector('#company').value;
                        const openingTime = document.querySelector('#openingTime').value;
                        const closingTime = document.querySelector('#closingTime').value;
                        const address = document.querySelector('#address').value;
                        const companyIntroduce = document.querySelector('#companyIntroduce').value;
                        localStorage.setItem('company', JSON.stringify({ company: company, openingTime: openingTime, closingTime: closingTime, address: address, companyIntroduce: companyIntroduce }));
                    }} />
                </Form>
            </Form>

        </>
    )

}
