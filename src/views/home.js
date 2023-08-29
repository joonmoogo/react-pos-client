import { React, useState, createRef, useEffect } from "react";
import { Label, Menu, Grid, Container, Sticky,TransitionablePortal,Segment,Header,Button } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'
import TableGroup from '../components/homeComponent/tableGroup'
import WaitingList from "../components/homeComponent/waitingList";
import ReservationList from "../components/homeComponent/reservationList";
import OrderList from "../components/homeComponent/orderList";
import Manager from "../components/homeComponent/manager";
import FindReceipe from "../components/homeComponent/findReceipt";
import { getStores } from "../controllers/StoreController.ts";
import Modal from "../components/homeComponent/modalComponent/modal";
function Home() {
  const userInfo = JSON.stringify(localStorage.getItem('tableSetting'));
  useEffect(()=>{
    // getStores().then((response)=>{
    //   if(response.data.length == 0){
    //     console.log('it is null');
    //     setModal(true);
    //   }
    // })
    // setModal(true);
  },[])
  let navigate = useNavigate();
  let [menu, setMenu] = useState('홀');
  let [tableGroup, setTableGroup] = useState(false);
  let [option, setOption] = useState(['홀', '예약', '대기', '영수증 조회', '주방']);
  let [labelOption, setLabelOption] = useState([1, 0, 0, 0, 0, 0]);
  let [modal,setModal] = useState();
  let [count,setCount] = useState(1);
  // let contextRef = createRef();
  function handleModalNext() {
    console.log(count);
    setCount(count+1);
    setMenu(option[count])
    if(count>=option.length){
      setMenu('관리자');
    }
  }
  function handleModalOpen(){
    if(count>option.length+1){
      console.log('false');
      return false;
    }
    else{
      console.log('true');
      return true;
    }
  }
  
  return (
    <Container style={{marginTop:'20px'}}>
      {modal?<Modal onModalNext={handleModalNext} onModalOpen={handleModalOpen} counter={count-1}/>:null}
      <Grid>
        <Grid.Column width={4} >
          <Sticky>
            <Menu fluid vertical tabular color="teal">
              {option.map((e, i) => {
                return (
                  <Menu.Item
                    
                    style={{marginTop:'20px'}}
                    key={e}
                    onClick={() => { setMenu(e); }}
                    active={menu == e}
                  >
                    {e}
                    {labelOption[i] != 0 ? <Label color='red' floating tag>{labelOption[i]}</Label> : null}
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

        <Grid.Column stretched width={12}>
          {menu === '홀' ? <TableGroup menu={menu} /> : null}
          {/* props로 전달 */}
          {menu === '예약' ? <ReservationList /> : null}
          {menu === '대기' ? <WaitingList /> : null}
          {menu === '주방' ? <OrderList /> : null}
          {menu === '영수증 조회' ? <FindReceipe /> : null}
          {menu === '관리자' ? <Manager /> : null}
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default Home;