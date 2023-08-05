import React, { useState } from 'react'
import { Menu, Container, Button, Checkbox, Form } from 'semantic-ui-react'
import Validator from '../utils/validation.ts';
import { saveUser } from '../controllers/UserController.ts'
import { checkEmail, checkNickName, checkPhoneNumber } from '../controllers/CheckController.ts'


function SignUp() {
    return (
        <>
            <Menu stackable pointing secondary>
                <Menu.Item name='register'>회원가입</Menu.Item>
            </Menu>
            {
                <SignUpForm/>
            }
        </>
    )
}
function SignUpForm() {

    let [nickname, setNickname] = useState();
    let [nicknameCheck, setNicknameCheck] = useState();
    let [email, setEmail] = useState();
    let [emailCheck, setEmailCheck] = useState();
    let [password, setPassword] = useState();
    let [passwordCheck, setPasswordCheck] = useState();
    let [authorizePassword, setAuthorizePassword] = useState();
    let [phoneNumber, setPhoneNumber] = useState();
    let [phoneNumberCheck, setPhoneNumberCheck] = useState();

    return (
        <div>
            <Container text>
                <Form size='large'>
                    {/* Form에 success나 warning을 추가함으로 노출됨 */}
                    <Form.Field>

                        <Form.Input
                            icon={(nicknameCheck==true) && 'check'}
                            onChange={(event) => {
                                const userValue = event.target.value;
                                console.log(userValue);

                                setNickname(userValue);
                                if (Validator.isIdValid(userValue)) {
                                    setNicknameCheck(true);
                                    checkNickName({ nickname: userValue }).then((response) => {
                                        if (response == true) {
                                            setNicknameCheck(true);
                                        }
                                        else {
                                            setNicknameCheck(false);
                                        }
                                    })
                                }
                            }}
                            id='nicknameForm'
                            fluid
                            label='닉네임'
                            placeholder='영문, 숫자 5-11자'
                            error={(nicknameCheck == false) && {
                                content: '이미 존재하는 닉네임입니다.',
                                pointing: 'below'
                            }}
                        ></Form.Input>
                        <Form.Input
                            icon={(emailCheck==true) && 'check'}
                            onChange={(event) => {
                                const userValue = event.target.value;
                                console.log(userValue);
                                console.log(Validator.isEmailValid(userValue));
                                setEmail(userValue);
                                if (Validator.isEmailValid(userValue)) {
                                    checkEmail({ email: userValue }).then((response) => {
                                        response ? setEmailCheck(true) : setEmailCheck(false);
                                    })
                                }
                            }}
                            fluid
                            label='이메일'
                            placeholder='example@example.com'
                            error={(emailCheck == false) && {
                                content: '이미 가입된 이메일입니다.',
                                pointing: 'below'
                            }}
                        >
                        </Form.Input>


                        <Form.Input
                            icon={(passwordCheck==true) && 'check'}
                            onChange={(event) => {
                                const userValue = event.target.value;
                                console.log(userValue);
                                console.log(Validator.isPasswordValid(userValue));
                                setPassword(userValue);
                                if(Validator.isPasswordValid(userValue)){
                                    setPasswordCheck(true);
                                }
                                else{
                                    setPasswordCheck(false);
                                }
                            }}
                            fluid
                            label='비밀번호'
                            placeholder='숫자, 영문, 특수문자 조합 최소 8자'
                        >
                        </Form.Input>
                        <Form.Input
                            fluid
                            placeholder='비밀번호 재입력'
                            icon={(authorizePassword==true) && 'check'}

                            onChange={(event)=>{
                                const userValue = event.target.value;
                                if(userValue == password){
                                    setAuthorizePassword(true);
                                }
                                else{
                                    setAuthorizePassword(false);
                                }
                            }}
                        >
                        </Form.Input>

                        <Form.Input
                            icon={(phoneNumberCheck==true) && 'check'}
                            onChange={(event) => {
                                const userValue = event.target.value;
                                console.log(userValue);
                                console.log(Validator.isPhonenumberValid(userValue));
                                setPhoneNumber(userValue);
                                if (Validator.isPhonenumberValid(userValue)) {
                                    checkPhoneNumber({ phoneNumber: userValue }).then((response) => {
                                        response ? setPhoneNumberCheck(true) : setPhoneNumberCheck(false);
                                    })
                                }
                            }}
                            fluid
                            label='전화번호'
                            placeholder='숫자만'
                            error={(phoneNumberCheck == false) && {
                                content: '이미 등록된 번호입니다',
                                pointing: 'below'
                            }}
                       
                        ></Form.Input>
                        
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                    <Button color='teal' type='submit' onClick={() => {
                        const uservalue = {
                            email: email,
                            password: password,
                            nickname: nickname,
                            phoneNumber: phoneNumber
                        }
                        console.log(uservalue);
                        if (
                            Validator.isEmailValid(email) &&
                            Validator.isIdValid(nickname) &&
                            Validator.isPasswordValid(password) &&
                            Validator.isPhonenumberValid(phoneNumber)
                        ) {
                            saveUser(uservalue)
                                .then(responseData => {
                                    console.log(responseData);
                                    
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        }
                        else {
                            console.error('check,not valid input form');
                        }

                    }}>다음으로</Button>
                </Form>
            </Container>
        </div>
    )
}
function About() {
    return (
        <div>
            <Container text>
                <Form size='large' success warning error>
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