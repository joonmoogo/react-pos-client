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
        setPosition({ x: data.x, y: data.y });
    };
    const handleStart = (e, data) => {
        setOpacity(true);
        console.log(`x:${data.x.toFixed(0)} y:${data.y.toFixed(0)} w:${e.target.parentElement.style.width} h:${e.target.parentElement.style.height}`);
    };
    const handleEnd = (event, data) => {
        console.log(data);
        setOpacity(false);
    };
    return (
        <>
            <Menu fluid style={{ borderBottom: '1px solid lightGrey ' }}>
                <Menu.Item><Button onClick={() => {
                    setTable([...table, { tableNumber: table.length + 1, tableName: '기본석', x: 0, y: 0, w: 0, h: 0 }])
                    console.log(table)
                }}>테이블</Button></Menu.Item>
              
                <Menu.Item><Button primary onClick={() => {
                    console.log(table);
                    alert('저장완료')
                    table.forEach((e)=>{
                        saveTable({
                            name:'기본석',
                            coordX:e.x,
                            coordY:e.y,
                            width:e.w,
                            height:e.h,
                            privateKey:e.privateKey,
                        })
                    })
                    localStorage.setItem('tableSetting', JSON.stringify(table));
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
                            e.x = (data.x + 30).toFixed(0);
                            e.y = (data.y + 50).toFixed(0);
                            e.h = (event.target.parentElement.style.height);
                            e.w = (event.target.parentElement.style.width);
                            e.privateKey = Math.floor(Math.random() * 99999999);
                            
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
                                    <Card.Meta content={e.tableName} />
                                </Card.Content>
                            </Card>

                        </div>
                    </Draggable>
                )
            })}

        </>
    )
}
