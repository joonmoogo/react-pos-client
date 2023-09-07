import { Header,Comment,Icon,Divider,Image,Popup,List, Button } from "semantic-ui-react";
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
            style={{ overflow: 'scroll', height: '80%' }}
            className='fade-in-modal-button no-scroll '
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
                
                      <Comment.Group size='mini'>
                        <Comment>
                            <Comment.Avatar as='a' src='/images/avatar/small/matt.jpg' />
                            <Comment.Content>
                            <Comment.Author as='a'>Junmugo</Comment.Author>
                            <Comment.Metadata>
                                <span>Today at 5:42PM</span>
                            </Comment.Metadata>
                            <Comment.Text>6:50PM Reservation</Comment.Text>
                            <Comment.Actions>
                                <a>✔️</a><a>❌</a>
                            </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                        </Comment.Group>                
                
                    )
                })
            }
            />
    )
}


