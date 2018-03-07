import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { wrapRootEpic } from 'react-redux-epic';
import { request } from 'universal-rxjs-ajax';

import rootEpic from '../../client/etc/epics';
import reducers from '../../client/etc/reducers';

export default () => {

    const wrappedEpic = wrapRootEpic(rootEpic);

    const epicMiddleware = createEpicMiddleware(wrappedEpic, {
        dependencies: {
            request
        }
    });

    const store = createStore(reducers, {}, applyMiddleware(epicMiddleware));
    return {
        store, wrappedEpic
    };
};
