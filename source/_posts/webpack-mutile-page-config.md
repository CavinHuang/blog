---
title: webpack多页面配置记录
date: 2018-01-17 17:06:16
tags:
  - js
  - webpack
  - webpack多页面
category:
  - 前端开发
  - webpack
---

之前也写过webpack学习记录，项目中需要一个常用的webpack多页面配置，所以才动手，本着能写一行是一行的原则，开始了配置webpack之旅。
<!--more-->

# 定目录结构
首先我只需要开发环境（包含自动更新）和打包环境，初定的目录结构是这样的
{%asset_img dir-1.png 目录结构 %}
app主要写业务代码，config里写webpack配置和一些打包、开发的配置，经过一番计较，最后根据自己习惯，目录结构如下：
{%asset_img dir-2.png 目录结构 %}
```bash
app
  -libs  # 第三方插件库，可以是css也可以是js，eg：jq
  -static # 公共的静态资源文件夹
  -temlates # 模板文件夹
    -*** # 模块文件夹
    -css # 当前模块独有的css文件需要在index.js中import
    -html # 模板文件，计划支持html，pug两种模板语言
    -index.js # 当前模块入口文件
```
# 配置webpack
按上面所说，建好文件后，在根目录新建webpack.config.js
然后全局安装webpack和webpack-dev-server
```
npm i webpack webpack-dev-server -g
```
然后局部安装
```
npm i webpack webpack-dev-server --save-dev
```
这样我们的项目就可以引入webpack了，并且可以使用webpack-dev-server的相关功能了，webpack.config.js内容非常的简单，就是根据环境变量中指定的当前环境来加载不同的webpack配置即可：
```js
// 未指定这手动指定为生产环境
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'product';
// 获取环境命令，并去除首尾空格
const env = process.env.NODE_ENV.replace( /(\s*$)|(^\s*)/ig, "" );
// 根据环境变量引用相关的配置文件
module.exports = require( `./config/webpack.config.${env}.js` )
```
在config文件夹下分别新建webpack.config.dev.js和webpack.config.product.js分别代表开发环境的配置和生成打包文件的配置，考虑到很多配置都会相同，再建一个webpack.config.base.js用来写统一的配置。

webpack.config.dev.js和webpack.config.product.js的区别是一个runtime时的配置，一个文件生成的配置，简而言之，就是开发环境的不同是配置webpack-dev-server,生产环境是压缩，map等配置

webpack.config.base.js文件才是webpack配置的主菜，包括entry、output、modules、plugins等

## 获得所有入口文件的文件夹
```js
function getEntryDir() {
	let globPath = 'app/templates/**/*.' + config.tplLang
	// (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
	let pathDir = 'app(\/|\\\\)(.*?)(\/|\\\\)html'
	let files = glob.sync( globPath )
	let dirname, entries = []
	for ( let i = 0; i < files.length; i++ ) {
		dirname = path.dirname( files[ i ] )
		entries.push( dirname.replace( new RegExp( '^' + pathDir ), '$2' ) )
	}
	return entries;
}
```

## 注入entry和生成HTMLWebpackPlugin
```js
getEntryDir()
	.forEach( ( page ) => {
		let moduleName = page.split( '/' )
		let moduleNameStr = moduleName[ moduleName.length - 1 ]
		const htmlPlugin = new HTMLWebpackPlugin( {
			filename: `${moduleNameStr}.html`,
			template: path.resolve( __dirname, `../app/${page}/html/index.${config.tplLang}` ),
			chunks: [ moduleNameStr, 'vendors' ],
		} );
		HTMLPlugins.push( htmlPlugin );
		Entries[ moduleNameStr ] = path.resolve( __dirname, `../app/${page}/index.js` );
	} )
```
关于HTMLWebpackPlugin的用法，可以参照[html-webpack-plugin用法全解](https://segmentfault.com/a/1190000007294861) 以及[官方文档](https://github.com/jantimon/html-webpack-plugin) 已经写的非常详尽了。

### 第三方库入口自动获取
```js
function getVendors() {
	let globPath = `app/${config.libraryDir}/**/*.*`
	let files = glob.sync( globPath )
	let libsArr = []
	files.forEach( ( v, i ) => {
		libsArr.push( './' + v )
	} )
	return libsArr
}
Entries[ 'vendors' ] = getVendors() // 第三方类库
```
其中多页面入口和第三方库配置，请看这篇webpack中文站文档[分离 应用程序(app) 和 第三方库(vendor) 入口](https://doc.webpack-china.org/concepts/entry-points/#-app-vendor-)

### output 配置
```js
output: {
  filename: "static/js/[name].bundle.[hash].js",
  path: path.resolve( __dirname, config.devServerOutputPath )
}
```

### webpack配置合并
主要用到一个webpack插件 webpack-merge，可把分开配置的config合并，分开生产环境和调试环境

最后奉上github地址: [webpack-multi-skeleton](https://github.com/CavinHuang/webpack-multi-skeleton),有不对之处，请指正！
