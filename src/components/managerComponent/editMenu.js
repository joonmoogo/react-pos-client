import { React, useEffect, useState } from "react";
import { Table, Button, Form } from "semantic-ui-react";
import { deleteMenu, getMenus, saveMenu } from '../../controllers/menuController.ts'

export default function EditMenu() {

    useEffect(()=>{
        getMenus().then((data)=>{
            console.log(data.data);
            setMenues(data.data)
        })
    },[])
    const localMenu = JSON.parse(localStorage.getItem('menu'));
    const initialMenues = localMenu ? localMenu : [];
    const [menues, setMenues] = useState(initialMenues);


    return (
        <>
            <Table basic='very'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>name</Table.HeaderCell>
                        <Table.HeaderCell>category</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {menues.map((e, i) => {
                    return (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{e.name}</Table.Cell>
                                <Table.Cell>{e.category}</Table.Cell>
                                <Table.Cell>{e.price}</Table.Cell>
                                <Table.Cell><Button onClick={() => {
                                    console.log(`${e.name} delete button was clicked`);
                                    let filtered = menues.filter((el) => el.name !== e.name)
                                    console.log(filtered);
                                    setMenues(filtered);
                                    deleteMenu(e.id);
                                }}>X</Button></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                })}
            </Table>

            <Form>
                <Form.Group widths='equal'>
                    <Form.Input id='name' fluid placeholder='상품 이름' />
                    <Form.Input id='category' fluid placeholder='상품 옵션' />
                    <Form.Input id='price' fluid placeholder='상품 가격' />
                    <Button onClick={() => {
                        console.log('add button was clcicked');
                        const name = document.querySelector('#name');
                        const category = document.querySelector('#category');
                        const price = document.querySelector('#price');
                        const added = { 
                            name: name.value,
                            price: price.value,
                            category: category.value,
                        };
                        console.log(added);
                        menues.push(added);
                        console.log(menues);
                        setMenues([...menues]);
                        saveMenu(added).then((msg)=>{
                            console.log(msg);
                        })
                        
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
