import { React, useRef, useState } from "react";
import { TextArea, Label, Input, Divider, Checkbox, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow, Flag } from "semantic-ui-react";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import axios from "axios";

function EditUserInfo() {
  return (
    <Form>
      <Form.Field>
        <label>닉네임</label>
        <input placeholder='First Name' value='람머스' />
      </Form.Field>
      <Form.Field>
        <label>현재 비밀번호</label>
        <input placeholder='present password' />
      </Form.Field>
      <Form.Field>
      </Form.Field>
      <Form.Field>
        <label>변경 비밀번호</label>
        <input placeholder='password' />
      </Form.Field>
      <Form.Field>
        <label>변경 비밀번호 확인</label>
        <input placeholder='password check' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Form.Field>
        <label>이메일</label>
        <input placeholder='E-mail' />
      </Form.Field>
      <Form.Field>
        <label>전화번호</label>
        <input placeholder='Phone-number' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button type='submit'>변경</Button>
    </Form>
  )
}



function EditMarketInfo() {
  return (
    <>
      <Form>
        <Form.Field>
          <label>상호명</label>
          <input id="company" placeholder='Name' value='행복 맥주' />
        </Form.Field>
        <Form.Field>
          <label>오픈 시간</label>
          <input id="openingTime" placeholder='Opening time' value='18:00pm' />
        </Form.Field>
        <Form.Field>
        </Form.Field>
        <Form.Field>
          <label>마감 시간</label>
          <input id='closingTime'placeholder='마감 시간' value='00:00am' />
        </Form.Field>
        <Form.Field>
          <label>check</label>
          <Checkbox label=' 예약 ' />
          <Checkbox label=' 대기 ' />
          <Checkbox label=' 실시간 조회 ' />

        </Form.Field>
        <Form.Field>
          <label>주소</label>
          <input id="address" placeholder='Address' value='안성시 비룡2길 32' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Form reply >
          <label>가게 소개</label>
          <TextArea id='companyIntroduce' value='맥주맛집' />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={()=>{
            const company = document.querySelector('#company').value;
            const openingTime = document.querySelector('#openingTime').value;
            const closingTime = document.querySelector('#closingTime').value;
            const address = document.querySelector('#address').value;
            const companyIntroduce = document.querySelector('#companyIntroduce').value;
            localStorage.setItem('company',JSON.stringify({company : company, openingTime : openingTime, closingTime : closingTime, address : address, companyIntroduce : companyIntroduce}));
          }} />
        </Form>
      </Form>

    </>
  )

}

function EditMenu() {
  const localMenu = JSON.parse(localStorage.getItem('menu'));
  const initialMenues = localMenu? localMenu : [] ;
  const [menues,setMenues] = useState(initialMenues);
  
  
  return (
    <>
    <Table basic='very'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Product</Table.HeaderCell>
        <Table.HeaderCell>Option</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    {menues.map((e,i)=>{
      return(
    <Table.Body>
      <Table.Row>
        <Table.Cell>{e.product}</Table.Cell>
        <Table.Cell>{e.option}</Table.Cell>
        <Table.Cell>{e.price}</Table.Cell>
        <Table.Cell><Button onClick={()=>{
          console.log(`${e.product} delete button was clicked`);
          let filtered = menues.filter((el)=> el.product !== e.product )
          console.log(filtered);
          setMenues(filtered);
        }}>X</Button></Table.Cell>
      </Table.Row>
    </Table.Body>
      )
    })}
      </Table>

    <Form>
    <Form.Group widths='equal'>
      <Form.Input id='product' fluid placeholder='상품 이름' />
      <Form.Input id='option' fluid placeholder='상품 옵션'  />
      <Form.Input id='price' fluid placeholder='상품 가격'  />
      <Button onClick={()=>{
        console.log('add button was clcicked');
        const product = document.querySelector('#product');
        const option = document.querySelector('#option');
        const price = document.querySelector('#price');
        const added = {product: product.value, option: option.value, price:price.value, count:0};
        console.log(added);
        menues.push(added);
        console.log(menues);
        setMenues([...menues]);
      }}>add</Button>
    </Form.Group>
  </Form>


      <h1></h1>
      <Button onClick={()=>{
        console.log('button was clicekd');
        localStorage.setItem('menu',JSON.stringify(menues));
        alert('변경 완료');
      }}>변경</Button>
    </>
  )

}

