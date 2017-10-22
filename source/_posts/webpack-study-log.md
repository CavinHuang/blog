---
title: webpack-study-log webpack学习笔记【持续更行...】
date: 2017-07-21 22:44:26
tags: 
    - js
    - webpack
---


# webpack study demo1

---

首先安装webpack到本地
```sh
npm install --save-dev webpack webpack-dev-server
```
创建index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>webpack demo1</title>
</head>
<body>
	 <script src="./bundle.js"></script>
</body>
</html>
```
可以看出我们的输出文件当然是bundle.js

再创建webpack.config.js这个文件名是固定的不能更改
<!--more-->
```javascript
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js'
	}
}
```
只定义输出和入口文件

再依次创建 ./src ./src/index.js

```javascript
import _ from 'lodash'

function component() {
  var element = document.createElement('div');
  var element_h1 = document.createElement('h1')
  element_h1.innerHTML = 'Webpack Demo1'
  console.log(element_h1)
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.appendChild(element_h1)
  element.innerHTML += _.join(['Hello', 'webpack', 'By', 'CavinHuang\'s', 'Page'], ' ');

  return element;
}

document.body.appendChild(component());
```
lodash 是一个工具函数库 直接执行
```sh
npm install lodash --save
```

接下来就是借助webpack-dev-server来跑我们的测试, 直接运行
```sh
webpack-dev-server
```
这条命令即可， 打开 http://localhost:8080/ 就可以看到结果了

---

# Demo2
配置 npm scripts

```sh
npm run dev
```
和
```sh
npm run build 
```
在package.json中配置如下内容即可
```json
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
````

这样就可以直接通过这两条命令来打包和开发server运行
---
# Demo3 loader
loader主要用来加载各种格式的资源和数据的，比如css用css-loader 和style-loader；scss 用sass-loader；图片用file-loader或者url-loader
比如 在src/index中加入
```sh
import icon from './test.png'
```
在渲染函数component中加入如下代码
```javascript
var image = new Image()

image.src = icon
element.appendChild(image)

```
最后看看页面，你会发现，图片已经正确引入

---
# Demo4 多入口输出

首先配置webpack.config.js, 假设在src下建立一个print.js
```javascript
export default function () {
  console.log('Get content from print.js')
}
```
在并且把index.js改成如下：
```javascript
import _ from 'lodash'

import './style.css'

import icon from './test.png'

import PrintMe from './print.js'
function component() {
  var element = document.createElement('div');
  var element_h1 = document.createElement('h1')
  var image = new Image()
  var btn = document.createElement('button')

  image.src = icon
  
  element_h1.innerHTML = 'Webpack Demo4 OutPut'
  // btn.addEventListener('click', function () {
  //   alert(111)
  // }, false)
  btn.innerHTML = 'click to print some log'

  console.log(btn)

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.appendChild(element_h1)
  element.appendChild(image)
  element.appendChild(btn)
  element.innerHTML += "Hello webpack By CavinHuang's Page";

  return element;
}

document.body.appendChild(component());

document.getElementsByTagName('button')[0].onclick = PrintMe

```

并且在webpack.config.js中我们加入两个插件，HtmlWebpackPlugin 和 cleanWebpackPlugin ，分别用来管理html文件和清理之前的构建文件

webpack.config.js如今已经是如下内容:
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'OutPut Management'
    })
  ],
  devtool: "cheap-eval-source-map",
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'file-loader'}
    ]
  }
}
```
