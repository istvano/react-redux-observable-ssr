module.exports = {
    "extends": [
        "airbnb", 
        "plugin:jest/recommended", 
        "plugin:import/react"
    ],
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "jest"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true,
        "jest/globals": true
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "./webpack.client.js"
            }
        }
    },    
    "rules": {
        "strict": 0,
        "no-console": [2,{allow: ["warn","error"]}],
        "no-extra-semi": 2,
        "jsx-quotes": [2, "prefer-double"],
        "quote-props": ["error","consistent-as-needed"],
        "react/jsx-indent": 0,
        "react/jsx-indent-props": [2, 4],
        "react/jsx-first-prop-new-line": 0,
        "react/jsx-closing-bracket-location": 0,
        "react/jsx-no-bind": 0,
        "react/jsx-filename-extension": 0,
        "import/no-extraneous-dependencies": 0,
        "object-property-newline": 0,
        "max-len": ["error", 200],
        "comma-dangle": [
            "warn",
            "never"
        ],
        "indent":[
            "error", 4
        ],
        //"linebreak-style": ["error", process.platform.indexOf('win') > -1 ? "windows" : "unix"],
        "linebreak-style": ["error",  "windows"],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        /* Advanced Rules*/
        "no-unused-expressions": "warn",
        "no-useless-concat": "warn",
        "block-scoped-var": "error",
        "consistent-return": "error"
    }
};
