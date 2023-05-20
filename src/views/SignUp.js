import React, { Component, useState } from 'react'
import { Image,Menu,Message,Container,Button, Checkbox, Form, Segment } from 'semantic-ui-react'

function SignUp(){

    let [menu,setMenu] = useState('register');
    return(
             <>   
        <Menu stackable pointing secondary>
        <Menu.Item  
        name='register'
        active={menu==='register'}
         onClick={()=>{
            setMenu('register');  
        }}>register</Menu.Item>
        <Menu.Item 
        name='about'
        active={menu==='about'}  
        onClick={()=>{
            setMenu('about');
        }}>about</Menu.Item>
      </Menu>
      {
        menu=='register' ? <SignUpForm></SignUpForm> : <About></About>
      }
      </>
    )
    }
function SignUpForm(){
    return(
        <div>
        <Container>        
        <Form size='large' success warning error> 
        {/* Form에 success나 warning을 추가함으로 노출됨 */}
            <Form.Field>
            <Form.Input 
            fluid 
            label='Form example' 
            placeholder='Form example'
            >
            </Form.Input>
            <Form.Input 
            fluid 
            label='Form example' 
            placeholder='Form example'
            error={{ content: 'Please enter your first name', pointing: 'below' }}
            >
            </Form.Input>
            <Form.Input 
            fluid 
            label='Form example' 
            placeholder='Form example'
            >
            </Form.Input>
            <Form.Input 
            fluid 
            label='Form example' 
            placeholder='Form example'
            >
            </Form.Input>
            <Form.Input 
            fluid 
            label='Form example' 
            placeholder='Form example'
            error>
            </Form.Input>
            
            {/* Form.Input에 error를 추가함으로 노출 */}
            <Form.Input 
            fluid 
            label='Form example' 
            placeholder='Form example'
            error
            //   error={{ content: 'Please enter your first name', pointing: 'below' }}
            // 팝업 메시지 출력
            ></Form.Input>
            <Message
                success
                header='Form Completed'
                content="You're all signed up for the newsletter"
                />
                <Message
                warning
                header='Could you check something!'
                list={[
                    'That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.',
                ]}
                />
                <Message
                error
                header='Action Forbidden'
                content='You can only sign up for an account once with a given e-mail address.'
                />
            </Form.Field>
            <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
        </Container>
    </div>
    )
}
function About(){
    const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']
    return(

        <Container>
            <Segment>
            <Image src='/logo192.png' size='small' floated='left' />
            <p>
            Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
            facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
            referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
            electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
            ex natum rebum iisque.
            </p>
            <Image src='/logo192.png'  size='small' floated='right' />
            <p>
            Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine
            definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te
            phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
            phaedrum, vim vivendum maiestatis in.
            </p>
            <p>
            Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut
            facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te
            porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi
            everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu
            per, quas minimum postulant per id.
            </p>
            <p>
            Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
            facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
            referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
            electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
            ex natum rebum iisque.
            </p>
            <Image src='/logo192.png'  size='small' floated='right' />
            <p>
            Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine
            definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te
            phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
            phaedrum, vim vivendum maiestatis in.
            </p>
            <p>
            Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut
            facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te
            porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi
            everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu
            per, quas minimum postulant per id.
            </p>
        </Segment>
            {sizes.map((e)=>{
                return(
                <Segment key={e} size={e}>
                    It's a {e} about Page
                </Segment>
                )
            })}
        </Container>
    )
}


export default SignUp