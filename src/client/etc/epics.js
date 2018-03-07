import { combineEpics } from 'redux-observable';
import { stocksRequestEpic } from '../modules/stocks/stocks.epics';

export default combineEpics(
    stocksRequestEpic
);
