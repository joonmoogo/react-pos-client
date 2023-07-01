import { React, useState } from "react";
import { Accordion, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow } from "semantic-ui-react";
import { Route, Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import moment from "moment/moment";
import './homeComponent.css'
import { EditUserInfo, EditMarketInfo, EditMenu, EditTable, SalesStatistics, ReviewComment, EditPreferences, SystemInfo, QrCode, } from "./settingComponent";
import socket from "../../socket-client";
import { Notify } from "notiflix";
// const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/5450');



let myStorage = window.localStorage; // 로컬스토리지 선언
socket.on('userOrder', (data) => {
  if (data) {
    console.log(data);
    myStorage.setItem(data[0].tableNumber, JSON.stringify(data));
    Notify.success('주문들어왔습니다.');
    // audio.play();
  }
  else {
    return null;
  }
})

//로컬스토리지는 도메인만 같으면 값을 공유함
//그러므로 사용자의 아이디로 url을 달리 해야할듯
//  ex) localhost:3000/start/joonmoogo
let tableSetting = myStorage.getItem('tableSetting') ? JSON.parse(myStorage.getItem('tableSetting')) : [
  { tableNumber: 1, tableName: 'red' },
  { tableNumber: 2, tableName: 'yellow' },
  { tableNumber: 3, tableName: 'olive' },
  { tableNumber: 4, tableName: 'green' },
  { tableNumber: 5, tableName: 'teal' },
  { tableNumber: 6, tableName: 'blue' },
  { tableNumber: 7, tableName: 'violet' },
  { tableNumber: 8, tableName: 'purple' },
  { tableNumber: 9, tableName: 'pink' },
  { tableNumber: 10, tableName: '예약' },
  { tableNumber: 11, tableName: 'yellow' },
  { tableNumber: 12, tableName: '예약' },
  { tableNumber: 13, tableName: '혼밥' },
  { tableNumber: 14, tableName: '혼밥' },
  { tableNumber: 15, tableName: '혼밥' },
];



let counterSetting = myStorage.getItem('counterSetting') ? JSON.parse(myStorage.getItem('counterSetting')) : [{ tableNumber: 10, tableName: '예약' }];

function TableGroup(props) { // 기본

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

  let [menuList, setMenuList] = useState([
    { product: '삼선짬뽕', price: 9000, count: 0 },
    { product: '군만두', price: 3000, count: 0 },
    { product: '쌀국수', price: 12000, count: 0 },
    { product: '짜사이', price: 2000, count: 0 },
    { product: '코코넛', price: 1000, count: 0 },
    { product: '반미', price: 1500, count: 0 },
  ]);

  //서버에서 받을 데이터 가입시 기본 설정

  function clearMenuCount() {
    setMenuList([
      { product: '삼선짬뽕', price: 9000, count: 0 },
      { product: '군만두', price: 3000, count: 0 },
      { product: '쌀국수', price: 12000, count: 0 },
      { product: '짜사이', price: 2000, count: 0 },
      { product: '코코넛', price: 1000, count: 0 },
      { product: '반미', price: 1500, count: 0 },
    ])
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

  // function total(e){
  //   let total = 0;
  //   if(e ){
  //   let item = JSON.parse(myStorage.getItem(e));
  //   item.map((e)=>{
  //     total += e.price;
  //   })
  //   return total;
  // }

  //   return 0;
  // }

  function getTotal() {
    JSON.parse(myStorage.getItem((clickedTable).toString())).map((e) => {
      setTotal(total + e.price);
    })
  }

  let [total, setTotal] = useState(0);
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
                    setClickedTable(`${e.tableNumber}`);
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

                    </Table.Row>
                  </Table.Header>
                  <Table.Body >
                    {/* <TableRow>
                        <Table.Cell content={'hai'}></Table.Cell>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>13,000</Table.Cell>
                      </TableRow> */}

                    {JSON.parse(myStorage.getItem((clickedTable).toString())) != null ?
                      <>
                        {

                          JSON.parse(myStorage.getItem((clickedTable).toString())).map((e) => {
                            return (

                              <TableRow>

                                <Table.Cell>{e.product}</Table.Cell>
                                <Table.Cell>{e.price}</Table.Cell>
                                <Table.Cell>{e.count}</Table.Cell>
                              </TableRow>

                            )
                          })
                        }
                        {
                          temporaryOrder.map((e) => {

                            return (
                              <TableRow>
                                <Table.Cell>{e.product}</Table.Cell>
                                <Table.Cell>{e.price}</Table.Cell>
                                <Table.Cell>{e.count}</Table.Cell>
                              </TableRow>
                            )
                          })
                        }
                      </>
                      :
                      temporaryOrder.map((e) => {
                        return (
                          <TableRow>
                            <Table.Cell>{e.product}</Table.Cell>
                            <Table.Cell>{e.price}</Table.Cell>
                            <Table.Cell>{e.count}</Table.Cell>
                          </TableRow>

                        )

                      })

                    }

                  </Table.Body>
                </Table>
              </Segment>
              <Segment>

                <Header as='h3'>{`가격: ${myStorage.getItem(`${selectedTable.tableNumber}sum`) ? JSON.parse(myStorage.getItem(`${selectedTable.tableNumber}sum`)) + total : total} Won`}</Header >
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>메뉴<Button secondary floated="right" onClick={() => {
                setClickedTable();
                setTemporaryOrder([]);
                clearMenuCount();
                setTotal(0)
              }}>X</Button></Segment>
              <Segment>
                <Card.Group itemsPerRow={2}>

                  {menuList.map((e, i) => {
                    return (

                      <Card color="teal" onClick={() => {

                        e.tableNumber = selectedTable.tableNumber;
                        e.time = new Date().getTime();
                        e.count = e.count + 1;
                        setTotal(total + e.price);
                        // temporaryOrder.push(e);
                        // (e.count ==1 ? temporaryOrder.push(e) : null)
                        if (e.count == 1) temporaryOrder.push(e);
                        setTemporaryOrder([...temporaryOrder]);

                      }}>
                        <Card.Content>
                          <Card.Header content={e.product}></Card.Header>
                          <Card.Meta content={e.price}></Card.Meta>
                        </Card.Content>
                      </Card>

                    )
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
                  myStorage.getItem(`${selectedTable.tableNumber}sum`) ?
                    myStorage.setItem(`${selectedTable.tableNumber}sum`, JSON.parse(myStorage.getItem(`${selectedTable.tableNumber}sum`)) + total)
                    : myStorage.setItem(`${selectedTable.tableNumber}sum`, total);
                  setTotal(0)
                  let localItem = JSON.parse(myStorage.getItem(selectedTable.tableNumber));
                  localItem == null ? //스토리지에 아이템이 없다면?
                    <>
                      {myStorage.setItem(selectedTable.tableNumber, `${JSON.stringify(temporaryOrder)}`)}
                    </>
                    :
                    <>
                      {myStorage.setItem(selectedTable.tableNumber, `${JSON.stringify([...localItem, ...temporaryOrder])}`)}
                    </>
                  {
                    let kitchen = myStorage.getItem('kitchen');
                    // myStorage.setItem('kitchen',myStorage.getItem(kitchen))

                    myStorage.setItem(`kitchen${selectedTable.tableNumber}`, myStorage.getItem(selectedTable.tableNumber));

                  }

                }}>주문</Button>

                <Button primary onClick={() => {
                  alert('결제')
                  console.log(JSON.parse(myStorage.getItem(selectedTable.tableNumber)));
                  console.log(JSON.parse(myStorage.getItem(`${selectedTable.tableNumber}sum`)));
                  console.log(new Date());
                  console.log('서버에 결제요청');
                  setTemporaryOrder([]);
                  setClickedTable();
                  setTotal(0)
                  myStorage.removeItem(clickedTable.toString())
                  myStorage.removeItem(`${clickedTable}sum`.toString());

                }}>결제</Button>

                <Button secondary onClick={() => {
                  alert('주문취소');
                  setClickedTable();
                  setTemporaryOrder([]);
                  setTotal(0)
                  myStorage.removeItem(clickedTable.toString());
                  myStorage.removeItem(`kitchen${clickedTable}`.toString());
                  myStorage.removeItem(`${clickedTable}sum`.toString());
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
  const paragraph = <ImageComponent src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

  return (
    <>
      <Item.Group link>
        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />

          <Item.Content>
            <Item.Header>Stevie Feliciano</Item.Header>
            <Item.Description>{paragraph}</Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

          <Item.Content>
            <Item.Header>Veronika Ossi</Item.Header>
            <Item.Description>{paragraph}</Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/veronika.jpg' />

          <Item.Content>
            <Item.Header>Jenny Hess</Item.Header>
            <Item.Description>{paragraph}</Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />

          <Item.Content>
            <Item.Header>Stevie Feliciano</Item.Header>
            <Item.Description>{paragraph}</Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />

          <Item.Content>
            <Item.Header>Veronika Ossi</Item.Header>
            <Item.Description>{paragraph}</Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/veronika.jpg' />

          <Item.Content>
            <Item.Header>Jenny Hess</Item.Header>
            <Item.Description>{paragraph}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/veronika.jpg' />

          <Item.Content>
            <Item.Header>Jenny Hess</Item.Header>
            <Item.Description>{paragraph}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/veronika.jpg' />

          <Item.Content>
            <Item.Header>Jenny Hess</Item.Header>
            <Item.Description>{paragraph}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/veronika.jpg' />

          <Item.Content>
            <Item.Header>Jenny Hess</Item.Header>
            <Item.Description>{paragraph}</Item.Description>
          </Item.Content>
        </Item>


      </Item.Group>
      <Button color='teal' fluid size='large' onClick={() => {
        console.log('button was clicked');
      }}>
        대기열 추가
      </Button>
    </>
  )
}

function FindReceipe() { //영수증조회탭 서버에서 불러온 데이터로 구성될 예정
  let [data, setData] = useState([
    { date: '2023-01-06', value: '오후 4:49', menu: ['쌀국수 | 3 | 36000', '짜사이 | 2 | 4000', '삼선짬뽕 | 2 | 18000'] },
    { date: '2023-01-06', value: '오후 4:50', menu: ['곱창2개', '밥2인분', '치킨'] },
    { date: '2023-01-06', value: '오후 4:51', menu: ['내장', '김치찌개', '피자'] },
    { date: '2023-01-06', value: '오후 4:52', menu: ['양고기', '밥2인분', '청양고추'] },
    { date: '2023-01-06', value: '오후 4:53', menu: ['양배추', '오미자', '청양고추'] },
    { date: '2023-01-06', value: '오후 4:54', menu: ['마라탕', '밥2인분', '간장계란밥'] },
    { date: '2023-01-06', value: '오후 4:55', menu: ['칭따오', '밥2인분', '청양고추'] },
    { date: '2023-01-06', value: '오후 4:54', menu: ['마라탕', '밥2인분', '간장계란밥'] },
  ])
  let [viewData, setViewData] = useState([]);
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
                      console.log(viewData.menu)
                    }}>
                      <Table.Cell>{i + 1}</Table.Cell>
                      <Table.Cell>{e.date}</Table.Cell>
                      <Table.Cell>{e.value}</Table.Cell>
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
            <h3>[주문영수증] 안성 석정 아이라이포</h3>
            <h3>============================</h3>
            <h5>매장 주소: 경기 안성시 중앙로 328 가동 103,104호</h5>
            <h5>매장 번호:152-129301-519209</h5>
            <h4>주문 날짜: {viewData.date}</h4>
            <h5>주문 시각: {viewData.value}</h5>
            <h5>상품명 /t수량 /t 금액</h5>
            {viewData.menu && viewData.menu.map((e) => {
              return (
                <List.Item>
                  <List.Content>
                    <List.Description as='a'>
                      {e}
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            })}
            </List>
          </Segment>
          <Segment>
            <h1>58000 Won</h1>
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
  let kitchenOrder = Object.keys(localStorage).filter((e) => e.length >= 6 && e.length < 11).sort();
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
          {state == 'QrCode' ? <QrCode item={tableSetting} /> : null}
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