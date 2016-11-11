# webpack-eslint-plugin

async run eslint for webpack plugin, won't block webpack compilation

# install

```
npm i -S webpack-eslint-plugin
```

# usage

```js
// webpack.config.js
import EslintPlugin from 'webpack-eslint-plugin'
module.exports = {
  // ...
  plugins: [
    // other plugins
    new EslintPlugin({/*options*/})
  ]
}
```

# options

You can pass [eslint](http://eslint.org/docs/developer-guide/nodejs-api#cliengine) options

### `formate`(default: eslint stylish formatter)

```js
new EslintPlugin({
  formate: require('eslint-friendly-formatter')
})
```

### `beforeOutput`([Function (results)])

before output hook function





