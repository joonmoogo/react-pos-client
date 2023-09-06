import { React, useState } from "react";
import { Item, Form } from "semantic-ui-react";



export default function WaitingList() {  //대기탭 미정
    let waiting = JSON.parse(localStorage.getItem('waiting'));
    let initialWaiting = waiting ? waiting : [];
    let [people, setPeople] = useState(initialWaiting);

    return (
        <div className="fade-in">
            {people && people.map((e, i) => {
                return (
                    <Item.Group link>

                        <Item>
                            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />

                            <Item.Content>
                                <Item.Header>{e.name}</Item.Header>
                                <Item.Description>{e.count}</Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                )
            })}
            <Form>
                <Form.Group>
                    <Form.Input
                        placeholder='이름'
                        name='이름'
                        id='name'
                    />
                    <Form.Input
                        placeholder='인원 수'
                        name='인원 수'
                        id='count'
                    />
                    <Form.Button fluid color="teal" content='Submit' onClick={() => {
                        const name = document.querySelector('#name').value;
                        const count = document.querySelector('#count').value;
                        people.push({ name: name, count: count });
                        setPeople([...people]);

                    }} />
                </Form.Group>
            </Form>

        </div>
    )
}

