---
title: 一步一步完成一个node-cli
date: 2018-02-03 11:32:49
tags:
  - nodejs
  - node-cli
  - shell
category:
  - nodejs学习笔录
  - web前端开发
---

node-cli 即用nodejs与shell交互，完成指定工作的工具。他们通常是长这样的：
```bash
sass xx.scss:xx.css
webpack ....
```
等等，我们实现的这个工具是为了拉取[CavinHuang/webpack-multi-skeleton webpack 多页面骨架](https://github.com/CavinHuang/webpack-multi-skeleton)用于本地快速构建项目的脚手架工具，设想通过以下命令来实现：
```bash
webpack-template i  # install git端所有的模板列表供选择，选择其中之一后进行本地缓存
webpack-template init # 通过一些选项，初始化整个项目
```
整个设想大概就是这些，下面就从最简单的开始，来一步一步实现。
<!--more-->
# 实现第一个自己的node命令
我们直接用npm init初始化一个项目出来
```bash
npm init node-cli-demo
```
一路yes即可，进入项目，在package.json中添加如下代码
```json
"bin": {
  "hi": "./bin/hi.js"
},
```
创建bin目录和hi.js,在hi.js中写下如下代码
```js
#!/usr/bin/env node
console.log('Hi Welcome node cli')
```
用命令行进入当前项目目录，输入
```bash
hi
```

如果提示没有这个命令，输入
```bash
npm link
```
刷新命令即可。

一个最简单的node-cli就完成了。我们来解释下：
* #!/usr/bin/env node在这里有什么作用？
首先我们都知道操作系统中都会有一个 PATH 环境变量，当系统调用一个命令的时候，就会在PATH变量中注册的路径中寻找，如果注册的路径中有就调用，否则就提示命令没找到。我们可以通过process.env获取本机系统中所有的环境变量，所以这句话主要是帮助脚本找到node的脚本解释器，可以理解为调用系统中的node来解析我们的脚本。

# 处理命令行参数
node process对象一个提供有关当前Node.js进程的信息和控制的全局对象，在node环境下无需通过require()即可调用。

process.argv属性返回一个数组，其中包含启动Node.js进程时传递的命令行参数。第一个元素是process.execPath， 如果需要访问argv[0]的原始值，可以使用process.argv0，第二个元素将是要执行的JavaScript文件的路径， 其余元素将是任何其他命令行参数。

#!/usr/bin/env node
console.log('call %s', process.argv[2]);
然后输入test hello，打印出call hello。

对于命令行参数处理，我们用现成的模块commander来处理，commander提供了用户命令行输入和参数解析强大功能。这里我们就使用轻量级，表达力强大的commander进行处理。

官网：[commander 官方网站](http://tj.github.io/commander.js/)

看一个官网的例子
```js
#!/usr/bin/env node
var program = require('commander');

program
  .version('0.1.0')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    var mode = options.setup_mode || "normal";
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ deploy exec sequential');
    console.log('    $ deploy exec async');
    console.log();
  });

program
  .command('*')
  .action(function(env){
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);
```
首先安装commander
```bash
yarn add commander # OR npm install commander
```
看下效果：
```bash
hi -V

hi setup

hi exec
```

#commander.js API

- Option() ——> 初始化自定义参数对象，设置“关键字”和“描述”
- Command() ——> 初始化命令行参数对象，直接获得命令行输入,返回一个数组或者string
- Command#command() ——> 定义命令名称
- Command#arguments() ——> 定义初始命令的参数
- Command#parseExpectedArgs() ——> 解析预期参数
- Command#action() ——> 注册命令的回调函数
- Command#option() ——> 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔
- Command#allowUnknownOption() ——> 允许命令行未知参数
- Command#parse() ——> 解析process.argv，设置选项和定义时调用命令
- Command#parseOptions() ——> 解析参数
- Command#opts() ——>设置参数
- Command#description() ——> 添加命令描述
- Command#alias() ——> 设置命令别名
- Command#usage() ——> 设置/获取用法
- Command#name()
- Command#outputHelp() ——> 设置展示的help信息
- Command#help()

有了上面的API我们来实现一个用于罗列出当前文件夹下所有文件和文件夹的命令list:
```js
program
	.command( 'list' ) //声明hi下有一个命令叫list
	.description( 'list files in current working directory' ) //给出list这个命令的描述
	.option( '-a, --all', 'Whether to display hidden files' ) //设置list这个命令的参数
	.action( function ( options ) { //list命令的实现体
		var fs = require( 'fs' );
		//获取当前运行目录下的文件信息
		fs.readdir( process.cwd(), function ( err, files ) {
			var list = files;
			if ( !options.all ) { //检查用户是否给了--all或者-a的参数，如果没有，则过滤掉那些以.开头的文件
				list = files.filter( function ( file ) {
					return file.indexOf( '.' ) !== 0;
				} );
			}
			console.log( list.join( '\n\r' ) ); //控制台将所有文件名打印出来
		} );
	} );
```
运行
```bash
hi list # hi list -a 或者 --all来查看效果
```
第一阶段的代码github地址:[github传送门，0.0.1分支为第一版本的代码](https://github.com/CavinHuang/node-cli-demo/tree/0.0.1)

# 搭建正式版本的开发环境，使它支持es6语法，支持eslint

```bash
yarn add -D babel-cli babel-eslint babel-plugin-transform-es2015-modules-commonjs babel-preset-latest-node
```
在项目根目录新建.babelrc，内容为：
```js
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ],
  "plugins": [
    "transform-es2015-modules-commonjs"
  ]
}
```

新建src目录，用于开发，新建src/command目录和src/utils目录，用于开发使用。
建好后目录结构如下：
```bash
├─bin             # 脚本启动文件所在目录
├─node_modules    # libraray 目录
│  └─commander    
│      └─typings  
└─src             # 开发目录
    ├─command     # 命令实现目录，一个命令对应一个文件
    └─utils       # 工具目录
```
接下来我们实现一个入口，把功能转到对应的命令实现文件，来具体实现。新建index.js用于处理入口，再建立src/index.js用于实际的功能转发
index.js 内容如下
```js
// babel解析
require( "babel-register" )
require( "babel-core" )
	.transform( "code", {
		presets: [ [ require( 'babel-preset-latest-node' ), {
			target: 'current'
		} ] ]
	} );
require( 'babel-polyfill' )

require('./src')
```
src/index.js 内容如下：
```js
var program = require( 'commander' );
program.parse( process.argv ); //开始解析用户输入的命令
require( './command/' + program.args + '.js' ) // 根据不同的命令转到不同的命令处理文件
```
解释一下，为什么我想这样做：
* 为了保证文件单一职责，方便维护；
* 方便dev和product加载。
接下来我们建立相应的问价即可，src/command/init.js   src/command/install.js 两个命令处理文件，内容如下：

src/command/list.js:
```js
var program = require( 'commander' );
program
	.command( 'init' )
	.description( 'init project for local' )
	.action( function ( options ) { //list命令的实现体
		// to do
		console.log( 'init command' );
	} );
program.parse( process.argv ); //开始解析用户输入的命令
```

src/command/install.js:
```js
var program = require( 'commander' );
program
	.command( 'install' )
	.description( 'install github project to local' )
	.action( function ( options ) { //list命令的实现体
		// to do
		console.log( 'install command' );
	} );
program.parse( process.argv ); //开始解析用户输入的命令
```

在命令行输入以下命令来测试:
```bash
webpack-template install

webpack-template init
```

第二版完成代码地址：[【第二版github地址，可以clone下来试试】](https://github.com/CavinHuang/node-cli-demo/tree/0.0.2)

接下来我们分别实现install功能和init功能。
首先，install步骤设想如下：
- 通过github api拉取仓库里的模板项目
- 通过选择模板进行下载
- 缓存至本地临时目录，供下次直接使用

首先，去[github api v3](https://developer.github.com/v3/repos/)找到所需的api接口，
为了方便单独管理模板项目，我新建了一个organization来管理。所以，我主要是通过
```
/orgs/:org/repos #获取项目
和
/repos/:owner/:repo #获取版本
```
项目已经建好，可以通过以下api来查看仓库详情
1、项目列表
```
url -i https://api.github.com/orgs/cavinHuangORG/repos
```
2、项目版本
```
curl -i https://api.github.com/repos/cavinHuangORG/webpack-multipage-template/tags
```

通过命令行选择选项，效果如下：
{%asset_img inquirer.gif %}

这里我们用到另外一个命令行交互的库，inquirer.js,主要用来命令行选择和输入；
我们先实现一个简单的在insatll.js完成如下代码：
```js
var inquirer = require( 'inquirer' );
program
	.command( 'install' )
	.description( 'install github project to local' )
	.action( function ( options ) { //list命令的实现体
		// to do
		console.log( 'install command' );
		let choices = [ 'aaa', 'bbb', 'ccc', 'dddd' ];
		let questions = [ {
			type: 'list',
			name: 'repo',
			message: 'which repo do you want to install?',
			choices
  } ];
		// 调用问题
		inquirer.prompt( questions )
			.then( answers => {
				console.log( answers ); // 输出最终的答案
			} )
	} );
program.parse( process.argv ); //开始解析用户输入的命令
```
最终结果如下：
{%asset_img install-1.gif 选择效果 %}
到此已经我们要的效果已经差不多完成了。下一步，我希望可以通过用户输入一些特定的参数，来初始化整个项目。

# download-git-repo
下面我们要用到一个库，来下载github库的代码，[download-git-repo](https://github.com/flipxfx/download-git-repo),用法如下：
```js
download(repository, destination, options, callback)
```
> Download a git repository to a destination folder with options, and callback.
将Git存储库下载到带有选项的目标文件夹和回调函数

* repository github库地址
  * GitHub - github:owner/name 或者简写为 owner/name
  * GitLab - gitlab:owner/name
  * Bitbucket - bitbucket:owner/name

* destination 目标文件夹
* options 下载时携带的参数
  * clone 默认false
* callback 完成之后的回调

## download-git-repo 用法实例

```js
const downloadGitRepo = require('download-git repo')
// 把目标项目下载到当前目录下的test下
downloadGitRepo('CavinHuang/node-cli-demo', './test', false, err => {
  console.log(err ? 'SUCCESS' : "FAIL");
} )
```

# 完成git操作类

我们专门分装一个类用来获取git仓库列表、版本信息、下载git代码等操作，主要有以下几个方法，代码就不贴了，代码全在git仓库0.0.3分支
```js
/**
 * 获取git仓库列表
 */
async fetchRepoList() {}

/**
 * 获取仓库所有的版本
 * @param  {[string]} repo [仓库名称]
 * @return {[type]}      [description]
 */
async fetchRepoTagList( repo ) {}

/**
 * 获取仓库详细信息
 * @param  {[string]} repo [仓库名称]
 * @return {[type]}      [description]
 */
async fetchGitInfo( repo ) {}

/**
 * 下载git仓库代码到指定文件夹
 * @param  {[string]} repo [仓库名称]
 * @return {[type]}      [description]
 */
async downloadGitRepo( repo ) {}
```

在install.js里，首先我们要把仓库里的所有的模板拉出来供选择,只要把choices换成我们通过api获取的git长裤列表即可
```js
import gitCtrl from '../utils/gitCtrl'
import config from '../config'
// 初始化git操作类
let git = new gitCtrl.gitCtrl( config.repoType, config.registry )
```
action里的改成：
```js
// 获取git仓库列表
let choices = await git.fetchRepoList();
```
下面是根据用户选择仓库下载代码到本地, 我们新建一个config文件夹用来存放一些配置，定义一些常用的变量，如缓存目录，版本等等，新建constant.js
```js
const os = require( 'os' );
import {
	name,
	version,
	engines
} from '../../package.json';

// 系统user文件夹
const home = process.env[ ( process.platform === 'win32' ) ? 'USERPROFILE' : 'HOME' ];

// user agent
export const ua = `${name}-${version}`;

/**
 * 文件夹定义
 * @type {Object}
 */
export const dirs = {
	home,
	download: `${home}/.webpack-project`,
	rc: `${home}/.webpack-project`,
	tmp: os.tmpdir(),
	metalsmith: 'metalsmith'
};

/**
 * 版本
 * @type {Object}
 */
export const versions = {
	node: process.version.substr( 1 ),
	nodeEngines: engines.node,
  [ name ]: version
};
```
index.js
```js
/**
 * 配置文件
 */

export default {
	registry: 'cavinHuangORG', // 仓库地址
	repoType: 'org', // ['org', 'user']
	metalsmith: true
}
```
有了这些，下边我们就下载代码了:
```js
// 下载库
let result = await git.downloadGitRepo( answers.repo )
console.log( result ? 'SUCCESS' : result )
```
这时我们运行
```bash
webpack-template install
```
结果如下：
{% asset_img install-2.gif install结果%}
这时我们去看系统的user文件夹下的.webpack-project下，就会找到我们换成的项目了。
到这里，我们install代码已经完成了，[github地址](https://github.com/CavinHuang/node-cli-demo/tree/v0.0.3)

# 完成init命令
