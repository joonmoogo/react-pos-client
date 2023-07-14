import { React, useState, createRef, useEffect } from "react";
import { Label, Menu, Grid, Container, Sticky } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'
import TableGroup from '../components/homeComponent/tableGroup'
import WaitingList from "../components/homeComponent/waitingList";
import ReservationList from "../components/homeComponent/reservationList";
import OrderList from "../components/homeComponent/orderList";
import Manager from "../components/homeComponent/manager";
import FindReceipe from "../components/homeComponent/findReceipt";
import axios from "axios";
import naver_id_login from '../modules/naver_login'

function Home() {

  // function naverSignInCallBack(){
  //   console.log(naver_id_login.getProfileData('email'));
  //   console.log(naver_id_login.getProfileData('name'));
  //   console.log(naver_id_login.getProfileData('age'));
  // }
  // naverSignInCallBack();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const naverToken = naver_id_login.oauthParams.access_token;
 
    // async function getNaver (){
    //   await axios.get(`https://openapi.naver.com/v1/nid/getUserProfile.json?access_token=${naverToken}`,{
    //     headers: {
    //       "Access-Control-Allow-Origin": `*`,
    //       'Access-Control-Allow-Credentials':"true",
    //     },
    //     withCredentials:true,

    //   }).then((data)=>{
    //     console.log(JSON.parse(data));
    //   })

    //   console.log(naver_id_login.profileParams);
    //   if(naverToken) alert(naverToken);
    //   // console.log(naver_id_login.oauthParams)

    // }
    // getNaver();
    alert(naverToken);



  }, [])

  // 네이버 사용자 프로필 조회
  let navigate = useNavigate();
  let [menu, setMenu] = useState('홀');
  let [tableGroup, setTableGroup] = useState(false);
  let [option, setOption] = useState(['홀', '예약', '대기', '영수증 조회', '주방']);
  let [labelOption, setLabelOption] = useState([0, 3, 9, 0, 0, 1, 0]);
  const hstyle = {
    marginTop: '20px',
  }
  // let contextRef = createRef();
  return (
    <Container style={hstyle}>
      <Grid>
        <Grid.Column width={4} >
          <Sticky>
            <Menu fluid vertical tabular color="teal">
              {option.map((e, i) => {
                return (
                  <Menu.Item
                    style={hstyle}
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