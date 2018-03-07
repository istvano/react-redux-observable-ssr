import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import stocksReducer from '../modules/stocks/stocks.reducers';

export default combineReducers({
    stocks: stocksReducer,
    routing: routerReducer
});
