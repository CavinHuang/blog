---
title: 基于 Webpack 和 ES6 打造 JavaScript 类库
date: 2017-11-21 21:09:58
tags:
  - webpack
  - JavaScript
category:
  - frontend
  - webpack
---
## 首先，我们说的 “类库” 是指什么

> 在 JavaScript 语境中，我对类库的定义是 “提供了特定功能的一段代段”。一个类库只做一件事，并且把这件事做好。在理想情况下，它不依赖其它类库或框架。jQuery 就是一个很好的例子。React 或者 Vue.js 也可以认为是一个类库。
<!--more-->

一个类库应该：

可以在浏览器环境下使用。也就是说，可以通过 script 标签来引入这个类库。
可以通过 npm 来安装。
兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范。
用什么来开发这个类库并不重要，重要的是我们最终产出的文件。它只要满足上述要求就行。尽管如此，我还是比较喜欢用原生 JavaScript 写成的类库，因为这样更方便其它人贡献代码。

## 目录结构

我一般选择如下的目录结构：

```sh
+-- lib
|   +-- library.js
|   +-- library.min.js
+-- src
|   +-- index.js
+-- test
+-- lib
|   +-- library.js
|   +-- library.min.js
+-- src
|   +-- index.js
+-- test
```
其中 src 目录用于存放源码文件，而 lib 目录用于存放最终编译的结果。这意味着类库的入口文件应该放在 lib 目录下，而不是 src 目录下。

起步动作

我确实很喜欢最新的 ES6 规范。但坏消息是它身上绑了一堆的附加工序。也许将来某一天我们可以摆脱转译过程，所写即所得；但现在还不行。通常我们需要用到 Babel 来完成转译这件事。Babel 可以把我们的 ES6 文件转换为 ES5 格式，但它并不打算处理打包事宜。或者换句话说，如果我们有以下文件：

```sh
+-- lib
+-- src
    +-- index.js (es6)
    +-- helpers.js (es6)
```
然后我们用上 Babel，那我们将会得到：

```sh
+-- lib
|   +-- index.js (es5)
|   +-- helpers.js (es5)
+-- src
    +-- index.js (es6)
    +-- helpers.js (es6)
```
或者再换句话说，Babel 并不解析代码中的 import 或 require 指令。因此，我们需要一个打包工具，而你应该已经猜到了，我的选择正是 webpack。最终我想达到的效果是这样的：

```sh
+-- lib
|   +-- library.js (es5)
|   +-- library.min.js (es5)
+-- src
    +-- index.js (es6)
    +-- helpers.js (es6)
```
npm 命令

在运行任务方面，npm 提供了一套不错的机制——scripts（脚本）。我们至少需要注册以下三个脚本：

```json
"scripts": {
  "build": "...",
  "dev": "...",
  "test": "..."
}
```
npm run build – 这个脚本用来生成这个类库的最终压缩版文件。
npm run dev – 跟 build 类似，但它并不压缩代码；此外还需要启动一个监视进程。
npm run test – 用来运行测试。
构建开发版本

npm run dev 需要调用 webpack 并生成 lib/library.js 文件。我们从 webpack 的配置文件开始着手：

JavaScript
```javascript
// webpack.config.js
var webpack = require('webpack');
var path = require('path');
var libraryName = 'library';
var outputFile = libraryName + '.js';

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
};

module.exports = config;
```
即使你还没有使用 webpack 的经验，你或许也可以看明白这个配置文件做了些什么。我们定义了这个编译过程的输入（entry）和输出（output）。那个 module 属性指定了每个文件在处理过程中将被哪些模块处理。在我们的这个例子中，需要用到 Babel 和 ESLint，其中 ESLint 用来校验代码的语法和正确性。

这里有一个坑，花了我不少的时间。这个坑是关于 library、libraryTarget 和 umdNamedDefine 属性的。最开始我没有把它们写到配置中，结果编译结果就成了下面这个样子：

JavaScript
```javascript
(function(modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if(installedModules[moduleId]) return installedModules[moduleId].exports;

    var module = installedModules[moduleId] = {
      exports: {},
      id: moduleId,
      loaded: false
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.loaded = true;
    return module.exports;
  }

  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.p = "";

  return __webpack_require__(0);
})([
  function(module, exports) {
    // ... my code here
  }
]);
```
经过 webpack 编译之后的文件差不多都是这个样子。它采用的方式跟 Browserify 很类似。编译结果是一个自调用的函数，它会接收应用程序中所用到的所有模块。每个模块都被存放到到 modules 数组中。上面这段代码只包含了一个模块，而 __webpack_require__(0) 实际上相当于运行 src/index.js 文件中的代码。

