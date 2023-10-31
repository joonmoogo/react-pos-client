import { React, useState, createRef, useEffect } from "react";
import { Label, Menu, Grid, Container, Sticky, TransitionablePortal, Segment, Header, Button } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'
import TableGroup from '../components/homeComponent/tableGroup'
import WaitingList from "../components/homeComponent/waitingList";
import ReservationList from "../components/homeComponent/reservationList";
import OrderList from "../components/homeComponent/orderList";
import Manager from "../components/homeComponent/manager";
import FindReceipe from "../components/homeComponent/findReceipt";
import { getStores } from "../controllers/StoreController.ts";
import Modal from "../components/homeComponent/modalComponent/modal";
import { getReservations, getReservationsList } from "../controllers/ReservationController";
import { EventSourcePolyfill } from "event-source-polyfill";
import toast, { Toaster } from "react-hot-toast";
import TableSetting from "./tableSetting";
import socket from "../modules/socket-client";

function Home() {
  const userInfo = JSON.stringify(localStorage.getItem('tableSetting'));
  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await getReservations();
        const array = data.data;

        let newCount = 0;

        array.forEach((e, i) => {
          if (e.orderCode === 'RESERVATION_WAIT') {
            newCount++;
          }
        });

        setCount(newCount);
        setLabelOption([0, newCount, 0, 0, 0, 0]);
        console.log(newCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const localItem = localStorage.getItem('hknuToken');
    let access_token;
    if (localItem) {
      access_token = JSON.parse(localItem);
    }
    const headers = {
      'access_token': access_token,
      "access-control-allow-headers": "*",
      "access-control-allow-methods": "*",
      "access-control-allow-origin": "*",
    };

    const eventSource = new EventSourcePolyfill('http://localhost:8080/notifications/subscribe', { headers: headers, heartbeatTimeout: 86400000 });
    console.log(eventSource);

    eventSource.onopen = (event) => {
      console.log(event);
      console.log(eventSource.CONNECTING);
    };

    eventSource.addEventListener('SERVER_CONNECT', (e) => { 
      console.log(e) });
    eventSource.addEventListener('RESERVATION_INSERT', (e) => {
      console.log(e);
      toast(`hello 예약 신청 들어왔어요!`,
          {
            icon: '👏',
            style: {
              borderRadius: '100px',
              scale:'1.3',
              background: '#333',
              color: '#fff',
            },
          }
          
        );
        setLabelOption((prevLabelOption) => {
          const updatedLabelOption = [...prevLabelOption];
          updatedLabelOption[1] += 1;
          return updatedLabelOption;
        });

    });
    eventSource.addEventListener('RESERVATION_UPDATE', (e) => { console.log(e) });
    eventSource.addEventListener('RESERVATION_DELETE', (e) => { console.log(e) });
    console.log(eventSource.OPEN);
    return () => {
      // 컴포넌트가 언마운트되면 EventSource 닫기
      eventSource.close();
    };
  }, []);
  let navigate = useNavigate();
  let [menu, setMenu] = useState('홀');
  let [tableGroup, setTableGroup] = useState(false);
  let [option, setOption] = useState(['홀', '예약', '대기', '영수증 조회', '주문 목록']);
  let [labelOption, setLabelOption] = useState([0, 0, 0, 0, 0, 0]);
  let [modal, setModal] = useState();
  let [count, setCount] = useState(0);


  // let contextRef = createRef();
  function handleModalNext() {
    console.log(count);
    setCount(count + 1);
    setMenu(option[count])
    if (count >= option.length) {
      setMenu('관리자');
    }
  }
  function handleModalOpen() {
    if (count > option.length + 1) {
      console.log('false');
      return false;
    }
    else {
      console.log('true');
      return true;
    }
  }

  return (
    <Container style={{ marginTop: '50px' }} className="fade-in">
      {modal ? <Modal onModalNext={handleModalNext} onModalOpen={handleModalOpen} counter={count - 1} /> : null}
      <Grid>
        <Grid.Column width={4} >
          <Sticky>
            <Menu fluid vertical tabular color="teal">
              {option.map((e, i) => {
                return (
                  <Menu.Item

                    style={{ marginTop: '30px' ,fontSize:'16px',}}
                    key={e}
                    onClick={() => { setMenu(e); }}
                    active={menu == e}
                  >
                    {e}
                    {labelOption[i] != 0 ? <Label color='red' floating>{labelOption[i]}</Label> : null}
                  </Menu.Item>
                )
              })}
              <Menu.Item
                style={{ marginTop: '90px' }}
                name={'관리자'}
                onClick={() => { setMenu('관리자'); }}
                active={menu == '관리자'} />
            </Menu>
          </Sticky>
        </Grid.Column>
        <Toaster />

        <Grid.Column stretched width={12}>
          {menu === '홀' ? <TableGroup menu={menu} /> : null}
          {/* props로 전달 */}
          {menu === '예약' ? <ReservationList /> : null}
          {menu === '대기' ? <WaitingList /> : null}
          {menu === '주문 목록' ? <OrderList /> : null}
          {menu === '영수증 조회' ? <FindReceipe /> : null}
          {menu === '관리자' ? <Manager /> : null}
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default Home;