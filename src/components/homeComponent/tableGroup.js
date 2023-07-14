import { React, useState } from "react";
import { Table, Card, Menu, Grid, Header, Button, Segment, TableRow } from "semantic-ui-react";
import InfoButton from "./infoButton";
import OrderFactory from "../../utils/OrderFactory.ts";


export default function TableGroup(props) { // 기본
    let counterSetting = localStorage.getItem('counterSetting') ? JSON.parse(localStorage.getItem('counterSetting')) : [{ tableNumber: 10, tableName: '예약' }];
    let localTableList = JSON.parse(localStorage.getItem('tableSetting'));
    let initialTableList = localTableList ? localTableList : [];

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
    const localMenu = JSON.parse(localStorage.getItem('menu'));
    const initialMenuList = localMenu ? localMenu : []
    let [menuList, setMenuList] = useState(initialMenuList);

    let localOption = [];
    function getLocalOption() {
        initialMenuList.map((e, i) => {
            if (!(localOption.includes(e.option))) {
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



    function getTotal() {
        let sum = 0;
        temporaryOrder.map((e, i) => {
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
                                        const items = JSON.parse(localStorage.getItem(e.tableNumber));
                                        setClickedTable(`${e.tableNumber}`);
                                        if (items) {
                                            setTemporaryOrder(items);
                                        }
                                        console.log(e.tableNumber);
                                        
                                        
                                    }}>
                                    <Card.Content >
                                        <Card.Header content={`${e.tableNumber} T`} />
                                        <Card.Meta content={`${e.tableName}`} />
                                        {localStorage.getItem(e.tableNumber.toString()) == null
                                            ? <Card.Description content='' />
                                            : JSON.parse(localStorage.getItem(e.tableNumber)).map((e) => {
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
                                                <TableRow onClick={() => {
                                                    console.log(`${e.product} was clicked`);
                                                }}>
                                                    <Table.Cell>{e.product}</Table.Cell>
                                                    <Table.Cell>{e.price}</Table.Cell>
                                                    <Table.Cell>{e.count}</Table.Cell>
                                                    <Table.Cell style={{ cursor: 'pointer' }} onClick={() => {
                                                        console.log(`${e.product} delete button was clicked`);
                                                        let filtered = temporaryOrder.filter((el) => el.time !== e.time);
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
                                    {getLocalOption().map((e, i) => {
                                        return (
                                            <Menu.Item key={e} onClick={() => {
                                                setTabMenu(e)
                                            }}
                                                active={tabMenu == e}>{e}</Menu.Item>
                                        )
                                    })}
                                </Menu>
                                <Card.Group itemsPerRow={2}>
                                    {menuList.map((e, i) => {
                                        if (e.option == tabMenu) {
                                            return (
                                                <Card color="teal" onClick={() => {
                                                    console.log(clickedTable);
                                                    e.tableNumber = selectedTable.tableNumber;
                                                    e.time = new Date().getTime();
                                                    e.count = e.count + 1;
                                                    // temporaryOrder.push(e);
                                                    // (e.count ==1 ? temporaryOrder.push(e) : null)
                                                    if (e.count == 1) { temporaryOrder.push(e); }
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
                                    
                                    const orderFactory = new OrderFactory(clickedTable);
                                    orderFactory.getOrder(temporaryOrder).setLocalStorage();
                                    orderFactory.getKitchenOrder(temporaryOrder).setLocalStorage();
                                    // orderFactory.setOrder(temporaryOrder);
                                    // orderFactory.setKitchenOrder(temporaryOrder);    
                                    alert('주문');
                                    setClickedTable();
                                    setTemporaryOrder([]);
                                    clearMenuCount();
                                }}>주문</Button>

                                <Button primary onClick={() => {
                                    alert('결제')
                                    console.log(JSON.parse(localStorage.getItem(selectedTable.tableNumber)));

                                    const date = new Date();
                                    console.log(date)
                                    console.log('서버에 결제요청');
                                    const orderFactory = new OrderFactory(clickedTable);
                                    orderFactory.getReceipt(temporaryOrder).setLocalStorage();
                                    // OrderFactory.setReceipt(temporaryOrder);
                                    setTemporaryOrder([]);
                                    setClickedTable();
                                    clearMenuCount();
                                    localStorage.removeItem(clickedTable.toString())

                                }}>결제</Button>

                                <Button secondary onClick={() => {
                                    alert('주문취소');
                                    setClickedTable();
                                    setTemporaryOrder([]);
                                    localStorage.removeItem(clickedTable.toString());
                                    localStorage.removeItem(`kitchen${clickedTable}`.toString());
                                }}>주문취소</Button>
                            </Segment>



                        </Grid.Column>
                    </Grid.Row>
                </Grid>}
            {!clickedTable ? <InfoButton /> : null}


        </>
    )
}
