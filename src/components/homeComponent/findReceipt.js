import { React, useState } from "react";
import { Accordion, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow } from "semantic-ui-react";




function FindReceipe() { //영수증조회탭 서버에서 불러온 데이터로 구성될 예정
    const company = JSON.parse(localStorage.getItem('company'));
    const initialCompany = company ? company : '';
    let localData = Object.keys(localStorage);
    console.log(localData);
    let filtered = localData ? localData.filter((e)=>e.includes('receipt')).sort() : [] ;
    console.log(filtered);
    let [data, setData] = useState(filtered)
    let [viewData, setViewData] = useState();
    console.log(`this is ${viewData}`);
    let viewdatasmenu = viewData? (JSON.parse(localStorage.getItem(viewData))) : null;
    console.log(viewdatasmenu);
    function getTotal(){
      let sum = 0;
      viewdatasmenu&&viewdatasmenu.map((e,i)=>{
        sum += e.price * e.count;
      })
      return sum;
    }
    return (
      <Grid columns='equal' relaxed>
        <Grid.Row>
          <Grid.Column >
            <Segment>영수증 목록</Segment>
            <Segment className="no-scroll" style={{ overflow: 'scroll', height: '60%' }}>
              <Table fixed singleLine selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>index</Table.HeaderCell>
                    <Table.HeaderCell>date</Table.HeaderCell>
                    <Table.HeaderCell>time</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body >
                  {data.map((e, i) => {
                    return (
                      <Table.Row key={i} onClick={() => {
                        setViewData(e);
                        console.log(viewData)
                        console.log(typeof(viewData));
                      }}>
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>{e.split('|')[1]}</Table.Cell>
                        <Table.Cell>{e.split('|')[2]}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>조회</Segment>
            <Segment>
              <List>
              {/* <h1>이것은</h1>
                      <h1>영수증</h1> */}
              <h3>[주문영수증]   {initialCompany.company}</h3>
              <h3>============================</h3>
              <h5>{initialCompany.address}</h5>
              <h5>152-129301-519209</h5>
              <h5>open : {initialCompany.openingTime} | close:{initialCompany.closingTime}</h5>
              <h4>주문 날짜: {viewData&&viewData.split('|')[1]}</h4>
              <h5>주문 시각: {viewData&&viewData.split('|')[2]}</h5>
              <h5>상품명 /t수량 /t 금액</h5>
              {viewdatasmenu&& viewdatasmenu.map((e) => {
                return (
                  <List.Item>
                    <List.Content>
                      <List.Description as='h3'>
                        {`⁘ ${e.product} ${e.count} * ${e.price} = ${e.count * e.price}`}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                )
              })}
              </List>
            </Segment>
            <Segment>
              <h1>{`${getTotal()} won `}</h1>
            </Segment>
            <Segment>
              <Button primary>환불처리</Button>
              <Button secondary>영수증출력</Button>
            </Segment>
  
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
export default FindReceipe;