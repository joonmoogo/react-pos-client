import {React,useState,createRef} from "react";
import { Label,Comment,Table,List,Image as ImageComponent,Item,Card,Menu,Message,Grid,Header,Button,Form,Segment,Image,Container, Sticky } from "semantic-ui-react";
import { Route,Link, useNavigate } from 'react-router-dom'
import {TableGroup,ReservationList,WaitingList,FindReceipe,OrderList,ReviewComment,Manager } from './component/homeComponent.js'

function Home(){
  
    let navigate = useNavigate();
    let [menu,setMenu]= useState('홀');
    let [tableGroup,setTableGroup] = useState(false);
    let [option,setOption]=useState(['홀','예약','대기','영수증 조회','주방']);
    let [labelOption,setLabelOption] = useState([0,3,9,0,0,1,0]);
    const hstyle = {
        marginTop:'20px',
    }
    let contextRef = createRef();
    return(

        <Container style={hstyle}>
        <Grid>
        <Grid.Column width={4} >
            <Sticky>
          <Menu fluid vertical tabular color="teal"  >
            {option.map((e,i)=>{
                return(
                <>    
                <Menu.Item style={hstyle}  key={e}
                 onClick={()=>{
                    setMenu(e);
                }}
                 active={menu==e}
                 >
                {e}
                {labelOption[i] != 0 ? <Label color='red' floating>{labelOption[i]}</Label> : null}
                 </Menu.Item>
                 
                 </>
                 
                )
            })}
            
            <Menu.Item style={{marginTop:'90px'}}  name={'관리자'} onClick={()=>{
              
              setMenu('관리자');
              }}
              active={menu=='관리자'}/>
          </Menu>
          </Sticky>
          
        </Grid.Column>
            
        <Grid.Column stretched width={12}>
            {menu =='홀' ? <TableGroup menu = {menu}/> : null} 
            {/* props로 전달 */}
            {menu =='예약' ? <ReservationList/> : null}
            {menu =='대기' ? <WaitingList/> : null}
            {menu =='주방' ? <OrderList/> : null}
            {menu =='영수증 조회' ? <FindReceipe/> : null}            
            {menu =='관리자' ? <Manager/> : null}
        </Grid.Column>
      </Grid>
        </Container>

        )
}


export default Home;