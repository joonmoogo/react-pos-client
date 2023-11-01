import { React } from "react";
import { Checkbox, List, Segment, Flag } from "semantic-ui-react";


export default function EditPreferences() { // 중요도가 떨어짐으로 추후에 구현 예정
    return (
        <div className="slide-from-right">
            <Segment.Group horizontal >
                <Segment>언어</Segment>
                <Segment>
                    <List selection verticalAlign='middle'>

                        <List.Item>
                            <List.Content>
                                <Flag name="kr" />
                                <List.Header>Korean</List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <Flag name="us" />
                            <List.Content>
                                <List.Header>English</List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <Flag name="jp" />
                            <List.Content>
                                <List.Header>Japanese</List.Header>
                            </List.Content>
                        </List.Item>
                    </List>
                </Segment>

            </Segment.Group>
            <Segment.Group horizontal>
                <Segment>다크모드</Segment>
                <Segment><Checkbox toggle style={{ backgroundColor: 'lightGrey' }} ></Checkbox></Segment>
            </Segment.Group>
            <Segment.Group horizontal>
                <Segment>토글시 소리 출력</Segment>
                <Segment><Checkbox toggle style={{ backgroundColor: 'lightGrey' }}></Checkbox></Segment>
            </Segment.Group>

        </div>
    )
}
