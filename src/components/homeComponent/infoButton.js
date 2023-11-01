import { Header, Comment, Icon, Divider, Image, Popup, List, Button } from "semantic-ui-react";
import { getReservations } from '../../controllers/ReservationController.ts'
import '../../styles/animation.css';
import { useEffect, useRef, useState } from "react";
import { getUser, getUserById } from "../../controllers/UserController.ts";
import { getOrderDetail } from "../../controllers/OrderDetailController.ts";
import { getMenuById } from "../../controllers/menuController.ts";
import Draggable from "react-draggable";
import toast from "react-hot-toast";
export default function InfoButton() { // 홀 화면에서 나타나는 info버튼, 알림을 나타낸다.
    let userArray = [];
    const [reservationUser, setReservationUser] = useState([]);
    const [reservation, setReservation] = useState([]);
    const [menus, setMenus] = useState([]);
    const notify = () => toast('Here is your toast.');
    const nodeRef = useRef(null);


    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // 날짜와 시간을 원하는 형태로 조합
        const formattedDateTime = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
        return formattedDateTime;
    }


    return (
        <Popup
            className='fade-in-modal-button no-scroll '
            trigger={
                <Button style={{
                    top: '90%',
                    left: '90%',
                    position: 'absolute',
                    backgroundColor: "red",
                    border: '2px solid black'
                }}
                    size="large"
                    circular
                    color='google plus'
                    icon='alarm'
                    onClick={() => {
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
                                        reservationTime: e.reservationTime,
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
                    }}
                />
            }
            position="top right"
            on='click'
            pinned
            content={
                <Comment.Group className="no-scroll fade-in" size='mini' style={{ overflow: 'scroll', height: '320px', width: '200px', opacity: '0.8' }}>
                    {reservationUser.map((e) => {
                        return (
                            <Comment>
                                <Comment.Avatar style={{ height: '40px', borderRadius: '100px' }} src={`/serverImage/${e.profilePhoto}`} />
                                <Comment.Content>
                                    <Comment.Author as='a'><Header style={{ fontSize: 14, color: 'teal' }}>{e.nickname}</Header>님이 예약 신청 하셨습니다.</Comment.Author>
                                    <Comment.Text>방금</Comment.Text>


                                </Comment.Content>
                            </Comment>
                        )
                    })}
                </Comment.Group>
            }
        />
    )
}


