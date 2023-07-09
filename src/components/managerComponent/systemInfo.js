import { React, useRef, useState } from "react";
import { TextArea, Label, Input, Divider, Checkbox, Rail, Icon, Comment, Table, List, Image as ImageComponent, Item, Card, Menu, Message, Grid, Header, Button, Form, Segment, Image, Container, TableRow, Flag } from "semantic-ui-react";

function SystemInfo() {
    let country = window.navigator.language;
    let a = window.navigator.geolocation;
    let user = window.navigator.userAgent;
    return (
        <>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='bar chart' />
                    Specifications
                </Header>
            </Divider>

            <Table definition>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={2}>Country</Table.Cell>
                        <Table.Cell>{country}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>System-version</Table.Cell>
                        <Table.Cell>hellopos.1.34</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Connection environment</Table.Cell>
                        <Table.Cell>{user}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Smell</Table.Cell>
                        <Table.Cell>good</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    )

}
export default SystemInfo;