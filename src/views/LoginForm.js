import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'

function LoginForm (){
    let navigate = useNavigate();
    return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h1' color='teal' textAlign='center'>
        <Image className='App' src='/logo512.png'/> HELLO POS
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

          <Button color='teal' fluid size='large' onClick={()=>{
            navigate('/main');
          }}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <Link to='/signUp'>sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
    );
        }

export default LoginForm