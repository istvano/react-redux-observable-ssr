// entry for client side application
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux';

import Routes from './etc/Routes';
import createStore from './helpers/createStore';

const store = createStore();
const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.hydrate(
    <Provider store={store}>
        <Router history={history}>
            <Routes />
        </Router>
    </Provider>,
    document.querySelector('#root')
);

