import {React,useState} from "react";
import { TableRow,Tab,Label,Comment,Table,List,Image as ImageComponent,Item,Card,Menu,Message,Grid,Header,Button,Form,Segment,Image,Container, Sticky } from "semantic-ui-react";
import './component/homeComponent.css'
import socket from "../socket-client";
import { Notify,Report } from "notiflix";
import axios from 'axios';

const API_KEY='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';


// axios({
//   method: 'post',
//   url: 'https://api.openai.com/v1/completions',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${API_KEY}`
//   },
//   data: {
//     prompt:`다음은 사용자에게 받은 음성 메세지를 텍스트로 번역한 문장이다.\n 자장면 하나 짬뽕 하나요 \n 이를 다음과 같이 변환하라. [{menu1:" "count1:" "},{menu2:" "count2:" "}...]`,
//     max_tokens: 50,
//     temperature: 0.7,
//     model: "text-davinci-003",
//   }
// })
//   .then(response => {
//     console.log(response.data.choices[0].text);
//   })
//   .catch(error => {
//     console.error(error);
//   });



let tableSetting = localStorage.getItem('tableSetting')? JSON.parse(localStorage.getItem('tableSetting')) : [
    {tableNumber:1,tableName:'red'},
    {tableNumber:2,tableName:'yellow'},
    {tableNumber:3,tableName:'olive'},
    {tableNumber:4,tableName:'green'},
    {tableNumber:5,tableName:'teal'},
    {tableNumber:6,tableName:'blue'},
    {tableNumber:7,tableName:'violet'},
    {tableNumber:8,tableName:'purple'},
    {tableNumber:9,tableName:'pink'},
    {tableNumber:10,tableName:'예약'},
    {tableNumber:11,tableName:'yellow'},
    {tableNumber:12,tableName:'예약'},
    {tableNumber:13,tableName:'혼밥'},
    {tableNumber:14,tableName:'혼밥'},
    {tableNumber:15,tableName:'혼밥'},
  ];

  

function UserOrder(props){
  const [transcript, setTranscript] = useState('');

    const panes = [
        { menuItem: '메인 메뉴', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
        { menuItem: '사이드 메뉴', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
        { menuItem: '주류', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
      ]
      
      let [total,setTotal] = useState(0);

    let [table,setTable]=useState(tableSetting);

    let [temporaryOrder,setTemporaryOrder] = useState([]);

    table.map((e,i)=>{
      localStorage.setItem(`secretNumber${i+1}`,Math.round(Math.random()*99999999));
    })
    let [menuList, setMenuList] = useState([
        {product:'삼선짬뽕',price:9000,count:0},
        {product:'군만두',price:3000,count:0},
        {product:'쌀국수',price:12000,count:0},
        {product:'짜사이',price:2000,count:0},
        {product:'코코넛',price:1000,count:0},
        {product:'반미',price:1500,count:0},
      ]);

      function clearMenuCount(){
        setMenuList([
          {product:'삼선짬뽕',price:9000,count:0},
          {product:'군만두',price:3000,count:0},
          {product:'쌀국수',price:12000,count:0},
          {product:'짜사이',price:2000,count:0},
          {product:'코코넛',price:1000,count:0},
          {product:'반미',price:1500,count:0},
        ])
      }
      


    return(
        <>
        <Header as='h3' icon='food' content={`${props.option}번 테이블`}/>

        <Tab panes={panes} menu={{color:'teal'}} />
        <Card.Group itemsPerRow={2}>
            {menuList.map((e)=>{
                return(
                    <Card color="teal" onClick={()=>{
                        e.tableNumber = props.option
                        e.time = new Date().getTime();
                        e.count = e.count + 1;
                        setTotal(total + e.price);
                        // temporaryOrder.push(e);
                        // (e.count ==1 ? temporaryOrder.push(e) : null)
                        if(e.count ==1) temporaryOrder.push(e);
                        setTemporaryOrder([...temporaryOrder]); 
                    }}>
                        <Card.Content>
                            <Card.Header content={e.product}></Card.Header>
                            <Card.Meta content={e.price}></Card.Meta>
                        </Card.Content>
                    </Card>
                )
            })}
        
        </Card.Group>
        <Segment className="no-scroll" style={{overflow:'scroll',height:'130px'}} >
        
                  <Table fixed selectable singleLine >
                  
                  <Table.Body  >
                     

                      {JSON.parse(localStorage.getItem((props.option).toString())) != null ?
                      <>
                      {
                        
                      JSON.parse(localStorage.getItem((props.option).toString())).map((e)=>{
                        return(
                          
                          <TableRow style={{backgroundColor:'lightgrey'}}>                            
                            <Table.Cell>{`${e.product} / ${e.price}원 / ${e.count}개 주문완료`}</Table.Cell>                            
                          </TableRow>
                          
                        )
                      })
                    }
                    {
                       temporaryOrder.map((e)=>{
                        
                        return(
                          <TableRow>
                                <Table.Cell>{`${e.product} / ${e.price}원 / ${e.count}개`}</Table.Cell>
                          </TableRow>
                        )
                      })
                    }
                    </>
                      :
                      temporaryOrder.map((e)=>{ 
                        return(
                        <TableRow>
                            <Table.Cell>{`${e.product} / ${e.price}원 / ${e.count}개`}</Table.Cell>
                        </TableRow>
                          
                        )
                        
                      })
                      
                    }
                    
                      </Table.Body>
              </Table>
        </Segment>
        <Segment>
            <Header as='h3'>{`가격: ${localStorage.getItem(`${props.option}sum`)?JSON.parse(localStorage.getItem(`${props.option}sum`))+total: total} 원`}</Header>
        </Segment>
        <Segment>
            <Button color="teal" onClick={()=>{
              temporaryOrder.length==0?
                Report.warning('메뉴가 비었는데요?','','OKAY'):
                socket.emit('order',temporaryOrder)
                setTemporaryOrder([]);
                                            
            }}>주문</Button>
            <Button color="red" onClick={()=>{
              
                setTemporaryOrder([]);
                setTotal(0);
                clearMenuCount();
              
            }}>취소</Button>
            <Button color="blue"onClick={()=>{
              const recognition = new window.webkitSpeechRecognition();
              recognition.lang = 'ko-KR';
              recognition.start();
              console.log('it was clicked');
          
              recognition.onresult = (event) => {
                console.log('it was accepted');
                const resultIndex = event.resultIndex;
                const transcript = event.results[resultIndex][0].transcript;
                setTranscript(transcript);
                console.log(transcript);
                recognition.stop();

                axios({
                  method: 'post',
                  url: 'https://api.openai.com/v1/completions',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                  },
                  data: {
                    prompt:`다음은 사용자에게 받은 음성 메세지를 텍스트로 번역한 문장이다.\n ${transcript}\n
                     이를 다음과 같이 변환하라. [{menu1:" ",count1:" "},{menu2:" ",count2:" "},{menu3:" ",count3:" "}...]\n
                     menu는 [삼선짬뽕,군만두,짜사이,쌀국수,코코넛,반미]중 하나에 무조건 속한다.\n
                     만약 개수를 입력받지 않은 경우 개수는 1개로 한다.`,
                    max_tokens: 50,
                    temperature: 0.7,
                    model: "text-davinci-003",
                  }
                })
                  .then(response => {
                    console.log(response.data.choices[0].text);
                  })
                  .catch(error => {
                    console.error(error);
                  });
              };
            }}>

            음성</Button>
            <h1>{transcript}</h1>

        </Segment>
        </>
    )
}




export default UserOrder