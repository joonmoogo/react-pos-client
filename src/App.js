import logo from './assets/logo.svg'
import './App.css';
import LoginForm from './views/LoginForm';
import SignUp from './views/SignUp';
import Main from './views/Main';
import Home from './views/home';
import { useLocation, useParams, Routes, Route, Link } from 'react-router-dom'
import { Container, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { useState, useEffect } from 'react';
import clickSound from './assets/clickSound.js';
import Loading from './views/Loading.js';
import UserOrder from './views/userOrder';
import Dictaphone from './views/voice';
import Kiosk from './views/kiosk';
import WildCardPage from './views/wildCardPage';
import TableGroup from './components/homeComponent/tableGroup';
import { EventSource, EventSourcePolyfill } from 'event-source-polyfill';
import TableSetting from './views/tableSetting';
import { getStores } from './controllers/StoreController';
import { getTables } from './controllers/TableController';


function App() {


  const [store, setStore] = useState([]);
  // 리액트 웹페이지의 모든 라우트를 나타낸다.
  // 실험적 기능들은 주석처리 해놓았다. 
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm></LoginForm>} /> 
        <Route path='/main' element={<Main></Main>} />
        <Route path='/detail' element={<div>디테일 페이지임</div>} />
        <Route path='/signUp' element={<SignUp></SignUp>} />
        <Route path='*' element={<div><WildCardPage /></div>} />
        <Route path='/home' element={<Home></Home>} />
        <Route path='/tables' element={<TableGroup></TableGroup>} />
        <Route path='/tableSetting' element={<TableSetting></TableSetting>} />
        {/* table order or experimental services */}
        {/* <Route path='/voice' element={<Dictaphone></Dictaphone>} /> */}
        {/* <Route path='/kiosk' element={<Kiosk></Kiosk>} /> */}
        <Route path={"/home/order/:param1/:param2"} element={<UserOrder></UserOrder>} />
        {/* {store.map((storeItem, index) => (
          <Route
            key={index}
            path={`/home/order/${storeItem.id}`}
            element={<UserOrder storeItem={storeItem} />}
          />
        ))} */}
      </Routes>
    </>
  );

}

export default App;
