import React, { useEffect, useState } from "react";
import { List, Header, Button, Segment } from "semantic-ui-react";
import socket from "../../modules/socket-client";

export default function OrderList(props) { //주방탭

    const localStoreId = JSON.parse(localStorage.getItem('storeId'));
    useEffect(() => {
        let kitchenOrder = Object.keys(localStorage).filter((e) => e.includes('kitchen')).sort();
        console.log(kitchenOrder);
        setSt(kitchenOrder);
    }, [props])

    let [st, setSt] = useState([]);
    let [animation, setAnimation] = useState({}); // 각 아이템의 애니메이션 상태를 개별적으로 관리\

  
    return (
        <>
            <Segment className="fade-in no-scroll" style={{ height: 450, overflow: 'scroll' }}>
                {st.map((e, i) => {
                    console.log(e);
                    return (
                        <List id='orderlist' divided relaxed size="large" key={i} className={animation[i] ? 'slide-to-left' : 'slide-from-right'}>
                            <Segment>
                                <Button onClick={() => {
                                    setAnimation((prevAnimation) => {
                                        return { ...prevAnimation, [i]: true }; // 개별 아이템에 대한 애니메이션 상태를 업데이트
                                    });
                                    const data = localStorage.getItem(e); // localStorage에서 데이터 가져오기

                                    if (data) {
                                      const arr = JSON.parse(data); // 데이터가 유효하면 파싱
                                      arr.forEach((e) => {
                                        e.ready = true;
                                      });
                                      socket.emit('orderReady',localStoreId,arr);
                                    } else {
                                      console.log('유효한 데이터가 없습니다.');
                                    }
                                    
                                    setTimeout(() => {
                                        setAnimation((prevAnimation) => {
                                            const updatedAnimation = { ...prevAnimation };
                                            delete updatedAnimation[i]; // 해당 아이템에 대한 애니메이션 상태를 제거
                                            return updatedAnimation;
                                        });
                                        const updatedSt = [...st]; // Create a copy of the original st array
                                        updatedSt.splice(i, 1); // Remove the element at index i
                                        setSt(updatedSt); // Update the st state
                                        
                                        localStorage.removeItem(e);
                                    }, 500)
                                }} floated="right">✔️</Button>
                                {JSON.parse(localStorage.getItem(e)).map((item, j) => {
                                    return (
                                        <>
                                            <Header as='h2' icon='food' content={item.privateKey ? item.privateKey + '번 테이블 주문서' : item?.orderer + '님 예약 주문서'} />
                                            <List.Item key={j}>
                                                <List.Content>
                                                    <List.Header as='a'>{item.name}</List.Header>
                                                    <List.Description as='a'>{item.count}개  {Math.floor((new Date() - item.time) / 1000 / 60)}분 전 주문</List.Description>
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
