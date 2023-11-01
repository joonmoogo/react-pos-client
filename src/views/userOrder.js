import { React, useEffect, useState } from "react";
import { TableRow, Tab, Label, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, Sticky } from "semantic-ui-react";
import socket from "../modules/socket-client"
import { Notify, Report } from "notiflix";
import { useParams } from "react-router-dom";

function UserOrder(storeItem) { // 테이블 오더를 나타내기 위한 화면


  return (
    <>
      im userOrder
    </>
    // <>
    //   <Header as='h3' icon='food' content={`${props.option}번 테이블`} />

    //   <Tab panes={panes} menu={{ color: 'teal' }} />
    //   <Card.Group itemsPerRow={2}>
    //     {menuList.map((e) => {
    //       return (
    //         <Card color="teal" onClick={() => {
    //           e.tableNumber = props.option
    //           e.time = new Date().getTime();
    //           e.count = e.count + 1;
    //           setTotal(total + e.price);
    //           if (e.count == 1) temporaryOrder.push(e);
    //           setTemporaryOrder([...temporaryOrder]);
    //         }}>
    //           <Card.Content>
    //             <Card.Header content={e.product}></Card.Header>
    //             <Card.Meta content={e.price}></Card.Meta>
    //           </Card.Content>
    //         </Card>
    //       )
    //     })}
    //   </Card.Group>
    //   <Segment className="no-scroll" style={{ overflow: 'scroll', height: '130px' }} >
    //     <Table fixed selectable singleLine >
    //       <Table.Body>
    //         {JSON.parse(localStorage.getItem((props.option).toString())) != null ?
    //           <>
    //             {
    //               JSON.parse(localStorage.getItem((props.option).toString())).map((e) => {
    //                 return (
    //                   <TableRow style={{ backgroundColor: 'lightgrey' }}>
    //                     <Table.Cell>{`${e.product} / ${e.price}원 / ${e.count}개 주문완료`}</Table.Cell>
    //                   </TableRow>
    //                 )
    //               })
    //             }
    //             {
    //               temporaryOrder.map((e) => {
    //                 return (
    //                   <TableRow>
    //                     <Table.Cell>{`${e.product} / ${e.price}원 / ${e.count}개`}</Table.Cell>
    //                   </TableRow>
    //                 )
    //               })
    //             }
    //           </>
    //           :
    //           temporaryOrder.map((e) => {
    //             return (
    //               <TableRow>
    //                 <Table.Cell>{`${e.product} / ${e.price}원 / ${e.count}개`}</Table.Cell>
    //               </TableRow>
    //             )
    //           })
    //         }
    //       </Table.Body>
    //     </Table>
    //   </Segment>
    //   <Segment>
    //     <Header as='h3'>{`가격: ${localStorage.getItem(`${props.option}sum`) ? JSON.parse(localStorage.getItem(`${props.option}sum`)) + total : total} 원`}</Header>
    //   </Segment>
    //   <Segment>
    //     <Button color="teal" onClick={() => {
    //       temporaryOrder.length == 0 ?
    //         Report.warning('메뉴가 비었는데요?', '', 'OKAY') :
    //         socket.emit('order', temporaryOrder)
    //       setTemporaryOrder([]);

    //     }}>주문</Button>
    //     <Button color="red" onClick={() => {

    //       setTemporaryOrder([]);
    //       setTotal(0);
    //       clearMenuCount();

    //     }}>취소</Button>

    //   </Segment>
    // </>
  )
}




export default UserOrder