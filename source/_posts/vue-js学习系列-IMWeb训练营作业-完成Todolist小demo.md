layout: '[layout]'
title: vue-js学习系列-IMWeb训练营作业-完成Todolist小demo
date: 2017-04-19 22:20:33
tags:
	- 前端
	- js
	- vue
---

先上最终的效果图吧，简单小例子，30分钟左右完成
![这里写图片描述](http://img.blog.csdn.net/20170419205645612?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjQwOTg0OA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

<!-- more -->
---
demo本身非常简单，但是可以很好的总结最近学习vue的收获。
首先构建简单的template模板，对于我们前端来说，页面是一切的工作的开始
```html
<template>
	<div id="demo02">
		<div class="header">
			<h1>Vue js TodoList Demo</h1>
		</div>
		<div class="work-block">
			<div class="input-block">
				<input type="text" class="inpt" placeholder="输入任务（可以直接回车或者点击按钮）" v-model="msg" @keyup.enter="addItem"/>
				<input type="button" class="inpt-btn" value="添加任务" v-on:click="addItem"/>
			</div>
			<div class="todo-list">
				<div class="empty" v-show="dataList.length == 0">还没有计划，赶快添加吧！</div>
				<ul>
					<li class="todo-item" v-for="(item, index) in dataList">
						<div class="todo-text">
							<span class="test-item">{{item.title}}</span>
							<span class="test-text">{{item.status|setStatusAttr}}</span>
							<span class="test-time" v-show="item.time != ''">完成时间:{{item.time|setTimeAttr}}</span>
						</div>

						<div class="todo-btn">
							<span class="btn complate" @click="complate(index)">{{btn(item.status)}}</span>
							<span class="btn fail" @click="fail(index)">放弃</span>
							<span class="btn fail" @click="deleteItem(index)">删除</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
```
然后本着不污染自己和别人的眼睛的本意，稍微给它来点样式，不至于辣眼睛
```html
<style scoped>
	.header{
		width: 100%;
		height: 45px;
		text-align: center;
		line-height: 45px;
		background: #f5f5f5;
	}
	.work-block{
		width: 800px;
		margin: 20px auto 0 auto;
		border: 1px solid #ddd;
		background: #f2f2f2;
		border-radius:5px;
		padding: 12px;
	}
	.input-block{
		height: 60px;
		padding-left: 20px;
	}
	.inpt{
		width: 500px;
		height:34px;
		line-height: 34px;
		border:1px solid #ddd;
		padding: 0 8px;
		outline: none;
	}
	.inpt-btn{
		width: 80px;
		line-height: 34px;
		height: 34px;
		margin-left:20px;
		border:1px solid #ddd;
		background: #41B883;
		color:#fff;
		border-radius: 5px;
		outline: none;
	}
	.todo-list{
		background: #fff;
		padding:8px;
	}
	.todo-item{
		height:56px;
		border:1px solid #ddd;
		margin-top: 12px;
		border-radius: 25px;
		padding-left: 20px; 
		position: relative;
	}
	.test-item{
		height:32px;
		line-height: 32px;
		font-size: 16px; 
		display: inline-block;
	}
	.test-text{
		position: absolute;
		bottom:8px;
		left:28px;
		color:#999;
	}
	.test-time{
		position: absolute;
		left:50%;
		bottom:8px;
		color: #27A3FB;
	}
	.todo-btn{
		position: absolute;
		right:20px;
		top: 16px;
	}
	.btn{
		display: inline-block;
		padding: 4px 12px;
		margin-left:12px;
		border-radius: 4px;
		color:#fff;
		cursor: pointer;
	}
	.complate{
		background: #41B883;
	}
	.fail{
		background: #FF7F5F;
	}
</style>
```
最后就是重头戏javascript了，
```javascript
export default{
		data () {
			return {
				dataList: [
					{
						title: '完成VueJs学习',
						status: 1,
						time: ''
					},
					{
						title: '完成Es6学习',
						status: 2,
						time: ''
					},
					{
						title: '完成VueJs TodoList Demo',
						status: 3,
						time: ''
					}
				],
				msg: ''
			}
		},
		filters: {
			setStatusAttr: function (value){
				// console.log(value)
				var arr = {"1": "正在进行中", "2": "已经完成","3": "放弃了"};
				return arr[value];
			},
			setTimeAttr (value) {
				if(value == '') return '';
				var date = new Date(value);
				return date.getFullYear()+'/'+(date.getMonth()+1)+ '/' + date.getDate()+' '+ date.getHours() + ":" + date.getMinutes() + ':' + date.getSeconds();
			}
		},
		methods: {
			addItem(){
				if(this.msg == '') alert('任务为空，我无能为力啊-_-');
				var temp_item = {
					title: this.msg,
					status: 1,
					time:''
				};
				this.dataList.unshift(temp_item)
				this.msg = ''
			},
			complate(index){
				this.dataList[index].time = this.dataList[index].status == 1 ? new Date().getTime() : '';
				this.dataList[index].status = this.dataList[index].status == 3 ? 1 : 2;
			},
			fail(index){
				this.dataList[index].status = 3;
			},
			deleteItem(index){
				this.dataList.splice(index, 1);
			},
			btn(status){
				// console.log(status)
				var status_arr = ['','完成','关闭','启用'];
				return status_arr[status];
			}
		}
	}
```
>值得注意的是，在这里我用了两个filter，第一个是用来转换目前状态的中文值，第二个是用来格式化时间的。过滤器是一个通过输入数据，能够及时对数据进行处理并返回一个数据结果的简单函数。简单点就是转换数据成我们需要的格式。

#### 指令说明

 - @keyup.enter 	等同于 v-on:keyup.enter 监听enter键事件
 - v-on:click 			监听点击事件
 - v-show 				确定是否显示 他的接收一个bool值，
 - v-for 					遍历数据树春demo
 - @click 				等同于 v-on:click 监听点击事件
 - v-model 				绑定一个数据

vue事件处理文档 [vue事件处理中文文档](http://cn.vuejs.org/v2/guide/events.html)
