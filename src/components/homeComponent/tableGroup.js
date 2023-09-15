import { React, useEffect, useState } from "react";
import { Table, Card, Menu, Grid, Header, Button, Segment, TableRow } from "semantic-ui-react";
import InfoButton from "./infoButton";
import OrderFactory from "../../utils/OrderFactory.ts";
import { getMenus } from "../../controllers/menuController.ts";
import { getTables } from "../../controllers/TableController.ts";
import { deleteOrder, editOrder, getOrder, saveOrder } from '../../controllers/OrderController.ts';
import { getUser } from '../../controllers/UserController';
import { deleteOrderDetail, getOrderDetail, saveOrderDetail } from '../../controllers/OrderDetailController.ts'
import '../../styles/animation.css'
export default function TableGroup(props) { // 기본

    useEffect(() => {
        getMenus().then((data) => {
          setMenuList(data.data);
          localStorage.setItem('menu', JSON.stringify(data?.data));
        });
      
        getUser().then((data) => {
          console.log(data);
          setAccountId(data.id);
        });
      
        getOrder().then((data) => {
          const orders = data.data;
          const filtered = orders.filter((e)=>e.orderCode == 'ORDER' ); 
          setOrderList(filtered)
          
      
          getTables().then((data) => {
            console.log(data);
            const tabledata = data?.data;
            console.log(tabledata);
            setTable(tabledata);
      
            const hol = document.querySelector('#hol');
            if (hol) {
              hol.classList.add('fade-in');
            }
          });
        });
      }, []);

    function findMenuById(){
        console.log(menuList);
    }
    

    const [accountId,setAccountId] = useState();
    const [orderList,setOrderList] = useState([]);
    let [table, setTable] = useState([]);
    
    let [clickedTable, setClickedTable] = useState();
    let [orderNumber, setOrderNumber] = useState();
    let [orderDetail,setOrderDetail] = useState([]);
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
                    <Card.Group id='hol'>
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
                                        // findMenuById();
                                        const items = JSON.parse(localStorage.getItem(e.id));
                                         setClickedTable(`${e.id}`);
                                        if (items) {
                                            setTemporaryOrder(items);
                                        }
                                        console.log(`tableId = ${e?.id}`);
                                        const foundOrder = orderList.find((order) => {
                                            return order.tableId === e.id && order.orderCode === 'ORDER' ;
                                          });
                                          
                                          const orderNum = foundOrder ? foundOrder.id : null;
                                          console.log(orderNum);
                                        setOrderNumber(orderNum);
                                        console.log(`orderId = ${orderNum}`);
                                        if(orderNum != null){
                                            getOrderDetail(orderNum).then((data)=>{
                                                setOrderDetail(data?.data);
                                                console.log(data?.data);
                                            })
                                        }                        
                                    }}>
                                    <Card.Content >
                                        <Card.Header content={`${e.id} T`} />
                                        <Card.Meta content={`${e.name}`}/>
                                        
                                        
                                        {localStorage.getItem(e.id) == null
                                            ? <Card.Description content='' />
                                            : JSON.parse(localStorage.getItem(e.id)).map((e) => {
                                                return (
                                                    <Card.Description style={{ color: 'teal' }} content={`${e?.name} ${e?.count}`} />
                                                )
                                            })}

                                    </Card.Content>
                                </Card>



                            )
                        })}
                       
                    </Card.Group>
                </>
                : 
                
                <Grid columns='equal' relaxed className="fade-in">
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
                                                <TableRow className="slide-from-right" onClick={() => {
                                                    console.log(`${e.product} was clicked`);
                                                }}>
                                                    <Table.Cell>{e.name}</Table.Cell>
                                                    <Table.Cell>{e.price}</Table.Cell>
                                                    <Table.Cell>{e.count}</Table.Cell>
                                                    <Table.Cell style={{ cursor: 'pointer' }} onClick={(event) => {
                                                        console.log(`${e.name} delete button was clicked`);
                                                        console.log(event);
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
                                setOrderNumber();
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
                                                    e.tableId = selectedTable.id;
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
                                    console.log(clickedTable);
                                    saveOrder({
                                        accountId : accountId,
                                        tableId : clickedTable,
                                        // orderTime? : string,
                                        // paymentTime? : string,
                                        // reservationTime? : string,
                                        orderCode : 'ORDER',
                                        // reservationDenyDetail? : string,
                                    }).then((data)=>{
                                        getOrder().then((data)=>{
                                        
                                           const orderArray = data.data;
                                           console.log(orderArray);
                                           
                                           console.log('hio');
                                           setOrderList(orderArray);
                                           const order = orderArray.find((e)=>{
                                            return(
                                                e.tableId == clickedTable && e.orderCode == 'ORDER'
                                            )
                                           })
                                           console.log(order);
                                           temporaryOrder.forEach((e)=>{
                                            saveOrderDetail({
                                                orderId: parseInt(order?.id), 
                                                menuId: parseInt(e?.id),
                                                amount: parseInt(e?.count),
                                            })
                                            console.log(order?.id,e?.id,e?.count);
                                            
                                        })
                                        })
                                        
                                    }).catch((error)=>{
                                        console.log(error);
                                    })
                                    console.log(temporaryOrder);
                                    
                                    alert('주문');
                                    setClickedTable();
                                    setTemporaryOrder([]);
                                    clearMenuCount();
                                    setOrderNumber();
                                    
                                }}>주문</Button>

                                <Button primary onClick={() => {

                                    editOrder({
                                        id : orderNumber,
                                        tableId : clickedTable,
                                        // orderTime? : string,
                                        // paymentTime? : string,
                                        // reservationTime? : string,
                                        orderCode : 'PAYMENT'
                                    }).then((data)=>{
                                        console.log(data);
                                        alert('결제')
                                    console.log(JSON.parse(localStorage.getItem(selectedTable.id)));
                                    const date = new Date();
                                    console.log(date)
                                    console.log('서버에 결제요청');
                                    const orderFactory = new OrderFactory(clickedTable);
                                    orderFactory.getReceipt(temporaryOrder).setLocalStorage();
                                    setTemporaryOrder([]);
                                    setOrderNumber();
                                    setClickedTable();
                                    clearMenuCount();
                                    localStorage.removeItem(clickedTable.toString())
                                    const filter = orderList.filter((e)=> e.id !== orderNumber );
                                    setOrderList(filter);
                                    console.log(orderList);
                                    })

                                }}>결제</Button>

                                <Button secondary onClick={() => {

                                    deleteOrder(orderDetail[0]?.orderId).then((data)=>{
                                        console.log(data);
                                    }).then(()=>{
                                        orderDetail.forEach((e)=>{
                                            deleteOrderDetail(e?.id).then((data)=>{
                                                console.log(data);
                                            })
                                        })                                        
                                    })
                                    const filter = orderList.filter((e)=> e.id !== orderNumber );
                                    setOrderList(filter);
                                    console.log(orderList);
                                    
                                    alert('주문취소');
                                    setClickedTable();
                                    setTemporaryOrder([]);
                                    setOrderNumber(null);
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
