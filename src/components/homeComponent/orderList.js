import { React, useState } from "react";
import { List, Header, Button, Segment } from "semantic-ui-react";


export default function OrderList() { //주방탭

    let kitchenOrder = Object.keys(localStorage).filter((e) => e.includes('kitchen')).sort();
    let [st, setSt] = useState(kitchenOrder);
    console.log(st);

    return (
        <Segment className="fade-in">
            <Header as='h5' block >주방임</Header>
            {kitchenOrder.map((e, i) => {
                return (
                    <List divided relaxed size="large" key={i}>
                        <Segment>
                            <Header as='h2' icon='food' content={e.tableNumber + '번 주문서'} />
                            <Button onClick={() => {
                                localStorage.removeItem(e);
                                setSt(kitchenOrder.splice(e, 1));
                            }} floated="right">✔</Button>
                            {JSON.parse(localStorage.getItem(e)).map((e) => {

                                return (
                                    <List.Item>
                                        <List.Content>
                                            <List.Header as='a'>{e.name}</List.Header>
                                            <List.Description as='a'>{e.count}개  {Number.parseInt((new Date() - e.time) / 1000 / 60)}분 전 주문</List.Description>
                                        </List.Content>
                                    </List.Item>
                                )
                            })}
                        </Segment>
                    </List>
                )
            })}
        </Segment>
    )
}
