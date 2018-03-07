import express from 'express';
import React from 'react';
import { renderToString } from 'react-redux-epic';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import Routes from '../client/etc/Routes';
import createStore from './helpers/createStore';
import render from './helpers/render';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    const context = {};
    const { store, wrappedEpic } = createStore();

    renderToString((
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <Routes />
            </StaticRouter>
        </Provider>
    ), wrappedEpic).subscribe(({ markup }) => {

        if (context.url) {
            return res.redirect(301, context.url);
        }

        if (context.notFound) {
            res.status(404);
        }
        res.send(render(store, markup));

    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
