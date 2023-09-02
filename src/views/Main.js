import React, { useEffect,useState } from "react";
import { Card,Grid, Header, Button, Form, Segment, Image } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'
import TimeUtil from "../utils/moment.ts";
import {getStores, setOpen} from '../controllers/StoreController.ts'
import { getUser } from "../controllers/UserController.ts";
function Main() {
  let navigate = useNavigate();
  const timeutil = new TimeUtil();
  const time = timeutil.getTime();
  const date = `${timeutil.getMonth()}/${timeutil.getDate()}/${timeutil.getDayOfTheWeek()}`
  let [storeName,setStoreName] = useState();
  let [storeId,setStoreId] = useState();
  useEffect(()=>{
    getStores().then((response)=>{
      setStoreName(response.data[0].name);
      setStoreId(response.data[0].id)
      console.log(response);
    })
  },[])
  return (
    <>
      <Segment>
        <Header as='h2'>
          <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />안녕하세요. {storeName}님
        </Header>
        <Segment>
          <Grid textAlign='left' style={{ height: '100vh' }} verticalAlign='top'>
            <Grid.Column >
              <Form size='large'>
                <Segment stacked>
                  <Form.Input id='openPerson' fluid icon='user' iconPosition='left' placeholder='개점자' />
                  <Form.Input id='opendate' value={date} fluid icon='lock' iconPosition='left'  placeholder='open date' />
                  <Form.Input id='opentime' value={time} fluid icon='user' iconPosition='left' placeholder='System date' />
                  <Button color='teal' fluid size='large' onClick={() => {
                    setOpen({
                      id:storeId,
                      isOpen:true,
                    }).then((data)=>{
                      console.log(data.headers.access_token);
                      const access_token = data.headers.access_token;
                      localStorage.setItem('hknuToken',`"${access_token}"`);
                      navigate('/home');
                    })
                     }}>
                    개점하기
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