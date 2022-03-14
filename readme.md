### @qietuzi/node-utils

A js library for node utils,一个常用 node 工具库

### Install (安装)

```
npm i @qietuzi/node-utils --save
```

### use

#### file

```js
const { file } = require("@qietuzi/node-utils");

/* 
@desc       树形式列出目录下所有目录
@params     p       string      绝对目录
@result     TTreeNode[]         所有文件路径
*/
file.listDirTree(p);
/* 
@desc       树形式列出目录下所有文件
@params     p       string      绝对目录
@result     TTreeNode[]         所有文件路径
*/
file.listFileTree(p);
/* 
@desc       列表形式列出目录下所有文件
@params     p       string      绝对目录
@result     string[]            所有文件路径
*/
file.listFileList(p);
```

#### net

```js
const { net } = require("@qietuzi/node-utils");

/* 
@desc       树形式列出目录下所有目录
@params     
@result     string              本机IPV4
*/
net.getIPAdress(p);
```
