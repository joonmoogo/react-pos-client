import { Popup,List, Button } from "semantic-ui-react";

import '../../styles/animation.css';
export default function InfoButton(){
 
    return(
        <div style={{}}>
        <Popup size="large" className='fade-in'  trigger={<Button style={{ 
            top:'90%',
            left:'90%',
            position: 'absolute',
            backgroundColor:'red'}}
            size="large"
            circular 
            color='google plus'
            icon='tasks' 
            onClick={()=>{
                console.log('infoButton was clicked');
            }}/>}
            content={
            <>
                <List>⁘ here's some task</List>
                <List>⁘ here's some task</List>
                <List>⁘ here's some task</List>
                <List>⁘ here's some task</List>
                <List>⁘ here's some task</List>
                <List>⁘ here's some task</List>
            </>}
            style={{}}
            on='click'
            position="top right"
            />
            </div>
    )
}


