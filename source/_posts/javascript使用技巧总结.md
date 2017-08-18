layout: '[layout]'
title: javascript使用技巧总结
date: 2017-02-06 21:14:26
tags:
	- js使用技巧
	- js
---
 >JavaScript技巧，偶尔更新。

### 计算数组的极值
```javascript
function smallest(array){                         
  return Math.min.apply(Math, array);             
}                                                 

function largest(array){                          
  return Math.max.apply(Math, array);             
}  

smallest([0, 1, 2.2, 3.3]); // 0

largest([0, 1, 2.2, 3.3]); // 3.3
```
<!--more-->
### 迭代arguments
```javascript
function useCall() {
    [].forEach.call(arguments, function(val, key) {
        console.log(key, val)
    });
}

useCall('Bob Dylan', 'Bob Marley', 'Steve Vai');

//0 "Bob Dylan"
//1 "Bob Marley"
//2 "Steve Vai"
```
### 将arguments转为数组
```javascript
function transformToArray(arg){
  return Array.prototype.slice.call(arg);
}
Array.prototype.forEach()第二个参数
参考：MDN
var coder = {
  name: 'Shock',
  friends: ['Rocky', 'Bob'],
  logHiToFriends:function(){
    'use static'
    this.friends.forEach(function(friend){
      console.log(this.name+ ' say hi to '+ friend);
    },this)//注意这个this，如果不添加这个参数，你可以猜测会发生什么
  }
}
使用IIFE解决循环问题
unexpected:

var funcs = [];

for (var i = 0; i < 10; i++) {
    funcs.push(function() { console.log(i); });
}

funcs.forEach(function(func) {
    func();     // 输出数值 "10" 十次
});
expected:

var funcs = [];

for (var i = 0; i < 10; i++) {
    funcs.push((function(value) {
        return function() {
            console.log(value);
        }
    }(i)));
}

funcs.forEach(function(func) {
    func();     // 从 0 到 9 依次输出
});
使用let解决循环问题
这是let独有的特性(参考)

var funcs = [];

for (let i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

funcs.forEach(function(func) {
    func();     // 从 0 到 9 依次输出
})
```
### 判断两个小数是否相等
//因为javascript数字通常被输入为十进制的浮点数，但内部却被表示为二进制，所以计算结果会有偏差：

0.1 + 0.2 //0.30000000000000004

0.1 + 1 - 1 //0.10000000000000009

0.1 + 0.2 === 0.3 //false

//所以我们不应该直接比较非整数，而是取其上限，把误差计算进去
//这样一个上限称为 machine epsilon，双精度的标准epsilon值是2^-53
```javascript
const EPSILON = Math.pow(2, -53); //1.1102230246251565e-16

function epsEqu(x,y) {
  return Math.abs(x - y) < EPSILON;
}

epsEqu(0.1+0.2, 0.3) //true
Math.round函数的坑
Math.round(-3.2) //-3

Math.round(-3.5) //-3(这个就奇怪了)

Math.round(-3.8) //-4

//其实，Math.round(x)等同于：
Math.floor(x + 0.5)
巧用||和&&
var bar = $ || 233;
//如果$存在，则把$赋值给bar；如果$不存在，则把233赋值给bar

$ === undefined && (window.$ =  jQuery);  
//如果$不存在,则把jQuery赋值给window.$；如果$存在，则不执行后面的表达式
使用break + labels退出循环
function findNumber(arr){
  loop:{
    for (var i = 0; i < arr.length; i++) {
      if(arr[i]%2 == 0){
        break loop;//表示退出loop区块
      }
    }
    console.log(arr);//这句代码是不会执行的，如果上面只是break，for循环之后的代码还是会执行
  }
}

findNumber([1,3,5,6]);
```
### 简单实现合并对象
```javascript
function merge(root){
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (object.hasOwnProperty(key)) {
        root[key] = arguments[i][key];
      }
    }
  }
  return root;
}

var merged = merge(
  {name:'Shock'},
  {city:'Shenzhen'}
)//{name:'Shock',city:'Shenzhen'}
理解map和parseInt
['1','2','3'].map(parseInt);
//[1, NaN, NaN]

['1','2','3'].map(function(x){return parseInt(x,10)});
//[1, 2, 3]
```
### 上传图片预览功能
```html
<input type="file" name="file" onchange="showPreview(this)" />
<img id="portrait" src="" width="70" height="75">
```
```javascript
function showPreview(source) {
  var file = source.files[0];
  if(window.FileReader) {
      var fr = new FileReader();
      fr.onloadend = function(e) {
        document.getElementById("portrait").src = e.target.result;
      };
      fr.readAsDataURL(file);
  }
}
```
### 微信内部修改document.title
```javascript
function setTitle(title) {
  document.title = title;
  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
    var i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(function(){
        i.remove();
      }, 9)
    }
    document.body.appendChild(i);
  }
}

setTitle("要修改的标题");
```
### 快速克隆一个对象
```javascript
var Rocker = function(name, age){
  this.name = name,
  this.age = age
}

var shock = new Rocker('Shock', 24);

shock.age = 99;

var cloneShock = Object.create(shock);

cloneShock.name // "Shock"
cloneShock.age // 99

//在不支持ES5的浏览器下，实现create方法如下：

Object.create = Object.create || function(obj){
  var F = function(){};
  F.prototype = obj;

  return new F();
}
```
### 判断一个值是否是对象
```javascript
function isObject(value){
  return value === Object(value);
}

isObject({}); // true
isObject(123);  // false
```
### 为构造器模拟apply功能
```javascript
if(!Function.prototype.construct){
  Function.prototype.construct = function(argArray){
    if(!Array.isArray(argArray)){
      throw new TypeError("Arguments must be an array");
    }
    var constr = this;
    var nullaryFunc = Function.prototype.bind.apply(
      constr,[null].concat(argArray));
    return new nullaryFunc();
  }
}

//使用:
Date.construct([2017, 02, 14]); //  Tue Mar 14 2017 00:00:00 GMT+0800 (CST)

```

