import { React, useEffect, useRef, useState } from "react";
import { Checkbox, Button, Form } from "semantic-ui-react";
import { editUser, getUser } from "../../controllers/UserController";


export default function EditUserInfo() {
    useEffect(()=>{
        getUser().then((data)=>{
            console.log(data)
            setUserInfo(data);
        })
    },[])
    const nicknameRef = useRef();
    const phoneNumberRef = useRef();
    
    const [userInfo,setUserInfo] = useState([]);
    
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
    return (
        <Form className="slide-from-right">
            <Form.Field>
                <label>닉네임</label>
                <input ref={nicknameRef} placeholder='First Name' value={userInfo?.nickname} />
            </Form.Field>
            <Form.Field>
                <label>현재 비밀번호</label>
                <input type="password" placeholder='present password' value={userInfo?.password} />
            </Form.Field>
            <Form.Field>
            </Form.Field>
            <Form.Field>
                <label>이메일</label>
                <input placeholder='E-mail'  value={userInfo?.email}/>
            </Form.Field>
            <Form.Field>
                <label>전화번호</label>
                <input ref={phoneNumberRef} placeholder='Phone-number' value={userInfo?.phoneNumber} />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <img
                            src={imgFile ? imgFile : `serverImage/${userInfo?.profilePhoto}`}
                            // alt="프로필 이미지"
                            style={{ width: '160px', height: '110px', marginTop: '10px', borderRadius: '10px' }}
                        />
                        <form encType="multipart/form-data">
                            <label
                                className="signup-profileImg-label"
                                htmlFor="profileImg"
                            >이미지 추가
                            </label>
                            <input style={{ display: "none" }}
                                className="signup-profileImg-input"
                                type="file"
                                accept="image/*"
                                id="profileImg"
                                onChange={saveImgFile}

                                ref={imgRef}
                            />
                        </form>
            <Button type='submit' onClick={()=>{
                editUser({
                    nickname:nicknameRef.current.value,
                    phoneNumber:phoneNumberRef.current.value,
                    paymentCard:null,
                    profilePhoto:imgRef.current.files[0]
                })
                console.log({
                    nickname:nicknameRef.current.value,
                    phoneNumber:phoneNumberRef.current.value,
                    paymentCard:null,
                    profilePhoto:imgRef.current.files[0]
                })
            }}>변경</Button>
        </Form>
    )
}
