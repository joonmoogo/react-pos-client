import { React, useRef, useState } from "react";
import { TextArea, Label, Input, Divider, Checkbox, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow, Flag } from "semantic-ui-react";


function EditMenu() {
    const localMenu = JSON.parse(localStorage.getItem('menu'));
    const initialMenues = localMenu ? localMenu : [];
    const [menues, setMenues] = useState(initialMenues);


    return (
        <>
            <Table basic='very'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Option</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {menues.map((e, i) => {
                    return (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{e.product}</Table.Cell>
                                <Table.Cell>{e.option}</Table.Cell>
                                <Table.Cell>{e.price}</Table.Cell>
                                <Table.Cell><Button onClick={() => {
                                    console.log(`${e.product} delete button was clicked`);
                                    let filtered = menues.filter((el) => el.product !== e.product)
                                    console.log(filtered);
                                    setMenues(filtered);
                                }}>X</Button></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                })}
            </Table>

            <Form>
                <Form.Group widths='equal'>
                    <Form.Input id='product' fluid placeholder='상품 이름' />
                    <Form.Input id='option' fluid placeholder='상품 옵션' />
                    <Form.Input id='price' fluid placeholder='상품 가격' />
                    <Button onClick={() => {
                        console.log('add button was clcicked');
                        const product = document.querySelector('#product');
                        const option = document.querySelector('#option');
                        const price = document.querySelector('#price');
                        const added = { product: product.value, option: option.value, price: price.value, count: 0 };
                        console.log(added);
                        menues.push(added);
                        console.log(menues);
                        setMenues([...menues]);
                    }}>add</Button>
                </Form.Group>
            </Form>


            <h1></h1>
            <Button onClick={() => {
                console.log('button was clicekd');
                localStorage.setItem('menu', JSON.stringify(menues));
                alert('변경 완료');
            }}>변경</Button>
        </>
    )

}
export default EditMenu;