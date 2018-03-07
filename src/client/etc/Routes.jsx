import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home';
import StocksList from '../pages/StocksList';
import PageNotFound from '../pages/PageNotFound';

export default () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/stocks" component={StocksList} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </div>
    );
};
