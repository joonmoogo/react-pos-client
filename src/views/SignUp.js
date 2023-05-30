import React, { Component, useState } from 'react'
import { TextArea ,Image, Menu, Message, Container, Button, Checkbox, Form, Segment, Label } from 'semantic-ui-react'

function SignUp() {
    let [menu, setMenu] = useState('register');
    let [option, setOption] = useState([]);
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
                menu == 'register' ? <SignUpForm></SignUpForm> : <About></About>
            }
        </>
    )
}
function SignUpForm() {
    return (
        <div>
            <Container text>
                <Form size='large' success warning error>
                    {/* Form에 success나 warning을 추가함으로 노출됨 */}
                    <Form.Field>
                        
                        <Form.Input
                            fluid
                            label='아이디'
                            placeholder='영문, 숫자 5-11자'
                            // error={{ content: 'Please enter your first name', pointing: 'below' }}
                        >
                        </Form.Input>
                        <Form.Input
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
                        <Form.Input
                            fluid
                            label='이메일'
                            placeholder=''
                            // error
                            >
                        </Form.Input>

                        {/* Form.Input에 error를 추가함으로 노출 */}
                        <Form.Input
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
                    <Button color='teal' type='submit'>다음으로</Button>
                </Form>
            </Container>
        </div>
    )
}
function About() {
    const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

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