function EditTable() {
  const nodeRef = useRef(null);
  const [table, setTable] = useState([]);
  const [counter, setCounter] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [Opacity, setOpacity] = useState(false);
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };
  const handleStart = (e, data) => {
    setOpacity(true);
    console.log(`x:${data.x.toFixed(0)} y:${data.y.toFixed(0)} w:${e.target.parentElement.style.width} h:${e.target.parentElement.style.height}`);
  };
  const handleEnd = (event, data) => {
    console.log(data);
    setOpacity(false);
  };
  return (
    <>
      <Menu fluid style={{ borderBottom: '1px solid lightGrey ' }}>
        <Menu.Item><Button onClick={() => {
          setTable([...table, { tableNumber: table.length + 1, tableName: '기본석', x: 0, y: 0, w: 0, h: 0 }])
          console.log(table)
        }}>테이블</Button></Menu.Item>
        <Menu.Item><Button onClick={() => {
          setCounter([...counter, { counterNumber: counter.length + 1, counterName: '카운터', x: 0, y: 0, w: 0, h: 0 }])
        }}>박스</Button></Menu.Item>
        <Menu.Item><Button primary onClick={() => {
          console.log(table);
          alert('저장완료')
          localStorage.setItem('tableSetting', JSON.stringify(table));
          localStorage.setItem('counterSetting', JSON.stringify(counter));
        }}>Save</Button></Menu.Item>
      </Menu>

      {table.map((e, i) => {
        return (
          <Draggable
            nodeRef={nodeRef}
            onDrag={(event, data) => trackPos(data)}
            onStart={(e, data) => handleStart(e, data)}
            onStop={(event, data) => {
              handleEnd(event, data);
              e.x = (data.x + 30).toFixed(0);
              e.y = (data.y + 50).toFixed(0);
              e.h = (event.target.parentElement.style.height);
              e.w = (event.target.parentElement.style.width);
              e.privateKey = Math.floor(Math.random() * 99999999);
            }}
          >
            <div

              ref={nodeRef}
              style={{ opacity: Opacity ? "0.6" : "1", position: 'absolute' }}
            >
              <Card
                onClick={() => { 'i was clicked' }}
                color="green"
                style={{ height: '80px', width: '90px', overflow: 'auto', resize: 'both' }}>
                <Card.Content >
                  <Card.Header content={`${i + 1}T`} />
                  <Card.Meta content={e.tableName} />
                </Card.Content>
              </Card>

            </div>
          </Draggable>
        )
      })}

      {counter.map((e, i) => {
        return (
          <Draggable
            nodeRef={nodeRef}
            onDrag={(event, data) => trackPos(data)}
            onStart={(e, data) => handleStart(e, data)}
            onStop={(event, data) => {
              handleEnd(event, data);
              e.x = (data.x + 30).toFixed(0);
              e.y = (data.y + 50).toFixed(0);
              e.h = (event.target.parentElement.style.height);
              e.w = (event.target.parentElement.style.width);
            }}
          >
            <div
              ref={nodeRef}
              style={{ opacity: Opacity ? "0.6" : "1", position: 'absolute' }}
            >
              <Card
                onClick={() => { 'i was clicked' }}
                style={{ height: '40%', width: '90px', overflow: 'auto', resize: 'both' }}>
                <Card.Content >

                </Card.Content>
              </Card>
            </div>
          </Draggable>
        )
      })}
    </>
  )
}

function SalesStatistics() {
  return (
    <>
      <h2>통계임</h2>
      <h2>그래프임</h2>
      <h2>등등등임</h2>
    </>
  )
}

function ReviewComment() {
  return (
    <Comment.Group threaded>
      <Header as='h3' dividing>
        Comments
      </Header>
      <Comment>
        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>Matt</Comment.Author>
          <Comment.Metadata>
            <span>Today at 5:42PM</span>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
          <Comment.Actions>
            <a>Reply</a>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <Comment>
        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>Elliot Fu</Comment.Author>
          <Comment.Metadata>
            <span>Yesterday at 12:30AM</span>
          </Comment.Metadata>
          <Comment.Text>
            <p>This has been very useful for my research. Thanks as well!</p>
          </Comment.Text>
          <Comment.Actions>
            <a>Reply</a>
          </Comment.Actions>
        </Comment.Content>

        <Comment.Group>
          <Comment>
            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Jenny Hess</Comment.Author>
              <Comment.Metadata>
                <span>Just now</span>
              </Comment.Metadata>
              <Comment.Text>Elliot you are always so right :</Comment.Text>
              <Comment.Actions>
                <a>Reply</a>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </Comment>

      <Comment>
        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>Joe Henderson</Comment.Author>
          <Comment.Metadata>
            <span>5 days ago</span>
          </Comment.Metadata>
          <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
          <Comment.Actions>
            <a>Reply</a>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <Form reply>
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>

  )
}

function EditPreferences() {
  return (
    <>
      <Segment.Group horizontal >
        <Segment>언어</Segment>
        <Segment>
          <List selection verticalAlign='middle'>

            <List.Item>
              <List.Content>
                <Flag name="kr" />
                <List.Header>Korean</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Flag name="us" />
              <List.Content>
                <List.Header>English</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Flag name="jp" />
              <List.Content>
                <List.Header>Japanese</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Segment>

      </Segment.Group>
      <Segment.Group horizontal>
        <Segment>다크모드</Segment>
        <Segment><Checkbox toggle style={{ backgroundColor: 'lightGrey' }} ></Checkbox></Segment>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment>토글시 소리 출력</Segment>
        <Segment><Checkbox toggle style={{ backgroundColor: 'lightGrey' }}></Checkbox></Segment>
      </Segment.Group>

    </>
  )
}

function SystemInfo() {
  let country = window.navigator.language;
  let a = window.navigator.geolocation;
  let user = window.navigator.userAgent;
  return (
    <>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='bar chart' />
          Specifications
        </Header>
      </Divider>

      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>Country</Table.Cell>
            <Table.Cell>{country}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>System-version</Table.Cell>
            <Table.Cell>hellopos.1.34</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Connection environment</Table.Cell>
            <Table.Cell>{user}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Smell</Table.Cell>
            <Table.Cell>good</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  )

}
function QrCode(props) {
  let item = props.item;
  console.log(item);
  return (
    <>
      {item.map((e, i) => {
        return (
          <h3>{`${i + 1}번 테이블 localHost:3000/home/order/${e.privateKey}`}</h3>
        )
      })}

      <a href="https://ko.online-qrcode-generator.com/">qr생성사이트</a>
      <h1>qr은 셀프</h1>
    </>
  )
}

export {
  EditUserInfo,
  EditMarketInfo,
  EditMenu,
  EditTable,
  SalesStatistics,
  ReviewComment,
  EditPreferences,
  SystemInfo,
  QrCode,
}