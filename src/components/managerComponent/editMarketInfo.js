import { React, useEffect,useRef,useState } from "react";
import { TextArea, Checkbox, Button, Form } from "semantic-ui-react";
import { editStores, getStores, saveStores } from "../../controllers/StoreController.ts";

export default function EditMarketInfo() {

    useEffect(()=>{
        getStores().then((response)=>{
            let userData;
            response.data.find((obj)=>{
                const storeId =JSON.parse(localStorage.getItem('storeId'));
                if(obj.id === storeId){
                    userData = obj;
                }
            })
            setInfo(userData);
            setCompany(userData.name);
            setCompanyIntroduce(userData.info);
            setAddress(userData.address);
            setOpeningTime(userData.operatingTime.split('-')[0]);
            setClosingTime(userData.operatingTime.split('-')[1]);
        }).catch((error)=>{
            console.error(error);
        })
    },[])
    const imgRef = useRef();
    const [imgFile, setImgFile] = useState("");
    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };
    const [info,setInfo] = useState();
    const [company,setCompany] = useState();
    const [openingTime,setOpeningTime] = useState();
    const [closingTime,setClosingTime] = useState();
    const [address,setAddress] = useState();
    const [companyIntroduce,setCompanyIntroduce] = useState();
    return (
        <>
            <Form className="slide-from-right">
                <Form.Field>
                    <label>상호명</label>
                    <input id="company" placeholder='Name' value={company} onChange={(event)=>{
                        setCompany(event.target.value);
                    }} />
                </Form.Field>
                <Form.Field>
                    <label>오픈 시간</label>
                    <input id="openingTime" placeholder='Opening time' value={openingTime} onChange={(event)=>{
                        setOpeningTime(event.target.value);
                    }} />
                </Form.Field>
                <Form.Field>
                </Form.Field>
                <Form.Field>
                    <label>마감 시간</label>
                    <input id='closingTime' placeholder='Closing time' value={closingTime} onChange={(event)=>{
                        setClosingTime(event.target.value);
                    }}/>
                </Form.Field>
                <Form.Field>
                    <label>check</label>
                    <Checkbox label=' 예약 ' />
                    <Checkbox label=' 대기 ' />
                    <Checkbox label=' 실시간 조회 ' />

                </Form.Field>
                <Form.Field>
                    <label>주소</label>
                    <input id="address" placeholder='Address' value={address} onChange={(event)=>{
                        setAddress(event.target.value);
                    }} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
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
                <Form reply >
                    <label>가게 소개</label>
                    <TextArea id='companyIntroduce' value={companyIntroduce} onChange={(event)=>{
                        setCompanyIntroduce(event.target.value);
                    }}/>
                    <Button content='변경' labelPosition='left' icon='edit' primary onClick={() => {
                        editStores({
                            name:company,
                            latitude:info?.latitude,
                            longitude:info?.longitude,
                            address:address,
                            info:info,
                            phoneNumber:info?.phoneNumber,
                            profilePhoto:imgRef.current.files[0],
                            operatingTime:null,
                            storeCategory:info?.storeCategory,
                        })
                    }} />
                </Form>
            </Form>

        </>
    )

}
