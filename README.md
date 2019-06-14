# express-mock-middleware

express-mock-middleware 是一个参考了 umijs 实现了其类似的基于 express 的 mock 中间件，可以方便 react 项目集成

## Installation

```js
npm install --save-dev @acme-top/express-mock-middleware
```

## Usage

1. 使用 create-react-app 创建一个 react app 并 eject

2. 在 src 目录下创建文件 setupProxy.js

setupProxy.js 内容如下：

```js
const path = require("path");
const proxy = require('http-proxy-middleware');
const paths = require('../config/paths');

require('@babel/register');

module.exports = function (app) {

    const mockPaths = [
        // mock 数据的所在目录
        path.join(paths.appPath, 'mock')
    ];

    app.use(require("@acme-top/express-mock-middleware").createMiddleware(mockPaths));
};
```


## License

[MIT](http://opensource.org/licenses/MIT) Copyright (c) 2019