import { React, useState, createRef, useEffect, useRef } from "react";
import { Label, Menu, Grid, Container, Sticky, TransitionablePortal, Segment, Header, Button, Card } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { saveTable } from "../controllers/TableController";

function TableSetting() {
    const userInfo = JSON.stringify(localStorage.getItem('tableSetting'));

    let navigate = useNavigate();
    let [option, setOption] = useState(['기본 2인석', '기본 4인석', '단체 6인석', '단체 8인석', '혼밥석']);

    const nodeRef = useRef(null);
    const [table, setTable] = useState([]);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [Opacity, setOpacity] = useState(false);


    const trackPos = (data) => {
        setPosition({ x: data.coordX, y: data.coordY });

    };
    const handleStart = (e, data) => {
        console.log(data);

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
        <Container style={{ marginTop: '20px' }} className="fade-in">
            <Grid>
                <Grid.Column width={4} >
                    <Sticky>
                        <Menu fluid vertical tabular color="teal">
                            {option.map((e, i) => {
                                return (
                                    <Menu.Item

                                        style={{ marginTop: '20px', fontSize: '15px' }}
                                        key={e}
                                        onClick={(event) => {
                                            const tableName = event.target.innerHTML;
                                            console.log(tableName)
                                            setTable([...table, { name: tableName, coordX: 0, coordY: 0, width: 0, height: 0 }])
                                            console.log(table)
                                        }}
                                    >
                                        {e}
                                    </Menu.Item>
                                )
                            })}
                            <Menu.Item

                                style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '18px' }}
                                name={'저장하고 나가기'}
                                onClick={() => {
                                    localStorage.setItem('tableSetting', JSON.stringify(table));
                                    alert('저장완료')
                                    saveTable({ tableList: table }).then(() => {
                                        navigate('/home')
                                    })
                                }}
                            />
                            <Menu.Item

                                style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '18px' }}
                                name={'나가기'}
                                onClick={() => {
                                    navigate('/home')
                                }}
                            />
                        </Menu>
                    </Sticky>
                </Grid.Column>


                <Grid.Column stretched width={12}>
                    {table.map((e, i) => {
                        return (
                            <>
                                <Draggable
                                    handle=".handle"
                                    bounds='parent'
                                    nodeRef={nodeRef}
                                    onDrag={(event, data) => trackPos(data)}
                                    onStart={(e, data) => handleStart(e, data)}
                                    onStop={(event, data) => {
                                        handleEnd(event, data);
                                        e.coordX = (data.x).toFixed(0);
                                        e.coordY = (data.y).toFixed(0);
                                        e.height = (event.target.parentElement.style.height);
                                        e.width = (event.target.parentElement.style.width);
                                        e.privateKey = i + 1;

                                        console.log(table);
                                    }}
                                >
                                    <div
                                        onClick={()=>{'div was clicked'}}
                                        ref={nodeRef}
                                        style={{ opacity: Opacity ? "0.6" : "1", position: 'absolute' }}
                                    >
                                        <Card
                                            onClick={() => { 'i was clicked' }}
                                            color="green"
                                            style={{ height: '130px', width: '130px', overflow: 'auto', resize: 'both' }}>
                                            <Card.Content className="handle" >
                                                <Card.Header content={`${i + 1}T`} />
                                                <Card.Meta content={e.name} />
                                            </Card.Content>
                                        </Card>

                                    </div>
                                </Draggable>

                            </>
                        )
                    })}
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default TableSetting;