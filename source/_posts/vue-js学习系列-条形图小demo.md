layout: '[layout]'
title: vue-js学习系列-条形图小demo
date: 2017-04-19 22:20:33 22:20:33
tags:
	- 前端
	- js
	- vue
---

现在上节中安装的项目的src目录中建立pages文件用来装demo源码
我们现在的目录结构是这样的
![这里写图片描述](http://img.blog.csdn.net/20170417214935878?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjQwOTg0OA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
<!-- more -->
首先在pages里新建demo01文件夹，顺便在demo01下，建立index.vue文件，然后在router里添加
```
{
    path: '/demo01',
    name: 'DEMO01',
    component: demo01
  }
```
index.vue里将会放置我们所有的demo代码
首先，写html结构作为template
```html
<template>
	<div id="demo01">
		<div class="table">
			<ul>
				<li v-for="item in dataList"><span class="text">{{item.name}}</span><span class="slide"><div class="progrss"><i class="progrss-activ" :style="{width: item.score + '%'}"></i></div><span class="num">{{item.score}}</span></span></li>
			</ul>
			<div class="ragle">
				<div class="input-item" v-for="(item, index) in dataList">
					<label :for="'inpt'+(index+1)">
					{{item.name}}
					</label>
					<input type="range" :data-index="index" v-on:input="rangeChange" :id="'inpt'+(index+1)" :value="item.score" max="100" min="0" step="1"/>
					<span>{{item.score}}</span>
				</div>
			</div>
		</div>

	</div>
</template>
```
结构很简单，一个是进度条，一个是拉动条，稍微加点样式
```html
<style>
	.table{
		height: 400px;
		width: 800px;
		margin: 100px auto;
		padding: 50px;
		background: #f5f5f5;
	}
	.table ul{
		width: 600px;
		margin: 0 auto;
	}
	.table ul li{
		height: 30px;
		line-height: 30px;
		margin-top: 30px;
		overflow: hidden;
		position: relative;
	}
	.text, .slide{
		display: inline-block;
		position: absolute;
	}
	.text{
		left: 0;
		width: 10%;
		text-align: right;
	}
	.slide{
		width: 90%;
		left: 12%;
	}
	.progrss{
		width: 80%;
		background: #dedede;
		height: 30px;
		display: inline-block;
		position: relative;
		border-radius: 8px;
	}
	.progrss-activ{
		height: 100%;
		background: #00A2E8;
		display: block;
		border-radius: 8px;
	}
	.num{
		display: inline-block;
		height: 30px;
		line-height: 30px;
		position: absolute;
		right: 0;
		top:0;
		width: 40px;
	}
	.ragle{
		margin: 50px 100px;
	}
	.input-item{
		height: 40px;
	}
	.input-item input{
		width: 80%;
		outline: none
	}
	.input-item .span{

	}
</style>
```
接下来就是写js了，在index.vue中添加script
```
<script>
	export default{
		data () {
			return {
				//首先定义数据
				dataList:[
					{
						"name": '语文',
						"score": 87
					},{
						name: '数学',
						score: 65
					},{
						name: '英语',
						score: 96
					},{
						name: '体育',
						score: 50
					}
				]
			}
		},
		created: function () {
			// console.log(this)
			// this.dataList = this.sortArray(this.dataList, 'score')
		},
		methods: {
			rangeChange: function (e) { //响应js时间
				var val = e.target.value;
				var index = e.target.attributes['data-index'].value
				console.log(val, index)
				this.dataList[index].score = val
				// this.dataList = this.sortArray(this.dataList, 'score')
			},
			sortArray: function (value, key) { //用来数据排序
			  return value.sort(function (a, c) {
			    return a[key] < c[key];
			 	})
			}
		}
	}
</script>
```
最终的效果就是
![demo01效果](http://img.blog.csdn.net/20170417215645202?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjQwOTg0OA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)