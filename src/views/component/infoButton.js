import { Rating,Popup,Accordion, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow } from "semantic-ui-react";

function InfoButton(){
    return(
        <div style={{}}>
        <Popup trigger={<Button style={{ 
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
            content={<>
            <List>⁘ some task is here Check me </List>
            <List>⁘ some task is here Check me </List>
            <List>⁘ some task is here Check me </List>
            <List>⁘ some task is here Check me </List>
            <List>⁘ some task is here Check me </List>
            <List>⁘ some task is here Check me </List>
            <List>⁘ some task is here Check me </List>
            <List>⁘ some task is here Check me </List>
            </>}
            />
           
            </div>
    )
}


export default InfoButton;