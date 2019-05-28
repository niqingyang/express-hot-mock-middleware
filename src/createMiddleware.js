import path from 'path';
import chokidar from 'chokidar';
import signale from 'signale';
import matchMock from './matchMock';
import slash from 'slash';
import {getMockData} from './getMockData';

const debug = require('debug')('express-mock-middleware:createMiddleware');

export default function (mockPaths) {

    let mockData = null;

    // 创建 Mock 数据的监视器
    // chokidar 在 windows 下使用反斜杠组成的 glob 无法正确 watch 文件变动
    // ref: https://github.com/paulmillr/chokidar/issues/777
    const watcher = chokidar.watch(mockPaths.map((path) => slash(path)), {
        ignoreInitial: true,
    });

    fetchMockData();

    watcher.on('all', (event, file) => {
        debug(`[${event}] ${file}, reload mock data`);
        cleanRequireCache();
        fetchMockData();
        signale.success(`Mock files parse success`);
    });

    /**
     * 清理 require cache
     */
    function cleanRequireCache() {

        Object.keys(require.cache).forEach(file => {
            if (
                mockPaths.some(path => {
                    return file.indexOf(path) > -1;
                })
            ) {
                delete require.cache[file];
            }
        });
    }

    /**
     * 抓取 Mock 数据
     */
    function fetchMockData() {
        mockData = getMockData(mockPaths);
    }

    /**
     * Express 中间件
     */
    return function MOCK(req, res, next) {
        const match = mockData && matchMock(req, mockData);
        if (match) {
            debug(`mock matched: [${match.method}] ${match.path}`);
            return match.handler(req, res, next);
        } else {
            return next();
        }
    };
}