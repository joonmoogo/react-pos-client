import { React, useEffect,useState } from "react";
import { TextArea, Checkbox, Button, Form } from "semantic-ui-react";
import { getStores, saveStores } from "../../controllers/StoreController.ts";

export default function EditMarketInfo() {

    useEffect(()=>{
        getStores().then((response)=>{
            const userData = response.data[0];
            console.log(userData);
            setCompany(userData.name);
            setCompanyIntroduce(userData.info);
            setAddress(userData.address);
            setOpeningTime(userData.operatingTime.split('-')[0]);
            setClosingTime(userData.operatingTime.split('-')[1]);
        }).catch((error)=>{
            console.error(error);
        })
    },[])

    const [company,setCompany] = useState();
    const [openingTime,setOpeningTime] = useState();
    const [closingTime,setClosingTime] = useState();
    const [address,setAddress] = useState();
    const [companyIntroduce,setCompanyIntroduce] = useState();
    return (
        <>
            <Form>
                <Form.Field>
                    <label>상호명</label>
                    <input id="company" placeholder='Name' value={company} onChange={(event)=>{
                        setCompany(event.target.value);
                    }} />
                </Form.Field>
                <Form.Field>
                    <label>오픈 시간</label>
                    <input id="openingTime" placeholder='Opening time' value={openingTime} onChange={(event)=>{
                        setOpeningTime(event.target.value);
                    }} />
                </Form.Field>
                <Form.Field>
                </Form.Field>
                <Form.Field>
                    <label>마감 시간</label>
                    <input id='closingTime' placeholder='Closing time' value={closingTime} onChange={(event)=>{
                        setClosingTime(event.target.value);
                    }}/>
                </Form.Field>
                <Form.Field>
                    <label>check</label>
                    <Checkbox label=' 예약 ' />
                    <Checkbox label=' 대기 ' />
                    <Checkbox label=' 실시간 조회 ' />

                </Form.Field>
                <Form.Field>
                    <label>주소</label>
                    <input id="address" placeholder='Address' value={address} onChange={(event)=>{
                        setAddress(event.target.value);
                    }} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Form reply >
                    <label>가게 소개</label>
                    <TextArea id='companyIntroduce' value={companyIntroduce} onChange={(event)=>{
                        setCompanyIntroduce(event.target.value);
                    }}/>
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => {
                        // saveStores({
                        //     name:company,
                        //     operatingTime:`${openingTime}-${closingTime}`,
                        //     address:address,
                        //     info:companyIntroduce
                        // })
                        
                    }} />
                </Form>
            </Form>

        </>
    )

}
