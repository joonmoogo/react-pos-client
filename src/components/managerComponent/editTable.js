import { React, useEffect, useRef, useState } from "react";
import { TextArea, Label, Input, Divider, Checkbox, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow, Flag } from "semantic-ui-react";

import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { getTables, saveTable } from '../../controllers/TableController.ts'

export default function EditTable() {

    useEffect(()=>{
        getTables().then((data)=>{
            console.log(data.data)
        })
    },[])

    const nodeRef = useRef(null);
    const [table, setTable] = useState([]);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [Opacity, setOpacity] = useState(false);
    const trackPos = (data) => {
        setPosition({ x: data.coordX, y: data.coordY });
        
    };
    const handleStart = (e, data) => {
        
        setOpacity(true);
        console.log(`
        coordX:${data.x.toFixed(0)}
        coordY:${data.y.toFixed(0)}
        width:${e.target.parentElement.style.width}
        height:${e.target.parentElement.style.height}`);
    };
    const handleEnd = (event, data) => {
        console.log(data);
        setOpacity(false);
    };
    return (
        <>
            <Menu fluid style={{ borderBottom: '1px solid lightGrey ' }}>
                <Menu.Item><Button onClick={() => {
                    setTable([...table, {name:'기본석',coordX: 0, coordY: 0, width: 0, height: 0 }])
                    console.log(table)
                }}>테이블</Button></Menu.Item>
              
                <Menu.Item><Button primary onClick={() => {

                    localStorage.setItem('tableSetting',JSON.stringify(table));
                    alert('저장완료')
                    saveTable({tableList:table});
                }}>Save</Button></Menu.Item>
            </Menu>
            
            {table.map((e, i) => {
                return (
                    <Draggable
                        nodeRef={nodeRef}
                        onDrag={(event, data) => trackPos(data)}
                        onStart={(e, data) => handleStart(e, data)}
                        onStop={(event, data) => {
                            handleEnd(event, data);
                            e.coordX = (data.x + 30).toFixed(0);
                            e.coordY = (data.y + 50).toFixed(0);
                            e.height = (event.target.parentElement.style.height);
                            e.width = (event.target.parentElement.style.width);
                            e.privateKey =String(Math.floor(Math.random() * 99999999));
                            
                            console.log(table);
                        }}
                    >
                        <div

                            ref={nodeRef}
                            style={{ opacity: Opacity ? "0.6" : "1", position: 'absolute' }}
                        >
                            <Card
                                onClick={() => { 'i was clicked' }}
                                color="green"
                                style={{ height: '80px', width: '90px', overflow: 'auto', resize: 'both' }}>
                                <Card.Content >
                                    <Card.Header content={`${i + 1}T`} />
                                    <Card.Meta content={e.name} />
                                </Card.Content>
                            </Card>

                        </div>
                    </Draggable>
                )
            })}

        </>
    )
}
