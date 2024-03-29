import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import ScrollMemory from 'react-router-scroll-memory';


import './index.scss';

import App from './components/layouts/App';

import reportWebVitals from './scripts/reportWebVitals';

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <div>
                <ScrollMemory/>

                <App/>
            </div>
        </BrowserRouter>
    </CookiesProvider>,

    document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