光是得到这样一个打包文件，并没有满足我们在文章开头所提到的所有需求，因为我们还没有导出任何东西。这个文件的运行结果在网页中必定会被丢弃。不过，如果我们加上 library、libraryTarget 和umdNamedDefine，就可以让 webpack 在文件顶部注入一小段非常漂亮的代码片断：

JavaScript
```JavaScript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define("library", [], factory);
  else if(typeof exports === 'object')
    exports["library"] = factory();
  else
    root["library"] = factory();
})(this, function() {
return (function(modules) {
 ...
 ...
```
把 libraryTarget 设定为 umd 表示采用 通用模块定义 来生成最终结果。而且这段代码确实可以识别不同的运行环境，并为我们的类库提供一个妥当的初始化机制。

构建生产环境所需的版本

对 webpack 来说，开发阶段与生产阶段之间唯一的区别在于压缩。运行 npm run build 应该生成一个压缩版——library.min.js。webpack 有一个不错的内置插件可以做到这一点：

JavaScript
```javascript
// webpack.config.js
...
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

var libraryName = 'library';
var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: { ... },
  module: { ... },
  resolve: { ... },
  plugins: plugins
};

module.exports = config;
```
只要我们把 UglifyJsPlugin 加入到 plugins 数组中，它就可以完成这个任务。此外，还一些事情有待明确。我们还需要某种条件判断逻辑，来告诉 webpack 需要生成哪一种类型（“开发阶段” 还是 “生产阶段”）的打包文件。一个常见的做法是定义一个环境变量，并将它通过命令行传进去。比如这样：

```JavaScript

// package.json
"scripts": {
  "build": "WEBPACK_ENV=build webpack",
  "dev": "WEBPACK_ENV=dev webpack --progress --colors --watch"
}
```
（请留意 --watch 选项。它会让 webpack 监视文件变化并持续运行构建任务。）

测试

我通常采用 Mocha 和 Chai 来运行测试——测试环节是这篇起步教程特有的内容。这里同样存在一个棘手的问题，就是如何让 Mocha 正确识别用 ES6 写的测试文件。不过谢天谢地，Babel 再次解决了这个问题。

```JavaScript

// package.json
"scripts": {
  ...
  "test": "mocha --compilers js:babel-core/register --colors -w ./test/*.spec.js"
}
```
这里最关键的部分在于 --compilers 这个选项。它允许我们在运行测试文件之前预先处理这个文件。

其它配置文件

在最新的 6.x 版本中，Babel 发生了一些重大的变化。现在，在指定哪些代码转换器将被启用时，我们需要面对一种叫作 presets 的东西。最简单配置的方法就是写一个 .babelrc 文件：

```JavaScript

// .babelrc {
  "presets": ["es2015"],
  "plugins": ["babel-plugin-add-module-exports"]
}
```
ESLint 也需要一个类似的配置文件，叫作 .eslintrc：

```javascript
// .eslintrc {
  "ecmaFeatures": {
    "globalReturn": true,
    "jsx": true,
    "modules": true
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "document": false,
    "escape": false,
    "navigator": false,
    "unescape": false,
    "window": false,
    "describe": true,
    "before": true,
    "it": true,
    "expect": true,
    "sinon": true
  },
  "parser": "babel-eslint",
  "plugins": [],
  "rules": {
    // ... lots of lots of rules here
  }
}
```
相关资料

用到的项目如下：

webpack
Babel
ESLint
Mocha, Chai
UMD
具体依赖如下：

```
// package.json
"devDependencies": {
  "babel": "6.3.13",
  "babel-core": "6.1.18",
  "babel-eslint": "4.1.3",
  "babel-loader": "6.1.0",
  "babel-plugin-add-module-exports": "0.1.2",
  "babel-preset-es2015": "6.3.13",
  "chai": "3.4.1",
  "eslint": "1.7.2",
  "eslint-loader": "1.1.0",
  "mocha": "2.3.4",
  "webpack": "1.12.9"
}
// package.json
"devDependencies": {
  "babel": "6.3.13",
  "babel-core": "6.1.18",
  "babel-eslint": "4.1.3",
  "babel-loader": "6.1.0",
  "babel-plugin-add-module-exports": "0.1.2",
  "babel-preset-es2015": "6.3.13",
  "chai": "3.4.1",
  "eslint": "1.7.2",
  "eslint-loader": "1.1.0",
  "mocha": "2.3.4",
  "webpack": "1.12.9"
}
```
