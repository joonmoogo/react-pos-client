import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Header,Image,Button,Container,Form,Checkbox } from "semantic-ui-react";
import { saveStores } from "../controllers/StoreController.ts";


function Store(){
    const [storeInfo,setStoreInfo] = useState();
    const navigate = useNavigate();

    return (
        <div>
            <Container text style={{width:'40%'}}>
                <Header as='h1' color='teal'>
                    <Image src='/logo.png' style={{width:'160px'}}/> 
                </Header>
                <Form size='large' success warning error>
                    <Form.Field>
                        <Form.Input
                            id='name'
                            fluid
                            label='상호명'
                            placeholder='ex) 동대문 엽기 떡볶이'
                        >
                        </Form.Input>
                        <Form.Input type="time"
                            id='opentime'
                            fluid
                            label='오픈 시간'
                            placeholder='09:00'
                        >
                        </Form.Input>
                        <Form.Input type="time"
                            id='closetime'
                            fluid
                            label='마감시간'
                            placeholder='24:00'
                        >
                        </Form.Input>
                        <Form.Input
                            id='address'
                            fluid
                            label='주소'
                            placeholder='인천광역시 계양구 계산새로 5번길 14'
                        >
                        </Form.Input>
                        <Form.Input
                            id='info'
                            fluid
                            label='가게 소개'
                            placeholder='입력'
                        >
                        </Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button color='teal' type='submit' onClick={()=>{
                        const name = document.querySelector('#name').value;
                        const address = document.querySelector('#address').value;
                        const info = document.querySelector('#info').value;
                        const opentime = document.querySelector('#opentime').value;
                        const closetime = document.querySelector('#closetime').value;

                        const storeInfo = {
                            name:name,
                            address:address,
                            info:info,  
                            operatingTime:`${opentime}-${closetime}`,
                        }
                        console.log(storeInfo);
                        
                        // saveStores(storeInfo);
                        // navigate('/')
                        
                    }}>등록하기</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Store;