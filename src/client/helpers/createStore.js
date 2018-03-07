import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { request } from 'universal-rxjs-ajax';

import reducers from '../etc/reducers';
import rootEpic from '../etc/epics';

export default () => {

    // inject dependencies into epics    
    const epicMiddleware = createEpicMiddleware(rootEpic, {
        dependencies: {
            request
        }
    });

    const initialState = window.INITIAL_STATE;
    const store = createStore(reducers, initialState, applyMiddleware(epicMiddleware));

    return store;
};
