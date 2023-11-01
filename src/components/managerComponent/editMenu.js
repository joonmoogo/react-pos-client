import { useRef, React, useEffect, useState } from "react";
import { Segment, Image, TextArea, Table, Button, Form, Grid, GridColumn } from "semantic-ui-react";
import { deleteMenu, getMenus, saveMenu } from '../../controllers/menuController.ts'
import '../../styles/file.css'
import { formatCurrency } from "../../utils/format.ts";
export default function EditMenu() {

    useEffect(() => {
        getMenus().then((data) => {
            console.log(data.data);
            setMenues(data.data)
        })
    }, [])
    const localMenu = JSON.parse(localStorage.getItem('menu'));
    const initialMenues = localMenu ? localMenu : [];
    const [menues, setMenues] = useState(initialMenues);
    const [name, setName] = useState()
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [detail, setDetail] = useState();
    
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

    return (
        <div className="slide-from-right">
            <Table basic='very' style={{ height: '100px' }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>photo</Table.HeaderCell>
                        <Table.HeaderCell>name</Table.HeaderCell>
                        <Table.HeaderCell>category</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {menues.map((e, i) => {
                    return (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell><Image src={`/serverImage/${e.photo}`} size="tiny" rounded></Image></Table.Cell>
                                <Table.Cell>{e.name}</Table.Cell>
                                <Table.Cell>{e.category}</Table.Cell>
                                <Table.Cell>{formatCurrency(e.price)}원</Table.Cell>
                                <Table.Cell><Button onClick={() => {
                                    console.log(`${e.name} delete button was clicked`);
                                    let filtered = menues.filter((el) => el.name !== e.name)
                                    console.log(filtered);
                                    setMenues(filtered);
                                    deleteMenu(e.id);
                                }}>X</Button></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                })}
            </Table>

         
            <Grid columns={4} divided>
                <Grid.Row stretched>
                    <Grid.Column>
                        <img
                            src={imgFile ? imgFile : null}
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
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Input fluid placeholder='상품 이름' style={{ marginTop: '10px' }} onChange={(event) => {
                            setName(event.target.value)
                        }} />
                        <Form.Input list='menu' fluid placeholder='상품 옵션' onChange={(event) => {
                            setCategory(event.target.value)
                        }} />
                        <datalist id='menu'>
                            <option value='메인 메뉴'>메인 메뉴</option>
                            <option value='사이드 메뉴'>사이드 메뉴</option>
                            <option value='주류▪음료'>주류▪음료</option>
                        </datalist>      </Grid.Column>
                    <Grid.Column>
                        <Form>
                            <Form.Input fluid placeholder='상품 가격' style={{ marginTop: '10px' }} onChange={(event) => {
                                setPrice(event.target.value)
                            }} />
                            <TextArea placeholder='상세정보' onChange={(event) => {
                                setDetail(event.target.value);
                            }} />
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                        <Button style={{ scale: '0.6' }} size="massive" onClick={() => {
                            const userValue = {
                                name: name,
                                category: category,
                                price: price,
                                detail: detail,
                                photo: imgRef.current.files[0],
                            }

                            console.log(userValue);
                            // console.log(imgFile);
                            const file = imgRef.current.files[0];
                            console.log(file);
                            saveMenu(userValue).then((data) => {
                                console.log(data);
                                menues.push(userValue);
                                console.log(menues);
                                setMenues([...menues]);
                            })

                        }}>추가</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>




        </div>
    )

}
