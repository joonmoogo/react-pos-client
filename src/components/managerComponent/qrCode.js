import { React, useRef, useState } from "react";
import { TextArea, Label, Input, Divider, Checkbox, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow, Flag } from "semantic-ui-react";


function QrCode(props) {
    let item = props.item;
    console.log(item);
    return (
        <>
            {item.map((e, i) => {
                return (
                    <h3>{`${i + 1}번 테이블 localHost:3000/home/order/${e.privateKey}`}</h3>
                )
            })}

            <a href="https://ko.online-qrcode-generator.com/">qr생성사이트</a>
            <h1>qr은 셀프</h1>
        </>
    )
}
export default QrCode;