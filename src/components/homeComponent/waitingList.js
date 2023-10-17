import { React, useState } from "react";
import { Grid,Image,Item, Form, Segment, Header, Icon } from "semantic-ui-react";
import TimeUtil from "../../utils/moment.ts";


export default function WaitingList() {  //대기탭 미정
    let waiting = JSON.parse(localStorage.getItem('waiting'));
    let initialWaiting = waiting ? waiting : [];
    let [people, setPeople] = useState(initialWaiting);

    function formatPhoneNumber(phoneNumber) {
        // 숫자 이외의 문자 모두 제거
        const cleaned = phoneNumber.replace(/\D/g, '');
      
        // 11자리인 경우만 변환 (예: 01012345678)
        if (cleaned.length === 11) {
          return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else {
          // 다른 경우에는 그대로 반환
          return cleaned;
        }
      }
    
    return (
        <div className="fade-in">
                        <Header className="fixed-header" style={{borderBottom:'1px solid teal'}}><Icon color="teal" name="address book outline"/> 대기 목록 {people.length}</Header>
            <Segment style={{height:'440px', overflow:'scroll'}} className="no-scroll">            
            {people && people.map((e, i) => {
                return (
                    <Grid celled className="slide-from-right">
                        <Grid.Row style={{height:'120px'}}>
                        <Grid.Column width={2} style={{backgroundColor:'F3F4F5'}}>
                            <Header size="large">{i+1}팀</Header>
                            <Header size="tiny">{e.time}</Header>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header size="large">{e.name} {e.count}명 </Header>
                            <Header size="tiny">{e.phoneNumber}</Header>
                        </Grid.Column>
                        <Grid.Column  style={{ opacity:0.7,cursor:'pointer'}} width={2} onClick={()=>{
                            alert('고객 호출')
                        }} >
                            <Icon size="large" color="green" name="call">
                            </Icon>
                         <h6>고객 호출</h6>   
                        </Grid.Column>
                        <Grid.Column style={{ opacity:0.7,cursor:'pointer'}} width={2} onClick={()=>{
                            alert('착석 완료');
                        }}>
                            <Icon size="large" color="red" name="stop"></Icon>
                            <h6>착석 완료</h6>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                )
            })}
            </Segment>
            <Form style={{top:'100%', position:'absolute'} }>
                <Form.Group>
                    <Form.Input
                        placeholder='이름'
                        name='이름'
                        id='name'
                    />
                    <Form.Input
                        placeholder='인원 수'
                        name='인원 수'
                        id='count'
                    />
                    <Form.Input
                        placeholder='전화번호'
                        name='전화번호'
                        id='phone-number'
                    />
                    <Form.Button fluid color="teal" content='Submit' onClick={() => {
                        const name = document.querySelector('#name').value;
                        const count = document.querySelector('#count').value;
                        const phoneNumber = document.querySelector('#phone-number').value;
                        const time = new TimeUtil();
                        people.push({ name: name, count: count, phoneNumber:formatPhoneNumber(phoneNumber),time:time.getTime() });
                        setPeople([...people]);

                    }} />
                </Form.Group>
            </Form>
        </div>
    )
}

