---
title: '使用rollup | vue cli3(Webpack) 搭建属于自己的组件库,(按需加载,多入口打包...)'
comments: true
date: 2021-04-18 21:39:04
categories:
  - tools
tags:
 - vue
 - rollup
 - 组件库
 - 打包
---

[项目github地址](https://github.com/anncwb/lib-starter)  
最近准备抽离一些组件,所以就动手搭建了一个基础打包项目,该有的功能基本都有,功能如下:

### **按需引入:**

> 支持使用`babel-plugin-import`插件按需引入,同时项目也支持多入口打包,可以单独引入某个入口打包文件,达到按需引入的目的.

### **多种方式打包:**

> 支持`rollup`和`vue cli3`两种方式打包成库文件,`rollup`支持多种格式打包,只需要执行不同的npm命令即可

### **组件测试及demo文档**

> 保留`vue cli3`当做example示例启动架子,支持vuepress文档,采用类是element-ui文档风格的组件展示.使用jest当做项目测试工具
<!--more-->
### **其他一些配置**

> 内置了`eslint`,`styleline`,`commitlint`,`prettier`,`conventional`等多个插件来规范代码,保证代码质量

#### 项目目录:

![](1.png)

如何创建属于组件库或者依赖库
--------------

### 第一步 获取代码

拉取项目代码 [https://github.com/anncwb/lib-starter](https://github.com/anncwb/lib-starter)到本地  
**一些目录说明**

    .
    ├── build
    │   ├── cli.build.js // vue cli3打包配置
    │   ├── rollup.build.js // rollup打包配置
    │   ├── rollup.createConfig.js 
    │   └── utils.js 
    ├── config
    │   └── rollup.build.config.js // rollup打包类型配置
    ├── docs // 开发文档
    ├── examples // 开发示例
    ├── lib // 打包后的文件
    │   └── theme 打包后的css文件
    ├── packages // 子模块
    ├── src 
    │   ├── index.js  // 主入口
    │   └── lib-list.js // 模块打包配置
    ├── tests // 测试文件
    ├── types // 类型定义文件
    
    

### 第二步 编写组件

在package下面新建组件或者js库,这里使用的是vue来做测试例子,组件编写需要提供js文件如下`index.js`  
![](2.png)

### 编写统一的入口文件

在src下面创建`index.js`文件,将所有组件引入,并导出  
![](3.png)

### 开始打包

打包前需要自己编写一个打包入口文件,用于多入口打包,没做成自动获取,自己动手写把,  
在 src下面新建 `lib-list.js`文件,文件名必须一致且不能使用es6语法导出  
lib-list.js:

    module.exports = {
      index: {
        input: 'src/index.js',
        output: 'index'
      },
      'file-handle': {
        input: 'packages/file-handle/index.js',
        output: 'file-handle'
      },
      'test-module': {
        input: 'packages/test-module/index.js',
        output: 'test-module'
      }
    }
    
    

**lib-list.js说明**

input: 你需要打包的入口,这里需要使用js,所以package的组件必须提供js入口文件

output: 打包后的组件名,打包后会在`lib`目录下生成对应的文件

### 打包

**rollup打包**

如果项目偏向于库文件, **建议使用rollup打包**

执行`npm run lib`即可,

![](4.png)

**使用vue cli3(webpack)打包**

如果项目偏向于UI库,包含比较多的静态文件, **建议使用这种方式打包**  
执行`npm run lib:cli`即可

![](5.png)

完成后会显示打包成功字样就可以了,同时会生成lib目录,就是你到包后的文件,

同时两种打包方式,默认输出的lib文件名会一模一样,方便切换,当然,你也可以自行更改

### 发布到npm

这里就不再说如何发布到npm了,大家自行百度,注意将package.json的main指向`lib/index.js`即可

如何实现按需加载
--------

### 方式一

使用 `babel-plugin-import`实现按需加载

1.  **在项目中引入你自己发布到npm上面的库**

    yarn add xxx 
    我这里是
    yarn add vue-lib-starter 
    

2.  **安装 babel-plugin-import**

    yarn add  babel-plugin-import -D
    

3.  **配置babel.config.js**

    module.exports = {
      ....
      plugins:[
        [  'import',
          {
          // 组件库的名字,可以根据你发布的库的package.json的name自行更改
            libraryName: 'vue-lib-starter',
            
            // 默认打包是lib,不用更改
            libraryDirectory: 'lib',
            
            // 如果有样式文件,因为打包后样式统一放在/lib/theme下,所以需要稍微转换下
            style: (name, file) => {
              const libDirIndex = name.lastIndexOf('/')
              const libDir = name.substring(0, libDirIndex)
              const fileName = name.substr(libDirIndex + 1)
              return `${libDir}/theme/${fileName}.css`;
            }
          }
        ]
      ]
    }
    

4.  **结果(亲测有效,可以自行测试)**

    import { TestModule } from 'vue-lib-starter'
    会转化成下面:
    
    js:
    import TestModule from 'vue-lib-starter/lib/test-module.js'
    
    css:
    import 'vue-lib-starter/lib/theme/test-module.css'
    

### 方式二

手动按需引入,打包后出了统一的入口文件,还可以自己打包多个入口,如果有配置,可以直接引入自己需要的组件:

    import TestModule from 'vue-lib-starter/lib/test-module.js'
    import 'vue-lib-starter/lib/theme/test-module.css'
    

这样即可完成按需引入,两种方式其实最终效果都一样

文档编写
----

集成了[vuepress](https://v1.vuepress.vuejs.org/zh/)作为文档编写工具,具体使用请参考官方文档

![](6.png)

一些注意点
-----

*   项目的`eslint`和`stylelint`规则可能跟你的项目,需要自行修改
*   项目默认会对`git`提交的`message`进行校验,请确保你的message个是符合commitline规则,具体可以查看根目录下`commitlint.config.js`
*   src下面的`lib-list.js`必须有,否则会出错
*   `npm run lint:prettier` 执行会格式化全部js和ts文件,谨慎这行
*   `npm run lint:css` 执行可能会报错,因为项目的目录下没有css文件
*   `npm run version` 生成变更日志的前提是你要符合上面的commitlint.config.js提交规范

最后
--

更多的细节可以自行拉取代码查看

由于是时间比较少,就一天左右的时间弄出来的,有些东西可能没考虑全,大家可以自己根据自己的需求修改代码,仅提供我的代码参考而已## 目标

去除 iconfinder 上 icon 的水印

### 原理

利用水印像素点和原图像素点颜色合并的原理，如果拥有加过水印的图片和水印图片，就可以反向推出原图原像素点的颜色；前提是你得拥有他的水印图片
