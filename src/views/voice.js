import { React, useEffect } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Icon } from "semantic-ui-react";
import axios from 'axios';
const API_KEY = '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';
const text = document.querySelector('#text');

function Dictaphone() {

  // let [text, setText] = useState('hi');
  console.log(text);
  // let textArr = [text];

  // const textToSpeech = async (response) => {
  //   console.log('textToSpeech');
  //   const utterance = new SpeechSynthesisUtterance(response);
  //   synth.speak(utterance);
  // }
  let restaurantName = '핑거푸드';
  let restaurantType = 'Chinese restaurant';
  let menu = [
    { product: '삼선짬뽕', price: 9000, count: 0 },
    { product: '군만두', price: 3000, count: 0 },
    { product: '쌀국수', price: 12000, count: 0 },
    { product: '짜사이', price: 2000, count: 0 },
    { product: '코코넛', price: 1000, count: 0 },
    { product: '반미', price: 1500, count: 0 },
  ];

  let chatHistory = [`I want you to act as a korean clerk at ${restaurantType} which name is ${restaurantName} 
  tell the customer the menus from ${JSON.stringify(menu)} in korean
  The explanation only needs to be the name and price of the menu.
  And the customer listens to you and orders.
  If the customer answered, skip the menu description and Reply within two line.
  `]

  useEffect(() => {

    sendToChatGPT(JSON.stringify(chatHistory));
  }, []);

  const synth = window.speechSynthesis;
  const sendToChatGPT = async (prompt) => {
    await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: {
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.7,
        model: "text-davinci-003",
      }
    })
      .then(response => {
        // chatHistory.push(response.data.choices[0].text);
        // setChatHistory(...chatHistory);
        console.log(response);
        console.log(response.data.choices[0].text);

        chatHistory.push(`clerk: ${response.data.choices[0].text}`);
        console.log(chatHistory);
        // textToSpeech(response.data.choices[0].text);


      })
      .catch(error => {
        console.error(error);
      });
  }
  // const speechToText= ()=>{
  //   const recognition = new window.webkitSpeechRecognition();
  //   recognition.lang = 'ko-KR';
  //   recognition.start();

  //   recognition.onresult = (event) => {
  //     // chatHistory.push(prompt);
  //     // setChatHistory(...chatHistory);
  //     console.log('it was accepted');
  //     const resultIndex = event.resultIndex;
  //     const transcript = event.results[resultIndex][0].transcript;
  //     console.log(transcript);
  //     // text.innerHTML=event.results[resultIndex][0].transcript;
  //     recognition.stop();
  //     sendToChatGPT(transcript);
  //   };

  //   // recognition.onerror=(event)=>{
  //   //   console.log(event);
  //   //   speechToText();      
  //   // }
  //   // recognition.onend=()=>{
  //   //   console.log('end');
  //   //   speechToText();      

  //   // }
  // }
  return (
    <div style={{ textAlign: 'center', marginTop: '20%', backgroundColor: '#202124' }}>
      <h1 style={{ color: '#f1f3f4' }}> 키오스크</h1>
      <div id='mic-container' style={{ color: '#f1f3f4' }}>
        <Icon size='massive' name='microphone' bordered style={{ backgroundColor: '#202124', border: '1px solid #f1f3f4', borderRadius: '150px' }} />
      </div>
      <h1 id='text' style={{ color: '#f1f3f4' }}>주문을 도와드리겠습니다.</h1>
      <textarea id='userText'></textarea>
      <button onClick={() => {

        const text = document.querySelector('#userText').value;
        console.log(text);
        // chatHistory.push(`customer : ${text}`);
        // setChatHistory([...chatHistory,`customer : ${text}`]);
        chatHistory.push(`customer : ${text}`);
        sendToChatGPT(JSON.stringify(chatHistory));
        console.log(chatHistory);
      }}>submit</button>
    </div>
  );
}
export default Dictaphone;