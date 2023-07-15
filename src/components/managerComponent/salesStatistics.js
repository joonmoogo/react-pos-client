import { React } from "react";
import { Grid,Image,Icon,Divider,Header,Table } from "semantic-ui-react";
import ChartUtil from '../../utils/chart.ts'

export default function SalesStatistics() {
    console.log(ChartUtil.getSales('2022-07-15'));
    return (
        <>
    <Divider horizontal>
      <Header as='h4'>
        <Icon name='tag' />
        
      </Header>
    </Divider>
    <Grid columns={60}>
    <Grid.Row>
      <Grid.Column>
        <Icon name="stop" color="green" size="large"/>
      </Grid.Column>
      <Grid.Column>
        <Icon name="stop" color="green" size="large"/>
      </Grid.Column>
      <Grid.Column>
        <Icon name="stop" color="green" size="large"/>
      </Grid.Column>
      
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Icon name="stop" color="green" size="large"/>
      </Grid.Column>
      <Grid.Column>
        <Icon name="stop" color="green" size="large"/>
      </Grid.Column>
      <Grid.Column>
        <Icon name="stop" color="green" size="large"/>
      </Grid.Column>
    </Grid.Row>
  </Grid>

    <p>Month total : getMonthTotal()</p> 60개 아이콘
    
    
    <Divider horizontal>
      <Header as='h4'>
        <Icon name='bar chart' />
        Contribution Activity
      </Header>
    </Divider>

    <p>u can see your sales</p>
  </>
    )
}

