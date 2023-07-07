import { Accordion, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow } from "semantic-ui-react";

function InfoButton(){
    return(
        <Button style={{ 
            top:'90%',
            left:'90%',
            position: 'absolute',
            backgroundColor:'red'}}
            size="big"
            circular 
            color='google plus'
            icon='tasks' 
            onClick={()=>{
                console.log('infoButton was clicked');
            }}/>
    )
}

export default InfoButton;