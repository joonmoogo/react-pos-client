import { Transition,Rating,Popup,Accordion, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow } from "semantic-ui-react";
import { useState } from "react";
import Draggable from "react-draggable";
import '../../styles/animation.css';
function InfoButton(){
 
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


export default InfoButton;