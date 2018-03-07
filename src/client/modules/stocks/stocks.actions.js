import { requestFailed } from '../../helpers/actions';

export const STOCKS_REQUEST = 'STOCKS_REQUEST';
export const STOCKS_REQUEST_FULFILLED = 'STOCKS_REQUEST_FULFILLED';
export const STOCKS_REQUEST_FAILED = 'STOCKS_REQUEST_FAILED';
export const STOCKS_REQUEST_CANCELLED = 'STOCKS_REQUEST_CANCELLED';

export const fetchStocks = () => {    
    return {
        type: STOCKS_REQUEST
    };
};

export const stocksRequestFulfilled = (payload) => {
    return {
        type: STOCKS_REQUEST_FULFILLED,
        payload
    };
};

export const stocksRequestFailed = requestFailed(STOCKS_REQUEST_FAILED);

