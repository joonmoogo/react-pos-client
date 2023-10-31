import { React, useState } from "react";
import { List, Header, Button, Segment } from "semantic-ui-react";


export default function OrderList() { //주방탭

    let kitchenOrder = Object.keys(localStorage).filter((e) => e.includes('kitchen')).sort();
    console.log(kitchenOrder);
    let [st, setSt] = useState(kitchenOrder);
    console.log(st);

    return (
        <>
            <Segment className="fade-in no-scroll" style={{ height: 450, overflow: 'scroll' }}>
                {kitchenOrder.map((e, i) => {
                    return (
                        <List divided relaxed size="large" key={i}>
                            <Segment>

                                {JSON.parse(localStorage.getItem(e)).map((e, i) => {
                                    return (
                                        <>
                                            <Header as='h2' icon='food' content={e.privateKey?e.privateKey + '번 테이블 주문서':e?.orderer +'님 예약 주문서'} />
                                            <Button onClick={() => {
                                                localStorage.removeItem(e);
                                                setSt(kitchenOrder.splice(e, 1));
                                            }} floated="right">✔️</Button>
                                            <List.Item key={i}>
                                                <List.Content>
                                                    <List.Header as='a'>{e.name}</List.Header>
                                                    <List.Description as='a'>{e.count}개  {Number.parseInt((new Date() - e.time) / 1000 / 60)}분 전 주문</List.Description>
                                                </List.Content>
                                            </List.Item>
                                        </>
                                    )
                                })}
                            </Segment>
                        </List>
                    )
                })}
            </Segment>
        </>
    )
}
