import { React } from "react";
import { Divider, Icon, Table, Header } from "semantic-ui-react";

export default function SystemInfo() {
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
