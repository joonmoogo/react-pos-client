import React, { useEffect,useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import './loginForm.css'
import naver_id_login from '../modules/naver_login'
import SocialKakao from '../modules/kakao_login'
import {authorize} from '../controllers/AuthController.ts'
import {LoginErrorMessage} from '../components/errorMessageComponent/loginError'

function LoginForm() {

  let navigate = useNavigate();
  useEffect(() => {
    naver_id_login.init_naver_id_login();
  }, [])
  let [loginError,setLoginError] = useState();
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' color='teal' textAlign='center'>
          <Image className='App' src='/logo512.png' /> HELLO POS
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' id='loginEmail' />
            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' id='loginPassword'
            />
            <Button color='teal' fluid size='large' onClick={() => {
              const email = document.querySelector('#loginEmail');
              const password = document.querySelector('#loginPassword');
              const userinfo = {email : email.value , password : password.value};
              authorize(userinfo).then((value)=>{
                if(value){
                  navigate('/main'); 
                }
                else{
                  setLoginError(true);
                }
              })
            }}>
              로그인
            </Button>
            {loginError?<LoginErrorMessage/>:null}
            
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