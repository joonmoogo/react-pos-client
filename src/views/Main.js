import React, { useEffect, useState } from "react";
import { Card, Grid, Header, Button, Form, Segment, Image } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'
import TimeUtil from "../utils/moment.ts";
import { getStores, setOpen } from '../controllers/StoreController.ts'
import { getUser } from "../controllers/UserController.ts";
import StoreOpen from "./storeOpen.js";
import Store from "./store.js";
function Main() {
  const [storeName, setStoreName] = useState();
  const [storeId, setStoreId] = useState();
  const [ifNoStore, setIfNoStore] = useState();

  useEffect(() => {  // 서버에 데이터 요청을 위한 useEffect 훅 
    getStores().then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.data.length == 0) {
        setIfNoStore(true);
      }
    }).catch((error) => {
      console.error(error);
    })
  }, [])

  return (
    <>
    {/* 계정에 Store가 있다면 생성하는 화면을, 그렇지 않다면 가게 개점 화면을 출력한다. */}
      {ifNoStore ? <Store></Store> : <StoreOpen></StoreOpen>}
    </>
  )
}

export default Main;