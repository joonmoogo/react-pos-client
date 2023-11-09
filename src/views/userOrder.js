import React, { useEffect, useState } from "react";
import { TableRow, Tab, Card, Table, Segment, Button, Header, Container } from "semantic-ui-react";
import socket from "../modules/socket-client";
import { getStoreByCoordinate, getMenusByTableId } from '../controllers/TableOrderController.ts';
import { formatCurrency } from "../utils/format";
import { useParams } from "react-router-dom";

function UserOrder() {
  const { param1, param2 } = useParams();
  const [storeData, setStoreData] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [temporaryOrder, setTemporaryOrder] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {

      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          getStoreByCoordinate(latitude, longitude, 999999999999).then((data) => {
            const storeArray = data.data;
            const foundStore = storeArray.find((store) => store.id === param1);
            socket.emit('enter', param1);
            setStoreData(foundStore);
          });
        },
        

      );
      getMenusByTableId(param2).then((data) => {
        const menuArray = data.data;
        menuArray.forEach((e) => {
          e.count = 0;
        });
        setMenuList(menuArray);
      });

  }, [param1, param2]);
  

  function addToOrder(e) {
    e.tableId = parseInt(param2);
    e.time = new Date().getTime();
    e.count += 1;
    e.orderer = '테이블 오더'
    setTotal(total + e.price);
    const existingItem = temporaryOrder.find((item) => item.id === e.id);
    if (!existingItem) {
      setTemporaryOrder([...temporaryOrder, e]);
    }
    setMenuList([...menuList]);
  }

  function clearMenuCount() {
    const updatedMenuList = menuList.map((menu) => {
      menu.count = 0;
      return menu;
    });
    setMenuList(updatedMenuList);
  }

  function placeOrder() {
    if (temporaryOrder.length === 0) {
      console.log('메뉴가 비었는데요?');
      return;
    }
    
    socket.emit('order',storeData.id, temporaryOrder);
    console.log(temporaryOrder);
    setTemporaryOrder([]);
    setTotal(0);
    clearMenuCount();
  }

  function cancelOrder() {
    setTemporaryOrder([]);
    setTotal(0);
    clearMenuCount();
  }

  return (
    <>
    <Container>
            <img src="/logo.png" alt="Company Logo" style={{ width: '120px', height: 'auto' }} />

      <Header as='h3' icon='food' content={`${param2}번 테이블`} />
      <Card.Group itemsPerRow={2}>
        {menuList.map((e) => (
          <Card color="teal" key={e.id} onClick={() => addToOrder(e)}>
            <Card.Content>
              <Card.Header content={e.name}></Card.Header>
              <Card.Meta content={`${formatCurrency(e.price)}원`}></Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <Segment className="no-scroll" style={{ overflow: 'scroll', height: '130px' }} >
        <Table fixed selectable singleLine>
          <Table.Body>
            {temporaryOrder.map((e) => (
              <TableRow key={e.id} className="slide-from-right">
                <Table.Cell>{`${e.name} / ${formatCurrency(e.price)}원 / ${e.count}개`}</Table.Cell>
              </TableRow>
            ))}
          </Table.Body>
        </Table>
      </Segment>
      <Segment>
        <Header as='h3'>{`가격: ${formatCurrency(total)} 원`}</Header>
      </Segment>
      <Segment>
        <Button color="teal" onClick={placeOrder}>
          주문
        </Button>
        <Button color="red" onClick={cancelOrder}>
          취소
        </Button>
      </Segment>
      </Container>
    </>
  );
}

export default UserOrder;
