import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { Input, Icon, Segment, Header, Image, Button, Container, Form, Checkbox, Modal } from "semantic-ui-react";
import { saveStores } from "../controllers/StoreController.ts";
import '../styles/file.css'
function Store() { // 가게의 정보를 추가할 수 있는 화면이다.
    const [storeInfo, setStoreInfo] = useState();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState();
    const [searchedAddress, setSearchedAddress] = useState([]);
    const [userAddress, setUserAddress] = useState();
    const [userDetailAddress, setUserDetailAddress] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();

    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };
    const options = [
        // 가게 카테고리를 나타내는 객체 리터럴이다.
        { key: '1', text: 'KOREAN', value: 'KOREAN' },
        { key: '2', text: 'CHINESE', value: 'CHINESE' },
        { key: '3', text: 'JAPANESE', value: 'JAPANESE' },
        { key: '4', text: 'WESTERN', value: 'WESTERN' },
    ]
    return (
        <div>
            <Container text style={{ width: '40%' }} className="slide-from-right">
                <Header as='h1' color='teal'>
                    <Image src='/logo.png' style={{ width: '160px' }} />
                </Header>
                <Form size='large' success warning error>
                    <Form.Field>
                        <Form.Input
                            id='name'
                            fluid
                            label='상호명'
                            placeholder='ex) 동대문 엽기 떡볶이'
                        >
                        </Form.Input>
                        <Form.Input type="time"
                            id='opentime'
                            fluid
                            label='오픈 시간'
                            placeholder='09:00'
                        >
                        </Form.Input>
                        <Form.Input type="time"
                            id='closetime'
                            fluid
                            label='마감시간'
                            placeholder='24:00'
                        >
                        </Form.Input>
                        <Modal size='tiny' style={{ height: '80%' }} className='no-scroll' dimmer='blurring'
                            onClose={() => {
                                setOpen(false)
                            }}
                            onOpen={() => {
                                setOpen(true)
                            }}
                            open={open}
                            trigger={
                                <Form.Input
                                    id='address'
                                    fluid
                                    label='주소'
                                    placeholder='주소를 검색하세요'
                                    value={userAddress}
                                />
                            }>
                            <Modal.Header>주소 검색</Modal.Header>
                            <Modal.Content>
                                <Input fluid onChange={(event) => {
                                    setAddress(event.target.value);
                                }}
                                    icon={<Icon name='search ' inverted circular link onClick={(event) => {
                                        let geocoder = new window.kakao.maps.services.Geocoder();
                                        let callback = function (result, status) {
                                            if (status === window.kakao.maps.services.Status.OK) {

                                                // 가게의 상세주소를 출력하는 콜백함수
                                                
                                                setSearchedAddress(result);
                                            }
                                        };
                                        geocoder.addressSearch(address, callback);
                                        // 카카오 맵 API를 이용한 검색 함수
                                    }} />}
                                    placeholder='Search...'
                                />
                                <Segment.Group >
                                    {searchedAddress.map((e, i) => {
                                        return (
                                            <Segment onClick={() => {
                                                setOpen(false);
                                                setUserAddress(e.address_name)
                                                setLatitude(e.x);
                                                setLongitude(e.y);
                                                // 좌표와 그 외 정보를 설정한다.
                                                console.log(e.x, e.y);
                                            }}>{e.address_name}</Segment>
                                        )
                                    })}
                                </Segment.Group>
                            </Modal.Content>
                        </Modal>
                        <Form.Input
                            id='detailAddress'
                            fluid
                            label='상세 주소'
                            placeholder='ex) 하이베라스 상가 201호'
                        />
                        <Form.Input
                            id='info'
                            fluid
                            label='가게 소개'
                            placeholder='입력'
                        >
                        </Form.Input>
                        <Form.Select
                            id='storeCategory'
                            fluid
                            label='가게 분류'
                            options={options}
                            placeholder='선택'
                        />
                        <Form.Input
                            id='phoneNumber'
                            fluid
                            label='가게 전화번호'
                            placeholder='입력'
                        >
                        </Form.Input>
                        <Form.Input>
                            <img
                                src={imgFile ? imgFile : null}
                                // alt="프로필 이미지"
                                style={{ width: '100%', height: '300px', marginTop: '10px', borderRadius: '10px' }}
                            />
                            <form encType="multipart/form-data">
                                <input style={{ display: "none" }}
                                    className="signup-profileImg-input"
                                    type="file"
                                    accept="image/*"
                                    id="profileImg"
                                    onChange={saveImgFile}
                                    ref={imgRef}
                                />
                            </form>
                        </Form.Input>
                        <label
                            className="signup-profileImg-label"
                            htmlFor="profileImg"
                        >이미지 추가
                        </label>

                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button color='teal' type='submit' onClick={() => {
                        const name = document.querySelector('#name').value;
                        const address = document.querySelector('#address').value;
                        const detailAddress = document.querySelector('#detailAddress').value;
                        const info = document.querySelector('#info').value;
                        const opentime = document.querySelector('#opentime').value;
                        const closetime = document.querySelector('#closetime').value;
                        const phoneNumber = document.querySelector('#phoneNumber').value;
                        const storeCategory = document.querySelector('#storeCategory').innerText;
                        const storeInfo = {
                            name: name,
                            latitude: latitude,
                            longitude: longitude,
                            address: `${address}, ${detailAddress}`,
                            info: info,
                            phoneNumber: phoneNumber,
                            canReservation: true,
                            operatingTime: `${opentime} - ${closetime}`,
                            profilePhoto: imgRef.current.files[0],
                            storeCategory: storeCategory,
                        }
                        console.log(storeInfo);
                        saveStores(storeInfo).then(() => { navigate('/main') })
                    }}>등록하기</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Store;