import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import Seed from './Seed';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

// const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        {/* <Provider store={store}> */}
            <App/>
        {/* </Provider> */}
    </BrowserRouter>
);
