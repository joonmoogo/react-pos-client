import { Icon,Divider,Image,Popup,List, Button } from "semantic-ui-react";
import {getReservations} from '../../controllers/ReservationController.ts'
import '../../styles/animation.css';
import { useEffect, useState } from "react";
export default function InfoButton(){

    useEffect(()=>{
        getReservations().then((data)=>{
            console.log(data.data);
            setReservation(data.data);
        })
    },[])
    
    const [reservation,setReservation] = useState([]);
    
    return(
        <Popup 
            className='fade-in-modal-button'
            trigger={<Button style={{ 
            top:'90%',
            left:'90%',
            position: 'absolute',
            backgroundColor:"red"}}
            size="large"
            circular 
            color='google plus'
            icon='tasks' 
            on='click'
            position="top right"
            onClick={()=>{
                console.log('infoButton was clicked');
            }}
            />}
            content={
                reservation.map((e)=>{
                    return(
                  <div>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' avatar  />
                    <span style={{fontSize:'5px'}}>{e.id}님이 예약을 신청했습니다.</span>
                    <Divider clearing />                   
                </div>
                    )
                })
            }
            />
    )
}


