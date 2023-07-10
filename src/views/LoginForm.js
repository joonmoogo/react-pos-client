import React, { useEffect } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import './loginForm.css'
import naver_id_login from '../modules/naver_login'
import SocialKakao from '../modules/kakao_login'


function LoginForm() {

  let navigate = useNavigate();
  useEffect(() => {
    naver_id_login.init_naver_id_login();
  }, [])
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' color='teal' textAlign='center'>
          <Image className='App' src='/logo512.png' /> HELLO POS
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button color='teal' fluid size='large' onClick={() => {
              navigate('/main');
            }}>
              로그인
            </Button>
          </Segment>
        </Form>
        <Message>
          <Link to='/signUp'>아이디 찾기 | </Link>
          <Link to='/signUp'>비밀번호 찾기 | </Link>
          <Link to='/signUp'>회원가입 | </Link>
        </Message>
        <Message>
          {/* <Image style={{float:'left',marginRight:'10px',cursor:'pointer'}} size='small' src='/img/kakao_login_medium_narrow.png'></Image> */}
          <div>{<SocialKakao />}</div>
          <div id='naver_id_login'></div>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm