import React, { useState, useEffect } from "react";
import { Message, Segment, Header, Image, Grid, Form, Button, Container } from "semantic-ui-react";
import { getStores } from "../controllers/StoreController.ts";
import TimeUtil from "../utils/moment.ts";

function StoreOpen() {
  const [storeList, setStoreList] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    getStores().then((data) => {
      console.log(data.data);
      setStoreList(data.data);
    });
  }, []);

  const openModal = (store) => {
    setSelectedStore(store);
  };

  const closeModal = () => {
    setSelectedStore(null);
  };

  return (
    <Container style={{ width: '70%' }}>
      <Segment>
        <Header>
          <Image circular src='/logo.png' style={{ width: '140px' }} />
        </Header>
        {storeList.map((e) => {
          return (
            <div key={e.id}>
              <Message onClick={() => openModal(e)} style={{marginTop:'10px'}}>
                <Message.Header>{e.name}</Message.Header>
                <p>{e.operatingTime}</p>
                <p>{e.address}</p>
                <p>{e.phoneNumber}</p>
              </Message>
              {selectedStore && selectedStore.id === e.id && (
                <StoreOpenModal store={selectedStore} closeModal={closeModal} />
              )}
            </div>
          );
        })}
      </Segment>
    </Container>
  );
}

function StoreOpenModal({ store, closeModal }) {
  const timeutil = new TimeUtil();
  const time = timeutil.getTime();
  const date = `${timeutil.getMonth()}/${timeutil.getDate()}/${timeutil.getDayOfTheWeek()}`;

  return (
    <Segment>
      <Grid textAlign='left' verticalAlign='top'>
        <Grid.Column >
          <Form size='large'>
            <Segment stacked>
              <Form.Input id='openPerson' fluid icon='user' iconPosition='left' placeholder='개점자' value={store.name} />
              <Form.Input id='opendate' value={date} fluid icon='lock' iconPosition='left' placeholder='open date' />
              <Form.Input id='opentime' value={time} fluid icon='user' iconPosition='left' placeholder='System date' />
              <Button color='teal' fluid size='large' onClick={() => {
                closeModal();
              }}>
                개점하기
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default StoreOpen;