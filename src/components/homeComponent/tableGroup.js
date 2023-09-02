import { React, useEffect, useState } from "react";
import { Table, Card, Menu, Grid, Header, Button, Segment, TableRow } from "semantic-ui-react";
import InfoButton from "./infoButton";
import OrderFactory from "../../utils/OrderFactory.ts";
import { getMenus } from "../../controllers/menuController.ts";
import { getTables } from "../../controllers/TableController.ts";


export default function TableGroup(props) { // 기본

    useEffect(()=>{
        getMenus().then((data)=>{
            setMenuList(data.data);
            localStorage.setItem('menu',JSON.stringify(data.data));
        })
        getTables().then((data)=>{
            console.log(data);
            const tabledata = data.data;
            console.log(tabledata);
            setTable(tabledata);
        })
    },[])
    


    let [table, setTable] = useState([]);
    
    let [clickedTable, setClickedTable] = useState();
    const localMenu = JSON.parse(localStorage.getItem('menu'));
    const initialMenuList = localMenu ? localMenu : []
    let [menuList, setMenuList] = useState(initialMenuList);

    let localOption = [];
    function getLocalOption() {
        menuList.map((e, i) => {
            if (!(localOption.includes(e.category))) {
                localOption.push(e.category);
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
            e.id == clickedTable
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
                                    style={{ 
                                        width: `${e.width ? e.width : '90px'}`,
                                        height: `${e.height ? e.height : '80px'}`,
                                        top: `${e.coordY}px`,
                                        left: `${e.coordX}px`,
                                        overflow: 'hidden',
                                        position: 'absolute',
                                     }} // 이거 수정하셈 테이블세팅 
                                    onClick={() => {
                                        const items = JSON.parse(localStorage.getItem(e.id));
                                         setClickedTable(`${e.id}`);
                                        if (items) {
                                            setTemporaryOrder(items);
                                        }
                                        console.log(e.id);
                                        
                                        
                                    }}>
                                    <Card.Content >
                                        <Card.Header content={`${e.id} T`} />
                                        <Card.Meta content={`${e.name}`} />
                                        {localStorage.getItem(e.id) == null
                                            ? <Card.Description content='' />
                                            : JSON.parse(localStorage.getItem(e.id)).map((e) => {
                                                return (
                                                    <Card.Description style={{ color: 'teal' }} content={`${e.name} ${e.count}`} />
                                                )

                                            })}

                                    </Card.Content>
                                </Card>



                            )
                        })}
                       
                    </Card.Group>
                </>
                : 
                
                <Grid columns='equal' relaxed>
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
                                       
                                        {/* POS 주문 리스트 */}
                                        {temporaryOrder.map((e) => { // state의 내용만 출력
                                            return (
                                                <TableRow onClick={() => {
                                                    console.log(`${e.product} was clicked`);
                                                }}>
                                                    <Table.Cell>{e.name}</Table.Cell>
                                                    <Table.Cell>{e.price}</Table.Cell>
                                                    <Table.Cell>{e.count}</Table.Cell>
                                                    <Table.Cell style={{ cursor: 'pointer' }} onClick={() => {
                                                        console.log(`${e.name} delete button was clicked`);
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
                                        if (e.category == tabMenu) {
                                            return (
                                                <Card color="teal" onClick={() => {
                                                    console.log(clickedTable);
                                                    e.id = selectedTable.id;
                                                    e.time = new Date().getTime();
                                                    e.count = e.count?e.count+1:1
                                                 
                                                    if (e.count == 1) { temporaryOrder.push(e); }
                                                    setTemporaryOrder([...temporaryOrder]);
                                                    console.log(temporaryOrder)
                                                    console.log(e);
                                                }}>
                                                    <Card.Content>
                                                        <Card.Header content={e.name}></Card.Header>
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

                                    alert('주문');
                                    setClickedTable();
                                    setTemporaryOrder([]);
                                    clearMenuCount();
                                }}>주문</Button>

                                <Button primary onClick={() => {
                                    alert('결제')
                                    console.log(JSON.parse(localStorage.getItem(selectedTable.id)));

                                    const date = new Date();
                                    console.log(date)
                                    console.log('서버에 결제요청');
                                    const orderFactory = new OrderFactory(clickedTable);
                                    orderFactory.getReceipt(temporaryOrder).setLocalStorage();
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
