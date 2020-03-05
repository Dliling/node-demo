### 一个简单的管理系统，用node实现了一些简单接口。
启动
```js
npm i
node server.js
```
以mongoDB为数据库，所以本地需要安装mongoDB数据库，安装好数据库后可以用cmd操作数据库，也可安装可视化工具[Robo](https://robomongo.org)。

package.json中安装的mongodb并不是数据库，只是node.js连接mongoDB的一个驱动。

Mac安装可参考[我的笔记](https://segmentfault.com/a/1190000021681562)。

每次修改文件都需要重启服务，推荐一个自动重启工具[nodemon](https://www.npmjs.com/package/nodemon)。

附上一些参考文档：

 + node文档[node](http://nodejs.cn/api/)
 + express框架[express](https://www.expressjs.com.cn/4x/api.html#express)
 + [mongodb](https://www.npmjs.com/package/mongodb)
 + mongoDB连接[mongoose](https://www.npmjs.com/package/mongoose)
 + session[express-session](https://www.npmjs.com/package/express-session)
 + cookie解析[cookie-parser](https://www.npmjs.com/package/cookie-parser)
 + 发送邮件[nodemailer](https://www.npmjs.com/package/nodemailer)
 + 解析入参[body-parser](https://www.npmjs.com/package/body-parser)
 + 上传文件[multer](https://www.npmjs.com/package/multer)
 + path模块[path](https://www.npmjs.com/package/path)
 + request模块[request](https://www.npmjs.com/package/request)
 + 解决跨域[cors](https://www.npmjs.com/package/cors)
