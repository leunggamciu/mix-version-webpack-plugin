# mix-version-webpack-plugin


Just in case sometimes I don't want to use laravel-mix


#### Usage

```js
const MixVersion = require('mix-version-webpack-plugin');


module.exports = {
    ...,
    plugins: [
        new MixVersion({
            hashName: 'id', // default value
            manifestName: 'mix-manifest.json' // default value
        }),
    ],
};
```