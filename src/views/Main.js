import React from "react";
import { Message,Grid,Header,Button,Form,Segment,Image,Container } from "semantic-ui-react";
import { Link, useNavigate } from 'react-router-dom'

function Main(){
    let navigate = useNavigate();

    return(

        <>
        <Segment>
        <Header as='h2'>
            <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> HappyBeer
        </Header>            
        <Segment>
        <Grid textAlign='left' style={{ height: '100vh' }} verticalAlign='top'>
    <Grid.Column >
      
      <Form size='large'>
        <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='Seller' />
          <Form.Input fluid icon='lock' iconPosition='left' placeholder='open date' type='password'/>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='System date' />
          <Form.Input fluid icon='lock' iconPosition='left' placeholder='something' type='password'/>
          <Form.Input fluid icon='lock' iconPosition='left' placeholder='something' type='password'/>


          <Button color='teal' fluid size='large' onClick={()=>{
            navigate('/home');
          }}>
            time to work
          </Button>
        </Segment>
      </Form>
    
    </Grid.Column>
  </Grid>

        </Segment>
        </Segment>
        </>

        )
}

export default Main;