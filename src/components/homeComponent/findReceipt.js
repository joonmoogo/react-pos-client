import { React, useState } from "react";
import { Form,Divider,Table, List, Grid, Button, Segment } from "semantic-ui-react";
import ReceiptUtil from '../../utils/ReceiptUtil.ts';




export default function FindReceipe() { //영수증조회탭 서버에서 불러온 데이터로 구성될 예정
    const company = JSON.parse(localStorage.getItem('company'));
    const initialCompany = company ? company : '';
    let [data, setData] = useState(ReceiptUtil.filteredData)
    let [viewData, setViewData] = useState();
    let viewdatasmenu = viewData? (JSON.parse(localStorage.getItem(viewData))) : null;
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
                      <Table.Row style={{cursor:'pointer'}}  key={i} onClick={() => {
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
            <Segment size="mini">
            <Form size='mini' >
              <Form.Group widths='equal'>
                <Form.Field
                  id='month'
                  control='input'
                  placeholder='month'
                  onChange={(event)=>{
                    const uservalue = event.target.value;
                    const date = document.querySelector('#date');
                    if(!date.value){
                      setData(ReceiptUtil.filterByMonth(uservalue));
                    }
                }}
                />
                <Form.Field
                  id='date'
                  control='input'
                  placeholder='date'
                  onChange={(event)=>{
                    const userValue = event.target.value;
                    const month = document.querySelector('#month');
                    if(month.value){
                      setData(ReceiptUtil.filterByDate(month.value,userValue));
                    }
                  }}
                />
              </Form.Group>
              <Divider hidden />
            </Form>
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
