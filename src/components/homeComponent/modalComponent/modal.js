import { useState } from "react";
import { TransitionablePortal,Segment,Header,Button } from "semantic-ui-react";

export default function Modal(prop){
    const [open, setOpen] = useState(true);
    
    return (
      <TransitionablePortal
        open = {open}
      >
        <Segment
          style={{ left: '40%', position: 'fixed', top: '30%', zIndex: 1000,borderBottom:'1px solid teal',borderTop:'1px solid teal'}}
        >
          <Header>hi</Header>
          <p>asd</p>
          <p>To close, simply click the close button or click away</p>
          <Button color="teal" onClick={()=>{
            console.log('i was clicked next');
            setOpen(false);
          }}>next</Button>
        </Segment>
      </TransitionablePortal>
    );
  };