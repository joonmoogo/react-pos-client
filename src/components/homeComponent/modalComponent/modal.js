import { useState } from "react";
import { TransitionablePortal,Segment,Header,Button } from "semantic-ui-react";

export default function Modal({onModalNext,onModalOpen,counter}){
    const [open, setOpen] = useState(true);
    const infoData=[
        {
            title:'반갑습니다. 가입해주셔서 감사',
            message:'이곳은 홀입니다. 테이블로 구성됩니다.'
        },
        {
            title:'예약',
            message:'모바일 앱으로 예약을 하면 달력에 저장됩니다.'
        },
        {
            title:'대기',
            message:'대기자를 직접 추가하는 상호작용을 해야합니다.'
        },
        {
            title:'주방',
            message:'주방 주문이 들어오게됩니다.'
        },
        {
            title:'영수증조회',
            message:'영수증을 볼 수 있습니다'
        },
        {
            title:'관리자',
            message:'이곳에서 메뉴 설정, 테이블 설정, 예약 설정등을 할 수 있습니다.'
        },
        {
            title:'이제 이용하셈',
            message:''
        },
    ]
  
    return (
      <TransitionablePortal
        open = {open}
      >
        <Segment
          style={{ left: '40%', position: 'fixed', top: '30%', zIndex: 1000,borderBottom:'1px solid teal',borderTop:'1px solid teal'}}
        >
          <Header>{infoData[counter]?.title}</Header>
          <p>{infoData[counter]?.message}</p>
          <p>To close, simply click the close button or click away</p>
          <Button color="teal" onClick={()=>{
            
            console.log('i was clicked next');
            setOpen(onModalOpen());
            onModalNext(); // next 버튼을 눌렀을 때 Home 컴포넌트의 handleModalNext 함수를 호출하여 setMenu를 변경합니다.
          }}>next</Button>
        </Segment>
      </TransitionablePortal>
    );
  };