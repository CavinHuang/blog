layout: '[layout]'
title: vueJs学习日志01-初探vueJs 的魅力
date: 2017-01-22 22:20:33
tags:
	- 前端
	- js
	- vue
category:
 - frontend
 - vue
---
>vuejs目前的火爆程度真的让人惊叹啊，作为一个初入前端的人，能够学习到这样的技术真的是一种荣幸！

首先安装vue.js非常简单：
第一种：
```
$ npm install vue
```
<!-- more -->
第二种直接到[vuejs中文官网](http://cn.vuejs.org/)里下载就行！

初探vuejs，我们准备一个简单的html页面
```
<!DOCTYPE html>
<html>

<head>
    <title></title>
</head>

<body>
    <div id="app">
        <input type="text" v-model="message">
        <h3>{{ message }}</h3>
    </div>
    <script type="text/javascript" src="../node_modules/vue/dist/vue.js"></script>
    <script type="text/javascript">
    var vim = new Vue({
        el: "#app",
        data: {
            message: "hello vueJS"
        }
    });
    </script>
</body>
</html>
```
用这个页面，我们来看看vuejs，基于数据流的强大之处。
第一步：我们尝试改变页面中input的值，你会惊奇的发现，下面h2的内容也跟着变化了，
第二步：我们打开chrome的控制台，输入vim.$data.message，你会看到当前的message的值，接下来我们再次输入vim.$data.message = "1111"，你会惊奇的发现页面的input和h2都变成了1111，


第二个小demo是一个模仿百度搜索是关键字的显示的效果
![vue-baidu-input-demo](/assets/blogImg/vue-baidu-input.gif)

脱离了以往用原生js或者jquery对元素节点选择的苦恼，越用你就会越喜欢它了,
这个小demo用了vuejs的一个用于ajax请求的插件！[vue-resource](https://github.com/pagekit/vue-resource)
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <div class="baidu-inp" id="baidu">
        <my-component></my-component>
    </div>
    <script type="text/javascript" src="../node_modules/vue/dist/vue.js"></script>
    <script type="text/javascript" src="../node_modules/vue-resource/dist/vue-resource.js"></script>
    <script type="text/javascript">
    // 注册

    Vue.component('my-component', {
        template: `<div class="input-box">
            <input type="text" class="input" v-model="keywords" v-on:keyup.down="downActive" v-on:keyup.up="downActive" v-on:keyup="getKeywors" v-on:keyup.enter="toBaidu" />
            <button class="button">百度一下</button>
            <div>
                <div class="list" v-if="inputList">
                    <ul>
                        <li v-for="(item, index) in items" :class="index===idx? 'active':''">{{ item }}</li>
                    </ul>
                </div>
            </div>
        </div>`,
        data: function() {
            return {
                inputList: false,
                keywords: "",
                items: [],
                idx: -1,
                length: 0
            }
        },
        watch: {

        },
        methods: {
            getKeywors: function() {
                this.$http.jsonp(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${this.$data.keywords}&json=1`, {//分析百度的请求会发现它是用jsonp的方式来请求数据的
                    jsonp: "cb"
                }).then((response) => {
                    // success callback
                    this.$data.items = JSON.parse(response.bodyText).s;
                    this.$data.length = this.$data.items.length;
                    console.log(this.$data.items);
                    if (this.$data.keywords === "" || this.$data.length === 0) {
                        this.$data.inputList = false;
                    } else {
                        this.$data.inputList = true;

                    }

                }, (response) => {
                    // error callback
                });
            },
            downActive: function() {
                this.$data.idx = this.$data.idx + 1;
                if (this.$data.idx > this.$data.length) {
                    this.$data.idx = 0;
                }
                if (this.$data.idx < 0) {
                    this.$data.idx = this.$data.length;
                }
                this.$data.keywords = this.$data.items[this.$data.idx];
            },
            toBaidu: function() {
                location.href = `https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&tn=baidu&wd=${this.$data.keywords}`;
            }
        }
    })

    var $vim = new Vue({
        el: "#baidu",


    });
    </script>
</body>

</html>
```
作为初学者，我就像学jquery一样去学习vuejs，其实vuejs给我们的便利，就像jquery给我们选择节点的便利一样，让coding不用诸如
```javascript
$("#a").parent().find('li').siblings('a')........
```
只需要关注数据的状态就可以，这无疑再一次减轻了我们的工作量，初学前端，只为记录自己的学习路线！
好了vuejs第一篇就到此结束了


 