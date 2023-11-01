import { React, useState } from "react";
import { Icon, Item, Header, Button, Segment } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'

import EditUserInfo from "../managerComponent/editUserInfo";
import EditMarketInfo from "../managerComponent/editMarketInfo";
import EditMenu from "../managerComponent/editMenu";
import EditTable from "../managerComponent/editTable";
import SalesStatistics from "../managerComponent/salesStatistics";
import ReviewComment from "../managerComponent/reviewComment";
import EditPreferences from "../managerComponent/editPreferences";
import SystemInfo from "../managerComponent/systemInfo";

export default function Manager() { 
    let [state, setState] = useState([])
    let [option, setOption] = useState();
    let navigate = useNavigate();
    return (
        !option ?
            <div className="fade-in">
                <div >
                    <Header as='h4' attached='top'>
                        계정 관리
                    </Header>
                    <Segment attached>
                        <Item.Group>
                            <Item>
                                <Icon name='question circle' size='large' />
                                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditUserInfo') }} >계정 정보 수정</Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </div>
                <div>
                    <Header as='h4' attached='top'>
                        매장 관리
                    </Header>
                    <Segment attached>
                        <Item.Group>
                            <Item>
                                <Icon name='home' size='large' />
                                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditMarketInfo') }}>매장 정보 수정</Item.Content>
                            </Item>

                            <Item>
                                <Icon name='list' size='large' />
                                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditMenu') }}>메뉴 수정</Item.Content>
                            </Item>
                            <Item>
                                <Icon name='chess board' size='large' />
                                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditTable') }}>테이블 배치</Item.Content>
                            </Item>
                            <Item>
                                <Icon name='qrcode' size='large' />
                                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('QrCode') }}>QR Code</Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </div>
                <div>
                    <Header as='h4' attached='top'>
                        통계 조회
                    </Header>
                    <Segment attached>
                        <Item.Group>
                            <Item>
                                <Icon name='dollar sign' size='large' />
                                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('SalesStatistics') }}>매출 통계</Item.Content>
                            </Item>
                            <Item>
                                <Icon name='thumbs up' size='large' />
                                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('ReviewComment') }}>리뷰 조회 </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </div>
                <div>
                    <Header as='h4' attached='top'>
                        시스템 설정
                    </Header>
                    <Segment attached>
                        <Item.Group>
                            <Item>
                                <Icon name='laptop' size='large' />
                                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('EditPreferences') }}>환경 설정</Item.Content>
                            </Item>
                            <Item>
                                <Icon name='question circle' size='large' />
                                <Item.Content verticalAlign='middle' as='a' onClick={() => { setOption(!option); setState('SystemInfo') }}>시스템 정보</Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    <Segment>
                        <Item>
                            <Button fluid primary onClick={() => {
                                alert('localStorage 삭제');
                                navigate(-2);
                                localStorage.clear();
                            }}>LogOut</Button>
                        </Item>
                    </Segment>
                </div>
            </div>
            :
            <>
                <Segment attached  >
                    <Header as='h5'>
                        <Icon style={{ cursor: 'pointer' }} onClick={() => { setOption(!option) }} name='angle left' />
                        {`관리자 / ${state}`}
                    </Header>
                    {state == 'EditUserInfo' ? <EditUserInfo/> : null}
                    {state == 'EditMarketInfo' ? <EditMarketInfo /> : null}
                    {state == 'EditMenu' ? <EditMenu /> : null}
                    {state == 'EditTable' ? navigate('/tableSetting'):null}
                    {state == 'SalesStatistics' ? <SalesStatistics /> : null}
                    {state == 'ReviewComment' ? <ReviewComment /> : null}
                    {state == 'EditPreferences' ? <EditPreferences /> : null}
                    {state == 'SystemInfo' ? <SystemInfo /> : null}
                </Segment>
            </>
    )
}
