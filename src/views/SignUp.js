import React, { useState } from 'react'
import { Menu, Container, Button, Checkbox, Form } from 'semantic-ui-react'
import Validator  from '../utils/validation.ts';
import axios from 'axios';

const postData = async (url,data) => {
    try {
      const response = await axios.post(url,null,{params:data});
      return response.data; // 서버의 응답 데이터를 반환할 수도 있습니다.
    } catch (error) {
      // 에러 처리를 원한다면 여기서 처리합니다.
      console.error('POST 요청 에러:', error.request.responseText);
      throw error; // 에러를 상위 호출자에게 다시 던져줄 수도 있습니다.
    }
  };

function SignUp() {
    let [menu, setMenu] = useState('register');
    return (
        <>
            <Menu stackable pointing secondary>
                <Menu.Item
                    name='register'
                    active={menu === 'register'}
                    onClick={() => {
                        setMenu('register');
                    }}>회원가입</Menu.Item>
                <Menu.Item
                    name='about'
                    active={menu === 'about'}
                    onClick={() => {
                        setMenu('about');
                    }}>추가정보</Menu.Item>
            </Menu>
            {
                menu === 'register' ? <SignUpForm/>: <About/>
            }
        </>
    )
}
function SignUpForm() {

    const userSaveUrl = '/users';


    let [nickname,setNickname] = useState();
    let [email,setEmail] = useState();
    let [password,setPassword] = useState();
    let [phoneNumber,setPhoneNumber] = useState();
    return (
        <div>
            <Container text>
                <Form size='large' success warning error>
                    {/* Form에 success나 warning을 추가함으로 노출됨 */}
                    <Form.Field>

                        <Form.Input
                            onChange={(event)=>{
                                console.log(event.target.value);
                                console.log(Validator.isIdValid(event.target.value));
                                setNickname(event.target.value);
                            }}
                            fluid
                            label='닉네임'
                            placeholder='영문, 숫자 5-11자'
                            // error={{ content: 'Please enter your first name', pointing: 'below' }}
                        >
                        </Form.Input>
                        <Form.Input
                            onChange={(event)=>{
                                console.log(event.target.value);
                                console.log(Validator.isEmailValid(event.target.value));
                                setEmail(event.target.value);
                            }}
                            fluid
                            label='이메일'
                            placeholder='example@example.com'
                        >
                        </Form.Input>


                        <Form.Input
                            onChange={(event)=>{
                                console.log(event.target.value);
                                console.log(Validator.isPasswordValid(event.target.value));
                                setPassword(event.target.value);
                            }}
                            fluid
                            label='비밀번호'
                            placeholder='숫자, 영문, 특수문자 조합 최소 8자'
                        >
                        </Form.Input>
                        <Form.Input
                            fluid
                            placeholder='비밀번호 재입력'
                        >
                        </Form.Input>

                        {/* Form.Input에 error를 추가함으로 노출 */}
                        <Form.Input
                            onChange={(event)=>{
                                console.log(event.target.value);
                                console.log(Validator.isPhonenumberValid(event.target.value));
                                setPhoneNumber(event.target.value);
                            }}
                            fluid
                            label='전화번호'
                            placeholder='숫자만'
                        // error
                        //   error={{ content: 'Please enter your first name', pointing: 'below' }}
                        // 팝업 메시지 출력
                        ></Form.Input>
                        {/* <Message
                            success
                            header='Form Completed'
                            content="You're all signed up for the newsletter"
                        /> */}
                        {/* <Message
                            warning
                            header='Could you check something!'
                            list={[
                                'That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.',
                            ]}
                        />
                        <Message
                            error
                            header='Action Forbidden'
                            content='You can only sign up for an account once with a given e-mail address.'
                        /> */}
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                    <Button color='teal' type='submit' onClick={()=>{
                        const uservalue = {
                            email:email,
                            password:password,
                            nickname:nickname,
                            phoneNumber:phoneNumber
                        }
                        console.log(uservalue);
                        postData(userSaveUrl,uservalue)
                        .then(responseData =>{
                            console.log(responseData);
                        })
                        .catch(error =>{
                            console.log(error);
                        })
                    }}>다음으로</Button>
                </Form>
            </Container>
        </div>
    )
}
function About() {
    // const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

    return (
        <div>
            <Container text>
                <Form size='large' success warning error>
                    {/* Form에 success나 warning을 추가함으로 노출됨 */}
                    <Form.Field>
                        <Form.Input
                            fluid
                            label='상호명'
                            placeholder='광식이네 포장마차'
                        >
                        </Form.Input>
                        <Form.Input
                            fluid
                            label='오픈 시간'
                            placeholder='09:00'
                        // error={{ content: 'Please enter your first name', pointing: 'below' }}
                        >
                        </Form.Input>
                        <Form.Input
                            fluid
                            label='마감시간'
                            placeholder='24:00'
                        >
                        </Form.Input>
                        <Form.Input
                            fluid
                            label='주소'
                            placeholder='비밀번호 재입력'
                        >
                        </Form.Input>
                        <Form.Input
                            fluid
                            label='가게 소개'
                            placeholder='입력'
                        >
                        </Form.Input>




                        {/* <Message
                                success
                                header='Form Completed'
                                content="You're all signed up for the newsletter"
                            /> */}
                        {/* <Message
                                warning
                                header='Could you check something!'
                                list={[
                                    'That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.',
                                ]}
                            />
                            <Message
                                error
                                header='Action Forbidden'
                                content='You can only sign up for an account once with a given e-mail address.'
                            /> */}
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button color='teal' type='submit'>가입하기</Button>
                </Form>
            </Container>
        </div>
    )
}


export default SignUp