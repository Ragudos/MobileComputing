module.exports = {
    "root": false,
    "parserOptions": {
        "tsconfigRootDir": __dirname,
        "project": null,
        "ecmaFeatures": { "jsx": true }
    },
    "settings": {
        "react": { "version": "detect" }
    },
    "plugins": ["react"],
    "extends": ["../../.eslintrc.cjs", "plugin:react/recommended", "plugin:react/jsx-runtime"],
    "rules": {}
}