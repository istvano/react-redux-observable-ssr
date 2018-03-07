import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { STOCKS_REQUEST, STOCKS_REQUEST_CANCELLED, stocksRequestFulfilled, stocksRequestFailed } from './stocks.actions';


export const stocksRequestEpic = (action$, store, { request }) =>
    action$.ofType(STOCKS_REQUEST)
    .switchMap(_ =>
        request({ url: 'https://api.iextrading.com/1.0/stock/market/list/mostactive' })
            .map(response => stocksRequestFulfilled(response.response))
            .catch(error => Observable.of(
                    stocksRequestFailed(error.message, error.status, error.xhr))
            ).takeUntil(action$.ofType(STOCKS_REQUEST_CANCELLED))
    );

