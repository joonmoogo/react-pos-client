import { React, useState } from "react";
import { Table, Image as ImageComponent, Item, Grid, Button, Segment } from "semantic-ui-react";

import Calendar from "react-calendar";
import moment from "moment/moment";
import '../../styles/calendar.css'

export default function ReservationList() { // 예약탭 서버에서 불러온 데이터로 구성될 예정
    const [value, setValue] = useState(new Date());
    const paragraph = <ImageComponent src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

    // Sample reservation data 
    let [data, setData] = useState([
        { date: '15-05-2023', time: '6:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
        { date: '15-05-2023', time: '7:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
        { date: '15-05-2023', time: '8:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
        { date: '25-05-2023', time: '9:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
        { date: '15-05-2023', time: '10:30pm', name: '오준묵', menu: ['삼선짬뽕', "쌀국수"] },
    ]);

    let [viewData, setViewData] = useState([]);

    return (
        <div className="fade-in">
            <Grid columns='equal' relaxed>
                <Grid.Row>
                    <Grid.Column >
                        <Segment>
                            <Table fixed singleLine selectable>
                                <Table.Body >
                                    <Table.Row>
                                        <Calendar
                                            onChange={setValue}
                                            onClickDay={(e) => {
                                                setViewData([]);
                                                const date = moment(e).format("DD-MM-YYYY");
                                                data.map((e) => {
                                                    if (e.date == date) {
                                                        setViewData([...viewData, e]);
                                                        console.log(viewData);
                                                    }
                                                })
                                            }}
                                            value={value}
                                            defaultView="month"
                                            view="month"
                                            tileContent={(date, view) => {
                                                let html = [];
                                                if (data.find((x) => x.date == moment(date.date).format("DD-MM-YYYY"))) {
                                                    html.push(<div className="dot"></div>)
                                                }
                                                return (
                                                    <>
                                                        {html}
                                                    </>
                                                )
                                            }}
                                        />
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment color="teal" className="no-scroll" style={{ overflow: 'scroll', height: '100%' }}>
                            <Segment>
                                <Item.Group link>
                                    {viewData.map((e) => {
                                        return (
                                            <Item>
                                                <Item.Image size='mini' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
                                                <Item.Content >
                                                    <Item.Header>{e.time}</Item.Header>
                                                    <Item.Description>{e.date}</Item.Description>
                                                    <Item.Description>{e.name}</Item.Description>
                                                    <Item.Description>
                                                        <Button circular icon='add user' color="facebook"></Button>
                                                        <Button circular icon='address book' color="linkedin"></Button>
                                                        <Button circular icon='ban' color="google plus"></Button>
                                                    </Item.Description>
                                                    <Item.Description></Item.Description>
                                                </Item.Content>
                                            </Item>
                                        )
                                    })}
                                </Item.Group>
                            </Segment>
                        </Segment>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
