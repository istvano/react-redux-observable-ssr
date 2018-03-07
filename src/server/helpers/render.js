import React from 'react';
import serialize from 'serialize-javascript';

export default (store, content) => {
    return `
        <html>
        <head></head>
        <body>
            <div id="root">${content}</div>
            <script>
                window.INITIAL_STATE = ${serialize(store.getState())}
            </script>
            <script src="bundle.js"></script>
        </body>
        </html>
    `;
};

