import { Icon,Divider,Image,Popup,List, Button } from "semantic-ui-react";

import '../../styles/animation.css';
export default function InfoButton(){
 
    return(
        <div style={{}}>
        <Popup size="large" className='fade-in'  trigger={<Button style={{ 
            top:'90%',
            left:'90%',
            position: 'absolute',
            backgroundColor:'red'}}
            size="large"
            circular 
            color='google plus'
            icon='tasks' 
            onClick={()=>{
                console.log('infoButton was clicked');
            }}/>}
            content={
            <>
                  <div>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' avatar verticalAlign='middle' />
                    <span>07-18-16:40 / 3인<Button>okay</Button><Button><Icon name="address book"></Icon></Button></span>
                    <Divider />
                    <Image src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' avatar verticalAlign='middle' />
                    <span>07-18-17:00 / 4인 / 3T<Button>okay</Button><Button><Icon name="address book"></Icon></Button></span>
                    <Divider />
                    <Image src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' avatar verticalAlign='middle' />
                    <span>07-18-18:00 / 5인<Button>okay</Button><Button><Icon name="address book"></Icon></Button></span>
                    <Divider />
                    
                </div>
            </>}
            style={{}}
            on='click'
            position="top right"
            />
            </div>
    )
}


