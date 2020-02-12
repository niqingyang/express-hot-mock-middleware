# express-hot-mock-middleware

express-hot-mock-middleware 是一个参考了 umijs 实现了其类似的基于 express 的 mock 中间件，可以方便 react 项目集成

使用时只需要指定一个到处接口数据的目录，支持实时检测目录下文件的改动并动态加载

## Installation

```shell
npm install --save-dev express-hot-mock-middleware
```

## Usage

1. 使用 `create-react-app` 创建一个 react app

2. 在 `src` 目录下创建文件 `setupProxy.js`

setupProxy.js 内容如下：

```js
require('@babel/register');
const fs = require('fs');
const path = require("path");
const proxy = require('http-proxy-middleware');

const appPath = fs.realpathSync(process.cwd());

module.exports = function (app) {

    const mockPaths = [
        path.join(appPath, 'mock')
    ];

    app.use(require("@acme-top/express-mock-middleware").createMiddleware(mockPaths));
};
```

3. 在项目根目录下创建 `babel.config.js` 内容如下：

```js
module.exports = function (api) {
    api.cache(true);

    const presets = [
        "react-app",
        [
            // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": "3"
            }
        ],
        // ...
    ];
    const plugins = [
        // ...
    ];

    return {
        presets,
        plugins
    };
}
```

4. 在项目根目录下创建 `mock` 目录，然后在此目录下创建一个 `api.js` 作为示例：

```js
import mockjs from 'mockjs';

const getNotice = [
    {
        id: 'xxx1',
        title: titles[0],
        logo: avatars[0],
        description: '那是一种内在的东西，他们到达不了，也无法触及的',
        updatedAt: new Date(),
        member: '科学搬砖组',
        href: '',
        memberLink: '',
    },
    {
        id: 'xxx2',
        title: titles[1],
        logo: avatars[1],
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        updatedAt: new Date('2017-07-24'),
        member: '全组都是吴彦祖',
        href: '',
        memberLink: '',
    },
    // ...
];

const getActivities = [
    {
        id: 'trend-1',
        updatedAt: new Date(),
        user: {
            name: '曲丽丽',
            avatar: avatars2[0],
        },
        group: {
            name: '高逼格设计天团',
            link: 'http://github.com/',
        },
        project: {
            name: '六月迭代',
            link: 'http://github.com/',
        },
        template: '在 @{group} 新建项目 @{project}',
    },
    {
        id: 'trend-2',
        updatedAt: new Date(),
        user: {
            name: '付小小',
            avatar: avatars2[1],
        },
        group: {
            name: '高逼格设计天团',
            link: 'http://github.com/',
        },
        project: {
            name: '六月迭代',
            link: 'http://github.com/',
        },
        template: '在 @{group} 新建项目 @{project}',
    },
    // ...
];

function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
}

export default {
    'GET /api/project/notice': getNotice,
    'GET /api/activities': getActivities,
    'POST /api/forms': (req, res) => {
        res.send({message: 'Ok'});
    },
    'GET /api/tags': mockjs.mock({
        'list|100': [{name: '@city', 'value|1-100': 150, 'type|0-2': 1}],
    }),
    // ...
};
```

## License

[MIT](http://opensource.org/licenses/MIT) Copyright (c) 2019
