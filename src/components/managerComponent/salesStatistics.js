import { React } from "react";
import { Grid,Image,Icon,Divider,Header,Table } from "semantic-ui-react";
import ChartUtil from '../../utils/ChartUtil.ts';
import ReceiptUtil from "../../utils/ReceiptUtil";
import VerticalBarDemo from "../../utils/Chart.js";

export default function SalesStatistics() {
  const value = ReceiptUtil.parse(ReceiptUtil.filterByMonth('7'))
    return (
        <>
    <Divider horizontal>
      <Header as='h4'>
        <Icon name='tag' />
      </Header>
        
    </Divider>
    
    
        <VerticalBarDemo/>
      
    

    
    <Divider horizontal>
      <Header as='h4'>
        <Icon name='bar chart' />
        Contribution Activity
      </Header>
      
    </Divider>
    

    <>
        <div>이번 달 매출: {ChartUtil.getSalesTotal(value)}</div>
        <div>평균 매출: {ChartUtil.getAverage(value)}</div>
        <div>MAX: {ChartUtil.getMaxVal(value)} </div>
        <div>MIN: {ChartUtil.getMinVal(value)}</div>
        </>
  </>
    )
}

