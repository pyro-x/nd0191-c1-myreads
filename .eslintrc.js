module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": 2,
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        'space-before-function-paren': [2, {
            anonymous: 'always',
            named: 'always'
        }],
    }
    
};
