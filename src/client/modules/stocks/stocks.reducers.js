import { STOCKS_REQUEST_FULFILLED } from './stocks.actions';

export default (state = [], action) => {
    switch (action.type) {
    case STOCKS_REQUEST_FULFILLED:
        return action.payload;
    default:
        return state;
    }
};
