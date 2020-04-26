const Koa = require('koa');
const Router = require('koa-router');
const glob = require('glob');
const logger = require('koa-logger');
const { resolve } = require('path');
const fs = require('fs');
var Mock = require('mockjs');

const app = new Koa();
const router = new Router({ prefix: '/mock-server' });
const routerMap = {}; // 存放路由映射

app.use(logger());

// 注册请求方式为 get 的路由
glob.sync(resolve(__dirname, './data', '**/get/*.js')).forEach((item, i) => {
  let apiFilePath = item && item.split('/data')[1];
  const moduleExport = require(item);
  // console.log('get=>>>',item);
  // console.log(apiFilePath);
  // console.log(moduleExport.url);

  router.get(moduleExport.url, (ctx, next) => {
    // console.log(ctx.params);
    // console.log(moduleExport.url);
    try {
      // 自定义响应体
      ctx.body = {
        data: Mock.mock(moduleExport.template),
        code: 0,
        message: 'success',
      };
    } catch (err) {
      ctx.throw('服务器错误', 500);
    }
  });

  // 记录路由
  routerMap[apiFilePath] = moduleExport.url;
});

// 注册请求方式为 post 的路由
glob.sync(resolve(__dirname, './data', '**/post/*.js')).forEach((item, i) => {
  let apiFilePath = item && item.split('/data')[1];
  const moduleExport = require(item);
  // console.log('post=>>>',item);
  // console.log(apiFilePath);
  // console.log(moduleExport.url);
  router.post(moduleExport.url, (ctx, next) => {
    // console.log(ctx.params);
    // console.log(moduleExport.url);
    try {
      // 自定义响应体
      ctx.body = {
        data: Mock.mock(moduleExport.template),
        code: 0,
        message: 'success',
      };
    } catch (err) {
      ctx.throw('服务器错误', 500);
    }
  });
  // 记录路由
  routerMap[apiFilePath] = moduleExport.url;
});



fs.writeFile(resolve(__dirname, './routerMap.json'), JSON.stringify(routerMap, null, 4), err => {
  if (!err) {
    console.log('路由地图生成成功');
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(999, res => {
  console.log('mock 服务启动成功 => port : 999');
});
