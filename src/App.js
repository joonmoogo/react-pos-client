import logo from './logo.svg';


import './App.css';
import LoginForm from './views/LoginForm';
import SignUp from './views/SignUp';
import Main from './views/Main';
import Home from './views/home';
import { useParams,Routes, Route, Link } from 'react-router-dom'
import { Container,Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { useState } from 'react';
import Loading from './views/Loading';
import UserOrder from './views/userOrder';
import Dictaphone from './views/voice';
import Kiosk from './views/kiosk';
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");


// document.body.addEventListener('mousedown',()=>{
//   audio.play();
// })


function App() {
  let table = localStorage.getItem('tableSetting') ? JSON.parse(localStorage.getItem('tableSetting')) : 0;
  let menu = [
    {product:'삼선짬뽕',price:9000,count:0},
    {product:'군만두',price:3000,count:0},
    {product:'쌀국수',price:12000,count:0},
    {product:'짜사이',price:2000,count:0},
    {product:'코코넛',price:1000,count:0},
    {product:'반미',price:1500,count:0},
  ];

  console.log(table);
  return (
    // <LoginForm></LoginForm>
    <> 
    {/* fragment 문법 = <> </> */}
    <Routes>
      <Route path='/' element={<LoginForm></LoginForm>}/>
      <Route path='/main' element={<Main></Main>}/>
      <Route path='/detail' element={<div>디테일 페이지임</div>}/>
      <Route path='/signUp' element={<SignUp></SignUp>}/>
      <Route path='/test' element={<UserOrder option={1}></UserOrder>}/>
      <Route path='*' element={<div>페이지가 만료됨</div>}/>
      <Route path='/home' element={<Home></Home>}/>
      <Route path='/voice' element={<Dictaphone></Dictaphone>}/>
      <Route path='/kiosk' element={<Kiosk></Kiosk>}/>

      {table!=0?table.map((e,i)=>{
        return(
          <Route path={`/home/order/${e.privateKey}`} element={<Loading option={i}></Loading>}/>
        )
      }):null}
    <Route path={`/home/order/${localStorage.getItem('secretNumber1')}`} element={<UserOrder option={1}></UserOrder>}/>      
      
    </Routes>
    </>  
  );
}

export default App;
