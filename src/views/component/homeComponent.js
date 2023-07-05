import { React, useState } from "react";
import { Accordion, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow } from "semantic-ui-react";
import { Route, Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import moment from "moment/moment";
import './homeComponent.css'
import { EditUserInfo, EditMarketInfo, EditMenu, EditTable, SalesStatistics, ReviewComment, EditPreferences, SystemInfo, QrCode, } from "./settingComponent";
// import socket from "../../socket-client";
import { Notify } from "notiflix";
// const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/5450');



let myStorage = window.localStorage; // 로컬스토리지 선언
// socket.on('userOrder', (data) => {
//   if (data) {
//     console.log(data);
//     myStorage.setItem(data[0].tableNumber, JSON.stringify(data));
//     Notify.success('주문들어왔습니다.');
//     // audio.play();
//   }
//   else {
//     return null;
//   }
// })

//로컬스토리지는 도메인만 같으면 값을 공유함
//그러므로 사용자의 아이디로 url을 달리 해야할듯
//  ex) localhost:3000/start/joonmoogo




let counterSetting = myStorage.getItem('counterSetting') ? JSON.parse(myStorage.getItem('counterSetting')) : [{ tableNumber: 10, tableName: '예약' }];

function TableGroup(props) { // 기본
  let localTableList = JSON.parse(myStorage.getItem('tableSetting'));
  let initialTableList = localTableList? localTableList : [];

  let tableSetting = initialTableList;

  let [table, setTable] = useState(tableSetting);
  let [counter, setCounter] = useState(counterSetting);
  table.map((e, i) => {
    localStorage.setItem(`secretNumber${i + 1}`, Math.round(Math.random() * 99999999));
  })



  //서버에서 받을 데이터 가입시 기본설정

  //현재 네비게이션 이동시에 메뉴가 추가된 table state가 초기화되어 문제
  //table state를 상위에 두자 => Redux  => Redux store 사용하면 컴포넌트를 갈아치워도 상태 유지
  //하지만 새로고침하면 또 날아감 => localStorage나 sessionStorage에 저장.
  //두 가지를 같이 사용한 라이브러리 redux persist라는게 존재함. => 참고하자.

  let [clickedTable, setClickedTable] = useState();
  const localMenu = JSON.parse(myStorage.getItem('menu'));
  const initialMenuList = localMenu? localMenu : [] 
  let [menuList, setMenuList] = useState(initialMenuList);

  let localOption = [];
  function getLocalOption(){
    initialMenuList.map((e,i)=>{
      if(!(localOption.includes(e.option))){
        localOption.push(e.option);
      }
    })
    return localOption;
  }

  let [tabMenu, setTabMenu] = useState('메인 메뉴');
  //서버에서 받을 데이터 가입시 기본 설정

  
  function clearMenuCount() {
    setMenuList(initialMenuList);
  }
  // count개수 초기화 해주는 함수

  let [temporaryOrder, setTemporaryOrder] = useState([]);

  //주문 전에 잠깐 노출되는 배열

  const selectedTable = table.find((e) => {
    return (
      e.tableNumber == clickedTable
    )
  });

  // 선택한 테이블




  // let a = useSelector((state)=>{return state});
  let [tableColor, setTableColor] = useState();



  function getTotal(){
    let sum = 0;
    temporaryOrder.map((e,i)=>{
      sum += e.price * e.count;
    })
    return sum;
  }

  let margin = 30;
  return (
    <>
      {!clickedTable ?

        <>
          <Card.Group>
            {table.map((e, i) => {


              return (
                <Card
                  color="green"
                  // style={{backgroundColor:'teal'}} 
                  style={{ width: `${e.w ? e.w : '90px'}`, height: `${e.h ? e.h : '80px'}`, overflow: 'hidden', position: 'absolute', top: `${e.y}px`, left: `${e.x}px` }} // 이거 수정하셈 테이블세팅 
                  onClick={() => {
                    const items = JSON.parse(myStorage.getItem(e.tableNumber));
                    setClickedTable(`${e.tableNumber}`);
                    if(items){
                      setTemporaryOrder(items);
                    }
                    console.log(clickedTable);
                    console.log(temporaryOrder);
                    
                  }}>
                  <Card.Content >
                    <Card.Header content={`${e.tableNumber} T`} />
                    <Card.Meta content={`${e.tableName}`} />
                    {myStorage.getItem(e.tableNumber.toString()) == null
                      ? <Card.Description content='' />
                      : JSON.parse(myStorage.getItem(e.tableNumber)).map((e) => {
                        return (
                          <Card.Description style={{ color: 'teal' }} content={`${e.product} ${e.count}`} />
                        )

                      })}

                  </Card.Content>
                </Card>



              )
            })}
            {counter.map((e, i) => {
              return (
                <Card

                  // style={{backgroundColor:'teal'}} 
                  style={{ width: `${e.w ? e.w : '90px'}`, height: `${e.h ? e.h : '80px'}`, overflow: 'hidden', position: 'absolute', top: `${e.y}px`, left: `${e.x}px` }} // 이거 수정하셈 테이블세팅 
                >
                  <Card.Content >


                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
        </>
        : <Grid columns='equal' relaxed>
          <Grid.Row>
            <Grid.Column>
              <Segment><Header as='h2'>{`${clickedTable}번 테이블`}</Header></Segment>
              <Segment className="no-scroll" style={{ overflow: 'scroll', height: '60%' }}>
                <Table fixed singleLine selectable >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>상품명</Table.HeaderCell>
                      <Table.HeaderCell>가격</Table.HeaderCell>
                      <Table.HeaderCell>수량</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>

                    </Table.Row>
                  </Table.Header>
                  <Table.Body >
                    {/* <TableRow>
                        <Table.Cell content={'hai'}></Table.Cell>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>13,000</Table.Cell>
                      </TableRow> */}

                    {temporaryOrder.map((e) => { // state의 내용만 출력
                        return (
                          <TableRow onClick={()=>{
                            console.log(`${e.product} was clicked`);
                          }}>
                            <Table.Cell>{e.product}</Table.Cell>
                            <Table.Cell>{e.price}</Table.Cell>
                            <Table.Cell>{e.count}</Table.Cell>
                            <Table.Cell style={{ cursor: 'pointer' }} onClick={()=>{
                              console.log(`${e.product} delete button was clicked`);
                              let filtered = temporaryOrder.filter((el)=> el.time !== e.time);
                              console.log(filtered);
                              setTemporaryOrder(filtered);
                              clearMenuCount();
                            }}>❌</Table.Cell>
                          </TableRow>
                        )
                      })}
                    
                  </Table.Body>
                </Table>
              </Segment>
              <Segment>
                <Header as='h3'>{`가격: ${getTotal()} Won`}</Header >
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>메뉴<Button secondary floated="right" onClick={() => {
                setClickedTable();
                setTemporaryOrder([]);
                clearMenuCount();
              }}>X</Button></Segment>
              <Segment>
                <Menu fluid tabular color='teal'>
                  {getLocalOption().map((e,i)=>{
                    return(
                      <Menu.Item key={e} onClick={()=>{
                        setTabMenu(e)
                      }}
                      active={tabMenu==e}>{e}</Menu.Item>
                    )
                  })}
                </Menu>
                <Card.Group itemsPerRow={2}>
                  {menuList.map((e, i) => { 
                    if(e.option == tabMenu){
                    return (
                      <Card color="teal" onClick={() => {
                        e.tableNumber = selectedTable.tableNumber;
                        e.time = new Date().getTime();
                        e.count = e.count + 1;
                        // temporaryOrder.push(e);
                        // (e.count ==1 ? temporaryOrder.push(e) : null)
                        if (e.count == 1) 
                        {temporaryOrder.push(e);}
                        setTemporaryOrder([...temporaryOrder]);
                        console.log(temporaryOrder)
                        console.log(e);
                      }}>
                        <Card.Content>
                          <Card.Header content={e.product}></Card.Header>
                          <Card.Meta content={e.price}></Card.Meta>
                        </Card.Content>
                      </Card>
                    )
                    }
                  })
                  }
                </Card.Group>
              </Segment>
              
              <Segment>
                <Button primary onClick={() => {
                  alert('주문');
                  setClickedTable();
                  setTemporaryOrder([]);
                  clearMenuCount();                 
                  let localItem = JSON.parse(myStorage.getItem(selectedTable.tableNumber));
                  myStorage.setItem(selectedTable.tableNumber, `${JSON.stringify(temporaryOrder)}`)
                  {
                    let kitchen = myStorage.getItem('kitchen');
                    // myStorage.setItem('kitchen',myStorage.getItem(kitchen))

                    myStorage.setItem(`kitchen${selectedTable.tableNumber}`, myStorage.getItem(selectedTable.tableNumber));

                  }

                }}>주문</Button>

                <Button primary onClick={() => {
                  alert('결제')
                  console.log(JSON.parse(myStorage.getItem(selectedTable.tableNumber)));
                  
                  const date = new Date();
                  console.log(date)
                  console.log('서버에 결제요청');
                  
                  myStorage.setItem(`receipt | ${moment().format('LL')} | ${moment().format('LT')} | ${new Date()}`,JSON.stringify(temporaryOrder));
                  setTemporaryOrder([]);
                  setClickedTable();
                  myStorage.removeItem(clickedTable.toString())

                }}>결제</Button>

                <Button secondary onClick={() => {
                  alert('주문취소');
                  setClickedTable();
                  setTemporaryOrder([]);
                  myStorage.removeItem(clickedTable.toString());
                  myStorage.removeItem(`kitchen${clickedTable}`.toString());
                }}>주문취소</Button>
              </Segment>



            </Grid.Column>
          </Grid.Row>
        </Grid>}



    </>

  )
}

// function OrderSpace(){
//   return(
//     <button onClick={()=>{setClickedTable()}}>{clickedTable}</button>
//   )
// }

function ReservationList() { // 예약탭 서버에서 불러온 데이터로 구성될 예정
  const [value, setValue] = useState(new Date());
  const paragraph = <ImageComponent src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

  // Sample reservation data 
  let [data, setData] = useState([
    { date: '15-05-2023', time: '6:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
    { date: '15-05-2023', time: '7:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
    { date: '15-05-2023', time: '8:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
    { date: '25-05-2023', time: '9:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
    { date: '15-05-2023', time: '10:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
  ]);

  let [viewData, setViewData] = useState([]);

  return (
    <>
      <Grid columns='equal' relaxed>
        <Grid.Row>
          <Grid.Column >
            <Segment>
              <Table fixed singleLine selectable>
                <Table.Body >
                  <Table.Row>
                    <Calendar
                      onChange={setValue}
                      onClickDay={(e) => {
                        setViewData([]);
                        const date = moment(e).format("DD-MM-YYYY");
                        data.map((e) => {
                          if (e.date == date) {
                            setViewData([...viewData, e]);
                            console.log(viewData);
                          }
                        })
                      }}
                      value={value}
                      defaultView="month"
                      view="month"
                      tileContent={(date, view) => {
                        let html = [];
                        if (data.find((x) => x.date == moment(date.date).format("DD-MM-YYYY"))) {
                          html.push(<div className="dot"></div>)
                        }
                        return (
                          <>
                            {html}
                          </>
                        )
                      }}
                    />
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="teal" className="no-scroll" style={{ overflow: 'scroll', height: '100%' }}>
              <Segment>
                <Item.Group link>
                  {viewData.map((e) => {
                    return (
                      <Item>
                        <Item.Image size='mini' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
                        <Item.Content >
                          <Item.Header>{e.time}</Item.Header>
                          <Item.Description>{e.date}</Item.Description>
                          <Item.Description>{e.name}</Item.Description>
                          <Item.Description>
                            <Button circular icon='add user' color="facebook"></Button>
                            <Button circular icon='address book' color="linkedin"></Button>
                            <Button circular icon='ban' color="google plus"></Button>
                          </Item.Description>
                          <Item.Description></Item.Description>
                        </Item.Content>
                      </Item>
                    )
                  })}
                </Item.Group>
              </Segment>
            </Segment>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

function WaitingList() {  //대기탭 미정
  let waiting = JSON.parse(localStorage.getItem('waiting'));
  let initialWaiting = waiting? waiting : [];
  let [people,setPeople] = useState(initialWaiting);

  return (
    <>
      {people&&people.map((e,i)=>{
        return(
          <Item.Group link>

          <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />

          <Item.Content>
            <Item.Header>{e.name}</Item.Header>
            <Item.Description>{e.count}</Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
        )
      })}
            

      
      <Form>
          <Form.Group>
            <Form.Input
              placeholder='이름'
              name='이름'
              id='name'
            />
            <Form.Input
              placeholder='인원 수'
              name='인원 수'
              id='count'
            />
            <Form.Button fluid color="teal" content='Submit' onClick={()=>{
              const name = document.querySelector('#name').value;
              const count = document.querySelector('#count').value;
              people.push({name:name, count:count});
              setPeople([...people]);
              
            }} />
          </Form.Group>
        </Form>
      
    </>
  )
}

function FindReceipe() { //영수증조회탭 서버에서 불러온 데이터로 구성될 예정
  const company = JSON.parse(myStorage.getItem('company'));
  const initialCompany = company ? company : '';
  let localData = Object.keys(localStorage);
  console.log(localData);
  let filtered = localData ? localData.filter((e)=>e.includes('receipt')).sort() : [] ;
  console.log(filtered);
  let [data, setData] = useState(filtered)
  let [viewData, setViewData] = useState();
  console.log(`this is ${viewData}`);
  let viewdatasmenu = viewData? (JSON.parse(myStorage.getItem(viewData))) : null;
  console.log(viewdatasmenu);
  function getTotal(){
    let sum = 0;
    viewdatasmenu&&viewdatasmenu.map((e,i)=>{
      sum += e.price * e.count;
    })
    return sum;
  }
  return (
    <Grid columns='equal' relaxed>
      <Grid.Row>
        <Grid.Column >
          <Segment>영수증 목록</Segment>
          <Segment className="no-scroll" style={{ overflow: 'scroll', height: '60%' }}>
            <Table fixed singleLine selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>index</Table.HeaderCell>
                  <Table.HeaderCell>date</Table.HeaderCell>
                  <Table.HeaderCell>time</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body >
                {data.map((e, i) => {
                  return (
                    <Table.Row key={i} onClick={() => {
                      setViewData(e);
                      console.log(viewData)
                      console.log(typeof(viewData));
                    }}>
                      <Table.Cell>{i + 1}</Table.Cell>
                      <Table.Cell>{e.split('|')[1]}</Table.Cell>
                      <Table.Cell>{e.split('|')[2]}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>조회</Segment>
          <Segment>
            <List>
            {/* <h1>이것은</h1>
                    <h1>영수증</h1> */}
            <h3>[주문영수증]   {initialCompany.company}</h3>
            <h3>============================</h3>
            <h5>{initialCompany.address}</h5>
            <h5>152-129301-519209</h5>
            <h5>open : {initialCompany.openingTime} | close:{initialCompany.closingTime}</h5>
            <h4>주문 날짜: {viewData&&viewData.split('|')[1]}</h4>
            <h5>주문 시각: {viewData&&viewData.split('|')[2]}</h5>
            <h5>상품명 /t수량 /t 금액</h5>
            {viewdatasmenu&& viewdatasmenu.map((e) => {
              return (
                <List.Item>
                  <List.Content>
                    <List.Description as='h3'>
                      {`⁘ ${e.product} ${e.count} * ${e.price} = ${e.count * e.price}`}
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            })}
            </List>
          </Segment>
          <Segment>
            <h1>{`${getTotal()} won `}</h1>
          </Segment>
          <Segment>
            <Button primary>환불처리</Button>
            <Button secondary>영수증출력</Button>
          </Segment>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

function isOrder() {
  return (myStorage.length ? true : false);
}

function OrderList() { //주방탭

  console.log(Object.keys(localStorage));
  let kitchenOrder = Object.keys(localStorage).filter((e) => e.includes('kitchen')).sort();
  let [st, setSt] = useState(kitchenOrder);
  console.log(kitchenOrder);
  return (
    <Segment>
      <Header as='h5' block >주방임</Header>
      {kitchenOrder.map((e, i) => {
        return (
          <List divided relaxed size="large" key={i}>
            <Segment>
              <Header as='h2' icon='food' content={e + '번 주문서'} />
              <Button onClick={() => {
                myStorage.removeItem(e);
                setSt(kitchenOrder.splice(e, 1));
              }} floated="right">✔</Button>
              {JSON.parse(myStorage.getItem(e)).map((e) => {

                return (
                  <List.Item>
                    <List.Content>
                      <List.Header as='a'>{e.product}</List.Header>
                      <List.Description as='a'>{e.count}개  {Number.parseInt((new Date() - e.time) / 1000 / 60)}분 전 주문</List.Description>
                    </List.Content>
                  </List.Item>
                )
              })}
            </Segment>
          </List>
        )
      })}
    </Segment>
  )
}

function Manager() {
  let [state, setState] = useState([])
  let [option, setOption] = useState();
  let navigate = useNavigate();
  return (
    !option ?
      <>
        <div>
          <Header as='h4' attached='top'>
            계정 관리
          </Header>
          <Segment attached>
            <Item.Group>
              <Item>
                <Icon name='question circle' size='large' />
                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditUserInfo') }} >계정 정보 수정</Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </div>
        <div>
          <Header as='h4' attached='top'>
            매장 관리
          </Header>
          <Segment attached>
            <Item.Group>
              <Item>
                <Icon name='home' size='large' />
                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditMarketInfo') }}>매장 정보 수정</Item.Content>
              </Item>

              <Item>
                <Icon name='list' size='large' />
                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditMenu') }}>메뉴 수정</Item.Content>
              </Item>
              <Item>
                <Icon name='chess board' size='large' />
                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditTable') }}>테이블 배치</Item.Content>
              </Item>
              <Item>
                <Icon name='qrcode' size='large' />
                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('QrCode') }}>QR Code</Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </div>
        <div>
          <Header as='h4' attached='top'>
            통계 조회
          </Header>
          <Segment attached>
            <Item.Group>
              <Item>
                <Icon name='dollar sign' size='large' />
                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('SalesStatistics') }}>매출 통계</Item.Content>
              </Item>
              <Item>
                <Icon name='thumbs up' size='large' />
                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('ReviewComment') }}>리뷰 조회 </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </div>
        <div>
          <Header as='h4' attached='top'>
            시스템 설정
          </Header>
          <Segment attached>
            <Item.Group>
              <Item>
                <Icon name='laptop' size='large' />
                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditPreferences') }}>환경 설정</Item.Content>
              </Item>
              <Item>
                <Icon name='question circle' size='large' />
                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('SystemInfo') }}>시스템 정보</Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment>
            <Item>
              <Button fluid primary onClick={() => {
                alert('localStorage 삭제');
                navigate(-2);
                localStorage.clear();
              }}>LogOut</Button>
            </Item>
          </Segment>
        </div>
      </>
      :
      <>
        <Segment attached  >
          <Header as='h5'>
            <Icon style={{ cursor: 'pointer' }} onClick={() => { setOption(!option) }} name='angle left' />
            {`관리자 / ${state}`}
          </Header>
          {state == 'EditUserInfo' ? <EditUserInfo /> : null}
          {state == 'EditMarketInfo' ? <EditMarketInfo /> : null}
          {state == 'EditMenu' ? <EditMenu /> : null}
          {state == 'EditTable' ? <EditTable /> : null}
          {state == 'SalesStatistics' ? <SalesStatistics /> : null}
          {state == 'ReviewComment' ? <ReviewComment /> : null}
          {state == 'EditPreferences' ? <EditPreferences /> : null}
          {state == 'SystemInfo' ? <SystemInfo /> : null}
        </Segment>
      </>
  )
}

export {
  TableGroup,
  ReservationList,
  WaitingList,
  FindReceipe,
  OrderList,
  // ReviewComment,
  Manager
}