import logo from './assets/logo.svg'
import './App.css';
import LoginForm from './views/LoginForm';
import SignUp from './views/SignUp';
import Main from './views/Main';
import Home from './views/home';
import { useLocation,useParams, Routes, Route, Link } from 'react-router-dom'
import { Container, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { useState,useEffect } from 'react';
import clickSound from './assets/clickSound.js';
import Loading from './views/Loading.js';
import UserOrder from './views/userOrder';
import Dictaphone from './views/voice';
import Kiosk from './views/kiosk';
import WildCardPage from './views/wildCardPage';


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm></LoginForm>} />
        <Route path='/main' element={<Main></Main>} />
        <Route path='/detail' element={<div>디테일 페이지임</div>} />
        <Route path='/signUp' element={<SignUp></SignUp>} />
        <Route path='*' element={<div><WildCardPage/></div>} />
        <Route path='/home' element={<Home></Home>} />
      
        {/* table order or experimental services */}

        {/* <Route path='/test' element={<UserOrder option={1}></UserOrder>} /> */}
        {/* <Route path='/voice' element={<Dictaphone></Dictaphone>} />
        <Route path='/kiosk' element={<Kiosk></Kiosk>} />

        {table != 0 ? table.map((e, i) => {
          return (
            <Route path={`/home/order/${e.privateKey}`} element={<Loading option={i}></Loading>} />
          )
        }) : null}
        <Route path={`/home/order/${localStorage.getItem('secretNumber1')}`} element={<UserOrder option={1}></UserOrder>} /> */}
      </Routes>
    </>
  );
  
}

export default App;
