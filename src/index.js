import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";

import { Provider } from 'react-redux';
import store from '../src/modules/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
  {/* <React.StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  {/* </React.StrictMode> */}
  </Provider>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
