layout: '[layout]'
title: 百度前端学院js系列-第二天详解
date: 2017-04-01 23:13:37
tags:
	- 百度前端学院
	- js
---
任务二的内容是这样的：
任务描述
参考以下示例代码，页面加载后，将提供的空气质量数据数组，按照某种逻辑（比如空气质量大于60）进行过滤筛选，最后将符合条件的数据按照一定的格式要求显示在网页上。
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
  </head>
<body>

  <h3>污染城市列表</h3>
  <ul id="aqi-list">
<!--   
    <li>第一名：福州（样例），10</li>
      <li>第二名：福州（样例），10</li> -->
  </ul>

<script type="text/javascript">

var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

(function () {

  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  */

})();

</script>
</body>
</html>
```
<!-- more -->

先说一下解题思路：
1、筛选出值大于60的城市赋值给一个新的数组。
2、对这个新的数组进行由大到小的排序。
3、动态创建li标签并打印名次和城市及其空气质量值。
结果如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
  <style>
  li{list-style: none;}
  </style>
  </head>
<body>

  <h3>污染城市列表</h3>
  <ul id="aqi-list">
<!--   
    <li>第一名：福州（样例），10</li>
      <li>第二名：福州（样例），10</li> -->
  </ul>

<script type="text/javascript">

var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

(function () {

  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  */
  var aqiul=document.getElementById('aqi-list');
  var b=aqiData.filter(function(a){return a[1]>60;});//选择出空气质量大于60的城市，赋值给数组b
  //对空气质量指数由大到小排序
     b.sort(function(a,c){
      return c[1]-a[1];
     });
  (function wirte(){    //输出
    for(var i=0;i<b.length;i++){
      var r;
      var li=document.createElement('li');
      aqiul.append(li);
      li.innerHTML="第"+(i+1)+"名："+b[i];
    }
  })();
})();

</script>
</body>
</html>
```
根据上边的代码和解题思路总结：
1、筛选出值大于60的城市赋值给一个新的数组：
```javascript
var b=aqiData.filter(function(a){return a[1]>60;});//选择出空气质量大于60的城市，赋值给数组b
//ECMAScript5中的数组方法filter()
//filter()方法返回的数组元素是调用数组的一个子集，传递的函数是用来逻辑判定的：该函数返回true或false；如果返回值为true或能转化为true的值，那么传递给判定函数的元素就是这个子集的成员，他将被添加到一个作为返回值得函数中。
```
2、对这个新的数组进行由大到小的排序：
```javascript
b.sort(function(a,c){
      return c[1]-a[1];
     });//对空气质量指数由大到小排序
     //javascript数组方法Array.sort()方法将中的元素排序并返回排序后的数组。当不带参数调用sort()时，数组数组元素以字母表顺序排序（如有必要将临时转化为字符串进行比较）。为了按照其他方式而非字母表顺序进行排序，必须给sort（）传递一个比较函数。
```
3、动态创建li标签并打印名次和城市及其空气质量值：
```javascript
(function wirte(){    //输出
    for(var i=0;i<b.length;i++){
      var r;
      var li=document.createElement('li');
      aqiul.append(li);
      li.innerHTML="第"+(i+1)+"名："+b[i];
    }
  })();
  //这里不是今天要写的重要内容，暂不做赘述。
```
在这里总结一下JS的数组方法：
### 1、join()
>Array.join()方法将数组中所有元素都转化为字符串并连接在一起，返回最后剩成的字符串。Array.join()方法是String.split()方法的逆向操作，后者是将字符串分割为若干块来创建一个数组。

