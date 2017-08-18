layout: '[layout]'
title: 初学javascript中Array的各种方法
date: 2017-01-23 11:33:18
tags:  
	- js 
	- 前端
	- array
---
Array数组在JavaScript中的地位不言而喻，也是JavaScript中最常用的一种对象。

##concat()
连接两个或更多的数组，并返回结果。
```javascript
var arr1 = [1,2,3,4];
var arr2 = ['a','b','c','d'];
console.log(arr1.concat(arr2)); //[1, 2, 3, 4, "a", "b", "c", "d"]
```
<!-- more -->
##join()
把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
```javascript
var arr = [1,2,3,4,5,6,7,8,9,'a','b','c']; 
console.log(arr.join('-'));//1-2-3-4-5-6-7-8-9-a-b-c
```
##pop()
删除并返回数组的最后一个元素
```javascript
var arr  = [1,2,3,4,5,6,7,8,9,'a','b','c']; 
console.log(arr.pop());//c
console.log(arr);//[1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b"]
```
##push()
向数组的末尾添加一个或更多元素，并返回新的长度。
```
var arr =  [1,2,3,4,5,6,7,8,9,'a','b','c']; 
console.log(arr.push(10));//[1,2,3,4,5,6,7,8,9,'a','b','c',10]
```
##reverse()
颠倒数组中元素的顺序。
```javascript
var arr =  [1,2,3,4,5,6,7,8,9,'a','b','c']; 
console.log(arr.reverse());//["c", "b", "a", 9, 8, 7, 6, 5, 4, 3, 2, 1]
```
##shift()
删除并返回数组的第一个元素
```javascript
var arr =  [1,2,3,4,5,6,7,8,9,'a','b','c']; 
console.log(arr.shift());// 1;
console.log(arr);//2,3,4,5,6,7,8,9,'a','b','c'
```
##slice(start,end)
从某个已有的数组返回选定的元素
>start	必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
end	可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

```javascript
var arr = [1,2,3,4,5];  
 console.log(arr.slice(1));//[2, 3, 4, 5]
console.log( arr.slice(1,3));//[2, 3])
```

##sort()
对数组的元素进行排序
````javascript
var arr = [1,5,3,7,6,5,'a','f','c','b','g','a'];
arr.sort()
//[1, 3, 5, 5, 6, 7, "a", "a", "b", "c", "f", "g"]
```
##splice()
删除元素，并向数组添加新元素。
````javascript
var arr = [1,5,3,7,6,5,'a','f','c','b','g','a'];
arr.splice(1,1,'z','w')//[5]
console.log(arr)//[1, "z", "w", 3, 7, 6, 5, "a", "f", "c", "b", "g", "a"]
```

toString()
把数组转换为字符串，并返回结果。
````javascript
var arr = [1,5,3,7,6,5,'a','f','c','b','g','a'];
arr.toString()
//"1,5,3,7,6,5,a,f,c,b,g,a"
```
toLocaleString()
把数组转换为本地数组，并返回结果。
````javascript
var arr = [1,5,3,7,6,5,'a','f','c','b','g','a'];
arr.toLocaleString()
//"1,5,3,7,6,5,a,f,c,b,g,a"
```
unshift()
向数组的开头添加一个或更多元素，并返回新的长度。
````javascript
var arr = [1,5,3,7,6,5,'a','f','c','b','g','a'];
arr.unshift('aa','bb','cc')
//15
console.log(arr)
//["aa", "bb", "cc", 1, 5, 3, 7, 6, 5, "a", "f", "c", "b", "g", "a"]
```
valueOf()
返回数组对象的原始值
>valueOf() 方法通常由 JavaScript 在后台自动调用，并不显式地出现在代码中。