数组去重

我们这里不考虑数组上的一个自带的过滤算法，比如map、filter等方法！数组去重的关键是需要一个中间数组来存数组来帮助实现数组去重！

方法一：
```javascript
    var arr = [1,2,3,1,1,1,1];
    function toHeavy(array){
        //这是一个缓存对象，用来实现过滤到重复的数据
        var cache = {};
        //定义一个中间数组，用来实现当容器
        var cacheArr = [];
        for(var i = 0,len = array.length;i<len;i++){
            if(!cache[array[i]]){
                cacheArr.push(array[i]);
                cache[array[i]] = array[i];
            };
        };
        return cacheArr;
    };
    arr = toHeavy(arr);//arr ==  [1,2,3]
```
方法二：
```javascript
//其实思想跟第一个差不多
    var arr = [1,2,3,1,1,1,1,1,1];
    function toHeavy(array){
        var cache = [];
        for(var i = 0,len = array.length;i<len;i++){
            //用闭包，防止isHeavy向外部暴露，当然如果用es6的话，可以用let对isHeavy进行声明也能达到同样的目的
            //因为js中没有块级作用域
            (function(){
                var isHeavy = false;
                for(var j = 0,_len = cache.length;j<_len;j++){
                    if(cache[j] == array[i]){
                        isHeavy = true;
                        break;
                    };
                };
                if(!isHeavy){
                    //如果不是重复的，那么就执行把当前值推送的cache里面
                    cache.push(array[i]);
                };
            })();
        };
        return cache;
    };

    arr = toHeavy(arr);
```
最后说一句，现实中的数据肯定不会这么简单，可能会是一个稍微复杂的数据，要给这些数组去重你也不要被吓住，其实原理是一样的，只是你被迷惑了而已！

在一个数组中随机抽取一部分值

这个算法的关键要使用Math.random，不说了直接上代码:
```javascript
	var arr = ['小明','小红','小陈','小于','小兰','小法','小p','小张','小镇','小王','傻逼','怂逼'];

    function getArr(num,array){
        //num表示要去多少个，它不能大于要取的那个数组的最大长度，如果超过了那么就等于它的长度
        var aLength = array.length;
        if(num>=aLength){
            num = aLength;
        };
        var cacheArr = [];
        //我们用一个数组保存原来的数组
        //记住千万能直接赋值，因为数组是一个引用，这样不能保持原来的数组
        //这里也可以用originArr = array.slice()
        var originArr = (function(){
            var arr = [];
            for(var i = 0,len = array.length;i<len;i++){
                arr.push(array[i]);
            };
            return arr;
        })();
        for(var i = 0;i<num;i++){
            //array.length不能写成上面的aLength，因为aLength是固定的值，而array.length随着array的改变是自动更新的
            //Math.random() * array.length得到的是一个介于长度和零之间的一个值，包括0但不包含长度值
            //我们算出的是一个浮点值，所以我们必须把它转化成整数
            //因为不能超过最大长度值，所以应该向下取整
            var _index = Math.floor(Math.random() * array.length);
            cacheArr.push(array[_index]);
            //记住一定，取出来之后，一定删除原来位置上的数组值
            //要不然数组更新不了
            array.splice(_index,1);
        };
        //取回原来的数组
        array = originArr;
        console.log(array);
        return cacheArr;
    };
    var brr = getArr(5,arr);
```
得到某个区间的字母组成的数组

这里主要应用两个方法，一个字符串的charCodeAt和String上的一个静态方法fromCharCode。其思想主要是：先得到这个区间开头字母和结束字母的数字表示，然后就可以在这个区间内做一个循环，并且得到这个区间字母的数字表示，最后把数字传唤成字母依次push到数组里面返回。直接上代码：
```javascript
    function getArrForAlphabet(startLetter,endLetter){
        //var regExp = /^[a-zA-Z]$/gi;
        var regExp = new RegExp("^[a-zA-Z]$");
        if(!regExp.test(startLetter) || !regExp.test(endLetter)){
            //console.log(regExp.test(startLetter));
            //console.log(regExp.test(endLetter));
            console.log('请传入字母！');
            return false;
        };
        //i是得到开始字母的数字表示，j得到结束字母的数字表示
        var i = startLetter.charCodeAt(0),j = endLetter.charCodeAt(0);
        //定义一个数组用于取出将来的字母
        var arr = [];
        //这里取<=符号是因为要取出结束的字母
        for(;i<=j;i++){ 
            //fromCharCode是String上的一个静态方法，用于将一个数字转换成对应的字母
            var letter = String.fromCharCode(i);
            arr.push(letter);
        };
        //记得最后返回arr
        return arr;
    };
```