```javascript
var a=[1,2,3];//创建一个包含三个元素的数组
a.join();//=>"1,2,3"
a.join(" ");//=>"1 2 3"
a.join("");//=>"123"
var b=new Array(10);//长度为十的空数组
b.join('-');//=>'---------':9个-组成的字符串
```
### 2、reverse()
>Array.reverse()方法将数组中的元素颠倒顺序，返回逆向数组。他不重新创建一个新的数组，只是在原来的数组里将元素重新排列。
```javascript
var a=[1,2,3];
a.reverse().join();//=>"3,2,1"
```
### 3、sort()
>javascript数组方法Array.sort()方法将中的元素排序并返回排序后的数组。当不带参数调用sort()时，数组数组元素以字母表顺序排序（如有必要将临时转化为字符串进行比较）。为了按照其他方式而非字母表顺序进行排序，必须给sort()传递一个比较函数。
```javascript
var a=new Array("b","c","a");
a.sort();
var s=a.join(",");//s=="a,b,c"
//默认方法
//由大到小排序，可以参照上面解题答案中。
```
### 4、concat()
>Array.concat()方法创建并返回一个新数组，他的元素包括原始数组的元素和concat()的所有参数。若参数是数组，则链接的事数组元素。
```javascript
var a=[1,2,3];
a.concat(4,5);//返回[1,2,3,4,5]
a.concat([4,5]);//返回[1,2,3,4,5]
a.concat([4,5],[6,7]);//返回[1,2,3,4,5,6,7]
a.concat(4,[5,[6,7]]);//返回[1,2,3,4,5,[6,7]]
```
### 5、slice()
>Array.slice()方法返回指定数组的一个片段或一个子数组，他的两个参数分别是指定的片段的开始和介绍位置。返回的数组包含第一个参数指定的位置到第二参数的指定位置间所有元素但不包含第二个参数所指的位置的元素，如果只有一个参数，则返回从开始位置到最后一个元素。如果参数是负数，表示相对于数组中最后一个元素的位置，即-1指定了最后一个元素，-3指定倒数第三个元素。注意，slice()不会修改调用的数组。
```javascript
var a=[1,2,3,4,5];
a.slice(0,3);//返回[1,2,3]
a.slice(3);//返回[4,5]
a.slice(1,-1);//返回[2,3,4]
a.slice(-3,-2);//返回[3]
```
### 6、splice()
>Array.splice()方法是在数组中插入或删除元素的通用方法。splice()会修改调用的数组。splice()的第一个参数指定的插入或（和）删除的起始位置，第二个参数指定的应删除的个数，若第二个参数为空，则从起始位置到数组末尾。splice()前两个参数指定了需要删除的数组元素，紧随其后的若干个参数为需要插入到数组的元素，从第一个参数指定的位置开始插入。
```javascript
var a=[1,2,3,4,5,6,7,8];
a.splice(4);//返回[5,6,7,8],a是[1,2,3,4]
a.splice(1,2);//返回[2,3],a是[1,4]
a.splice(1,1);//返回[4],a是[1]
//
var a=[1,2,3,4,5,6,7,8];
a.splice(1,0,"a","c",[1,2]);//返回[],a是[1,2,'a','c',[1,2],3,4,5,6,7,8]
```
### 7、push()和pop()
>push()和pop()方法允许将数组当做栈来使用，push()方法在数组的尾部添加一个或多个元素，并返回数组新的长度。pop()删除最后一个元素，减少数组长度，并返回它删除的值。两个方法都修改并替换原始数组。
```javascript
var a[];
a.push(1,2);//返回2，a:[1,2]
a.pop();//返回2，a:[1]
a.push([1,2]);//返回2，a:[1,[1,2]]
a.pop();//返回[1,2]，a:[1]
```
### 9、toString()和toLocaleString()
>toString()方法将数组每个元素转化为字符并输出用逗号分隔的字符串列表，输出不包括方括号和其他形式的包裹数组值得分隔符。toLocaleString()是toString()的本地化版本。
```javascript
[1,2,3].toString() //生成'1,2,3'
["a","b",3].toString() //生成'a,b,3'
[1,[2,3]].toString() //生成'1,2,3'
```
### ECMAScript 5中的数组方法：
#### 1、forEach()
>forEach()方法从头至尾遍历数组，并为每个元素调用指定的函数。
```javascript
var a=[1,2,3,4,5];
var sum=0;
a.forEach(function(value){sum+=value;});//将每个元素累加到sum
sum //=>15
a.forEach(function(v,i,a){a[i]=v+1;});//元素自加1
a //=>[2,3,4,5,6]
```
#### 2、map()
>map()方法将调用的数组每个元素传递给指定的函数，并返回一个数组，它包含该函数的返回值。
```javascript
a=[1,2,3];
b=a.map(function(x){return x*x;});
```
#### 3、filter()
>filter()方法返回的数组元素是调用数组的一个子集，传递的函数是用来逻辑判定的：该函数返回true或false；如果返回值为true或能转化为true的值，那么传递给判定函数的元素就是这个子集的成员，他将被添加到一个作为返回值得函数中。
```javascript
a=[5,4,3,2,1];
b=a.filter(function(x){return x<3});//[2,1]
```
#### 4、every()和some()
>every()和some()方法是数组的逻辑判定：他们对数组元素应用指定的函数进行判定，返回true或false。every()方法只有说有元素返回true时，返回true，相当于&；some()方法只有所有元素返回false时返回false，相当于|。
```javascript
a=[1,2,3,4,5];
a.every(function(x){return x<10;});//=>true：全都小于10
a.every(function(x){return x%2===0;});//=>flase:不是所有的元素都是偶数
a.some(function(x){return x%2===0;});//=>true：a里面含有偶数
a.some(function(x){return x>10;});//=>false:全都不大于10
```
#### 5、reduce()和reduceRight()
>reduce()和reduceRight()方法使用指定的函数将数组元素进行组合，生成单个值。reduce()需要两个参数，第一个是其使用的方法，第二个是可选参数，是一个传递给函数的初始值，当第二个参数为空时，意味着第一次调用函数就使用了第一个和第二个数组元素作为其第一个第二个参数，按照数组索引从低到高。reduceRight()的工作原理一样，不同的是它按照数组索引由高到低处理数组，即从数组右侧开始。
```javascript
var a=[1,2,3,4,5];
var sum=a.reduce(function(x,y){return x+y},0);//数组求和
var p=a.reduce(function(x,y){return x*y},1);//数组求积
var max=a.reduce(function(x){return (x>y)?x:y;});//求最大值
```
#### 6、indexOf()和lastIndexOf()
>indexOf()和lastIndexOf()搜索整个数组中具有给定值得元素，返回找到的第一个元素的索引或者没有找到就返回-1。indexOF()是从头至尾，而lastIndexOf()则反向搜索。indexOf()和lastIndexOf()方法不接受一个函数作为其参数。第一个参数是需要搜索的值，第二个参数是可选的，他指定数组中一个索引，从哪开始搜索。若第二个参数为负，他代表相对数组的末尾元素的偏移量。
```javascript
a=[0,1,2,1,0];
a.indexOf(1);//=>1 a[1]=1
a.lastIndexOf(1);//=>3 a[3]=1
a.indexOf(3);//=>-1
//
//在数组中查找所有的x，并返回一个包含匹配索引ed数组
function findall(a,x){
    var results=[];//将返回的数组
    len=a.length;//待搜索数组的长度
    pos=0;//开始搜索的位置
    while(pos<length){
    pos=a.indexOf(x,pos);
    if(pos===-1) break;
    results.push(pos);
    pos+=1;
    }
    return results;
}
```