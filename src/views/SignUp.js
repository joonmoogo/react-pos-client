import React, { useEffect, useState } from 'react'
import { Image, Header, Menu, Container, Button, Checkbox, Form } from 'semantic-ui-react'
import Validator from '../utils/validation.ts';
import { saveUser } from '../controllers/UserController.ts'
import { checkEmail, checkNickName, checkPhoneNumber } from '../controllers/CheckController.ts'
import { getStores, saveStores } from '../controllers/StoreController.ts';
import { authorize } from '../controllers/AuthController.ts';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    let [menu, setMenu] = useState('register');

    return (
        <>
            <SignUpForm />
        </>
    )
}
function SignUpForm({ nextMenu }) { // 회원가입을 나타낸다.

    const navigate = useNavigate();

    const [nickname, setNickname] = useState();
    const [nicknameCheck, setNicknameCheck] = useState();
    const [email, setEmail] = useState();
    const [emailCheck, setEmailCheck] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [authorizePassword, setAuthorizePassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [phoneNumberCheck, setPhoneNumberCheck] = useState();

    return (
        <div className='slide-from-left'>
            <Container text style={{ width: '40%' }}>
                <Header as='h3' color='teal'>
                    <Image src='/logo.png' style={{ width: '160px' }} />
                </Header>
                <Form size='large'>
                    {/* Form에 success나 warning을 추가함으로 노출됨 */}
                    <Form.Field >
                        <Form.Input
                            icon={(emailCheck == true) && 'check'}
                            onChange={(event) => {
                                const userValue = event.target.value;
                                console.log(userValue);
                                console.log(Validator.isEmailValid(userValue));
                                setEmail(userValue);
                                if (Validator.isEmailValid(userValue)) {
                                    checkEmail({ email: userValue }).then((response) => {
                                        response ? setEmailCheck(false) : setEmailCheck(true);
                                    })
                                }
                            }}
                            label='이메일'
                            placeholder='example@example.com'
                            error={(emailCheck == false) && {
                                content: '이미 가입된 이메일입니다.',
                                pointing: 'below'
                            }}
                        >
                        </Form.Input>


                        <Form.Input type='password'
                            icon={(passwordCheck == true) && 'check'}
                            onChange={(event) => {
                                const userValue = event.target.value;
                                console.log(userValue);
                                console.log(Validator.isPasswordValid(userValue));
                                setPassword(userValue);
                                if (Validator.isPasswordValid(userValue)) {
                                    setPasswordCheck(true);
                                }
                                else {
                                    setPasswordCheck(false);
                                }
                            }}
                            label='비밀번호'
                            placeholder='숫자, 영문, 특수문자 조합 최소 8자'
                        >
                        </Form.Input>
                        <Form.Input type='password'
                            placeholder='비밀번호 재입력'
                            icon={(authorizePassword == true) && 'check'}

                            onChange={(event) => {
                                const userValue = event.target.value;
                                if (userValue == password) {
                                    setAuthorizePassword(true);
                                }
                                else {
                                    setAuthorizePassword(false);
                                }
                            }}
                        >
                        </Form.Input>
                        <Form.Input
                            icon={(nicknameCheck == true) && 'check'}
                            onChange={(event) => {
                                const userValue = event.target.value;
                                console.log(userValue);

                                setNickname(userValue);
                                if (Validator.isIdValid(userValue)) {
                                    setNicknameCheck(true);
                                    checkNickName({ nickname: userValue }).then((response) => {
                                        if (response == true) {
                                            setNicknameCheck(false);
                                        }
                                        else {
                                            setNicknameCheck(true);
                                        }
                                    })
                                }
                            }}
                            id='nicknameForm'
                            label='닉네임'
                            placeholder='영문, 숫자 5-11자'
                            error={(nicknameCheck == false) && {
                                content: '이미 존재하는 닉네임입니다.',
                                pointing: 'below'
                            }}
                        ></Form.Input>

                        <Form.Input
                            icon={(phoneNumberCheck == true) && 'check'}
                            onChange={(event) => {
                                const userValue = event.target.value;
                                console.log(userValue);
                                console.log(Validator.isPhonenumberValid(userValue));
                                setPhoneNumber(userValue);
                                if (Validator.isPhonenumberValid(userValue)) {
                                    checkPhoneNumber({ phoneNumber: userValue }).then((response) => {
                                        response ? setPhoneNumberCheck(false) : setPhoneNumberCheck(true);
                                    })
                                }
                            }}
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
                            alert('이메일 인증 해주세요')
                            saveUser(uservalue)
                                .then(responseData => {
                                    console.log(responseData);
                                    navigate('/')
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        }
                        else {
                            console.error('check,not valid input form');
                        }

                    }}>가입하기</Button>
                </Form>
            </Container>
        </div>
    )
}
export default SignUp