import { React, useEffect, useState } from "react";
import { Table, Image as ImageComponent, Item, Grid, Button, Segment } from "semantic-ui-react";

import Calendar from "react-calendar";
import moment from "moment/moment";
import '../../styles/calendar.css'
import '../../styles/animation.css'
import { approve, getReservations } from "../../controllers/ReservationController";
import { getUserById } from "../../controllers/UserController";

export default function ReservationList() { // 예약탭 서버에서 불러온 데이터로 구성될 예정
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
                                                console.log(viewData);
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
                            {viewData.map((e,i) => {
                                return (
                                    <Segment className="slide-from-right">
                                        <Item.Group link>
                                            <Item >
                                                <Item.Image size='mini' src={`/serverImage/${e.profilePhoto}`} />
                                                <Item.Content >
                                                    <Item.Header style={{ color: 'teal' }}>{e.nickname}</Item.Header>
                                                    <Item.Description>{e.reservationDate} {e.reservationTime}</Item.Description>
                                                    <Item.Description>{e.orderCode=='RESERVATION_WAIT'?`${e.orderId}번 예약 대기중`:"예약 완료"}</Item.Description>
                                                    <Item.Description>
                                                        {e.orderCode=='RESERVATION_WAIT'?
                                                        <Button onClick={()=>{
                                                            const id = e.orderId;
                                                            const orderCode = 'RESERVATION';
                                                            const reserveInfo = {id:id,orderCode:orderCode,reservationDenyDetail:null};
                                                            approve(reserveInfo).then((data)=>{
                                                                const originViewData = [...viewData];
                                                                originViewData[i].orderCode='RESERVATION';
                                                                setViewData(originViewData);
                                                                console.log(data);
                                                                alert('예약 승인');
                                                                
                                                            })
                                                        }} circular icon='add user' color="facebook"></Button>:null}
                                                        <Button onClick={()=>{
                                                            
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
