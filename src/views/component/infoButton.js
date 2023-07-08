import { Transition,Rating,Popup,Accordion, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow } from "semantic-ui-react";
import { useState } from "react";
import '../component/animation.css';
function InfoButton(){
    const [visible, setVisible] = useState(true);
    const transitions = [
        'browse',
        'browse right',
        'drop',
        'fade',
        'fade up',
        'fade down',
        'fade left',
        'fade right',
        'fly up',
        'fly down',
        'fly left',
        'fly right',
        'horizontal flip',
        'vertical flip',
        'scale',
        'slide up',
        'slide down',
        'slide left',
        'slide right',
        'swing up',
        'swing down',
        'swing left',
        'swing right',
        'zoom',
      ]
      const options = transitions.map((name) => ({
        key: name,
        text: name,
        value: name,
      }))
      console.log(options);
      const [style,setStyle] = useState('fade-in');
    return(
        <div style={{}}>
        {/* <Transition.Group>
        </Transition.Group> */}
        
        <Popup size="large" className={style}  trigger={<Button style={{ 
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
                // setVisible(!visible);
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
            {/* <Button onClick={()=>{
                setVisible(!visible);
            }}>animation button</Button>
           <Transition.Group animation="fade" duration={500}>
                {visible && (<List>hihi</List>)}
            </Transition.Group> */}
            
            </div>
    )
}


export default InfoButton;