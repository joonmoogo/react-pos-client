import { React, useEffect, useState } from "react";
import { Table, Image as ImageComponent, Item, Grid, Button, Segment } from "semantic-ui-react";

import Calendar from "react-calendar";
import moment from "moment/moment";
import '../../styles/calendar.css'
import '../../styles/animation.css'
import { approve, getReservations } from "../../controllers/ReservationController";
import { getUserById } from "../../controllers/UserController";
import OrderFactory from "../../utils/OrderFactory";
import { getOrderDetail } from "../../controllers/OrderDetailController";
import { editOrder } from "../../controllers/OrderController";

export default function ReservationList() { // 예약탭 서버에서 불러온 데이터로 구성될 예정
    const [value, setValue] = useState(new Date());

    const [reservationUser, setReservationUser] = useState([]);

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = month.toString().padStart(2, '0');

        const formattedDateTime = `${formattedDay}-${formattedMonth}-${year}`;

        return formattedDateTime;
    }
    function formatTime(timeString) {
        const date = new Date(timeString);

        const hours = date.getHours();
        const minutes = date.getMinutes();

        const period = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = (hours % 12 || 12).toString();
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const formattedTime = `${formattedHours}:${formattedMinutes}${period}`;

        return formattedTime;
    }
    function calculateRemainingTime(startTime, endTime) {
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        const timeDifference = endDate - startDate;

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        if (hours < 0) {
            return '시간 초과';
        }
        return `${hours} 시간 ${minutes} 분 남음`;
    }

    function getMenuInfo(menuArray, localMenu, orderer, tableId) {
        let resultArray = [];
        for (const menu of menuArray) {
          for (const item of localMenu) {
            if (menu.menuId === item.id) {
              resultArray.push({
                name: item.name,
                price: item.price,
                count: menu.amount,
                orderer:orderer,
                tableId:tableId,
                time: new Date().getTime()
              });
            }
          }
        }
        return resultArray;
      }

    useEffect(() => {
        getReservations().then((data) => {
            const reservationList = data.data;
            const promises = reservationList.map((e) =>
                getUserById(e.accountId).then((userData) => {
                    return {
                        orderId: e.id,
                        profilePhoto: userData.profilePhoto,
                        phoneNumber: userData.phoneNumber,
                        nickname: userData.nickname,
                        orderCode: e.orderCode,
                        reservationDate: formatDateTime(e.reservationTime),
                        reservationTime: formatTime(e.reservationTime),
                        date: e.reservationTime,
                        tableId: e.tableId,
                    };
                })
            );

            Promise.all(promises)
                .then((reservationUser) => {
                    setReservationUser(reservationUser);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }, [])



    let [viewData, setViewData] = useState([]);
    let date = new Date();
    return (
        <div className="fade-in">
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
                                                console.log(reservationUser);
                                                const date = moment(e).format("DD-MM-YYYY");
                                                const filteredData = reservationUser.filter((el) => el.reservationDate === date);
                                                setViewData(filteredData);
                                                console.log(filteredData);
                                            }}
                                            value={value}
                                            defaultView="month"
                                            view="month"
                                            tileContent={(date, view) => {
                                                const dateStr = moment(date.date).format("DD-MM-YYYY");
                                                const hasReservations = reservationUser.some((x) => x.reservationDate === dateStr);

                                                return (
                                                    <div className={hasReservations ? "dot" : ""}></div>
                                                );
                                            }}
                                        />
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment color="teal" className="no-scroll" style={{ overflow: 'scroll', height: '470px' }}>
                            {viewData.map((e, i) => {
                                return (
                                    <Segment key={i} className="slide-from-right" onClick={()=>{console.log(e)}}>
                                        <Item.Group link>
                                            <Item>
                                                <Item.Image size='mini' src={`/serverImage/${e.profilePhoto}`} />
                                                <Item.Content >
                                                    <Item.Header style={{ color: 'teal' }}>{e.nickname}</Item.Header>
                                                    <Item.Description>{e.reservationDate} {e.reservationTime}</Item.Description>
                                                    <Item.Description >{e.orderCode == 'RESERVATION_WAIT' ? `예약 대기중` : `예약 완료 ${e.tableId}T`}</Item.Description>
                                                    <Item.Description>{e.orderCode == 'RESERVATION_WAIT' ? null : calculateRemainingTime(date, e.date)}</Item.Description>
                                                    <Item.Description>
                                                        {e.orderCode == 'RESERVATION_WAIT' ?
                                                            <Button onClick={() => {
                                                                const id = e.orderId;
                                                                const orderCode = 'RESERVATION';
                                                                const reserveInfo = { id: id, orderCode: orderCode, reservationDenyDetail: null };
                                                                approve(reserveInfo).then((data) => {
                                                                    const originViewData = [...viewData];
                                                                    originViewData[i].orderCode = 'RESERVATION';
                                                                    setViewData(originViewData);
                                                                    console.log(data);
                                                                    alert('예약 승인');

                                                                })
                                                            }} circular icon='add user' color="facebook"></Button> : <Button circular color="teal" onClick={()=>{
                                                                getOrderDetail(e.orderId).then((data)=>{
                                                                    const menu = data.data;
                                                                    const localMenu = JSON.parse(localStorage.getItem('menu'));
                                                                    const filtered = getMenuInfo(menu,localMenu,e.nickname,e.tableId);
                                                                    console.log(menu);
                                                                    console.log(localMenu);
                                                                    console.log(filtered);
                                                                    const orderFactory = new OrderFactory(e.tableId);
                                                                    orderFactory.getOrder(filtered).setLocalStorage();
                                                                    orderFactory.getKitchenOrder(filtered).setLocalStorage();
                                                                    editOrder({
                                                                        id:e?.orderId,
                                                                        tableId:e?.tableId,
                                                                        orderCode:'ORDER'
                                                                    }).then((data)=>{
                                                                        console.log(data);
                                                                        alert('착석완료');    
                                                                    })
                                                                })
                                                            }} >착석</Button>}
                                                        <Button onClick={() => {

                                                        }} circular icon='address book' color="linkedin"></Button>
                                                        <Button circular icon='ban' color="google plus"></Button>
                                                    </Item.Description>
                                                    <Item.Description></Item.Description>
                                                </Item.Content>
                                            </Item>
                                        </Item.Group>
                                    </Segment>
                                )
                            })}
                        </Segment>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
