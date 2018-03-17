---
title: 正则表达式解析一个完整的url
date: 2018-03-17 19:46:10
tags:
  - web前端
  - js
  - javascript
category:
  - 前端开发
---

> 题目：解析一个完整的url,返回Object包含域与window.location相同

答案：
```js
/**
 * 解析一个url并生成window.location对象中包含的域
 * location:
 * {
 *      href: '包含完整的url',
 *      origin: '包含协议到pathname之前的内容',
 *      protocol: 'url使用的协议，包含末尾的:',
 *      username: '用户名', // 暂时不支持
 *      password: '密码',  // 暂时不支持
 *      host: '完整主机名，包含:和端口',
 *      hostname: '主机名，不包含端口'
 *      port: '端口号',
 *      pathname: '服务器上访问资源的路径/开头',
 *      search: 'query string，?开头',
 *      hash: '#开头的fragment identifier'
 * }
 *
 * @param {string} url 需要解析的url
 * @return {Object} 包含url信息的对象
 */


 function parseUrl(url) {
    var result = {};
    var keys = ['href', 'origin', 'protocol', 'host',
                'hostname', 'port', 'pathname', 'search', 'hash'];
    var i, len;
    var regexp = /(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/;

    var match = regexp.exec(url);
	 console.info('match=', match);

    if (match) {
        for (i = keys.length - 1; i >= 0; --i) {
            result[keys[i]] = match[i] ? match[i] : '';
        }
    }
	 console.info('result=', result);
    return result;
}

parseUrl("http://test.com:8080?name=1&password=2#page1");
```
<!--more-->
结果：
```js
match=[
  'http://test.com:8080?name=1&password=2#page1',
  'http://test.com:8080',
  'http:',
  'test.com:8080',
  'test.com',
  ':8080',
  undefined,
  '?name=1&password=2',
  '#page1',
  index: 0,
  input: 'http://test.com:8080?name=1&password=2#page1'
]

result={
  hash: '#page1',
  search: '?name=1&password=2',
  pathname: '',
  port: ':8080',
  hostname: 'test.com',
  host: 'test.com:8080',
  protocol: 'http:',
  origin: 'http://test.com:8080',
  href: 'http://test.com:8080?name=1&password=2#page1'
}
```
没错，一眼就看到了难以理解的是那段正则表达式：
```js
/(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/
```
刚好最近看了精通正则表达式一书（的20%，哈哈看不完），刚好可以练练手了

1. 匹配的数组长度为11个，为什么
2. 每一个是怎么匹配来的
```js
首先，在分析之前，先给大家补补基础概念，知道的就跳过
?:  匹配0个或一个
*   匹配0个或多个,
+:  一次或多次，至少出现一次
.*  贪婪匹配：在满足匹配时，匹配尽可能长的字符串，默认情况下，采用贪婪匹配（没有问号）

// 非贪婪匹配：在满足匹配时，匹配尽可能短的字符串，使用?来表示非贪婪匹配
?  非贪婪，最小匹配（重点，后面会用到）
*? 重复任意次，但尽可能少重复  
+? 重复1次或更多次，但尽可能少重复  
?? 重复0次或1次，但尽可能少重复  
{n,m}? 重复n到m次，但尽可能少重复  
{n,}? 重复n次以上，但尽可能少重复  

//环视
'jeffs'.replace(/(?<=jeff)(?=s)/i, '"')
//顺序环视和逆向环视,?= 匹配的目标位置后紧跟s,匹配的目标位置前紧邻jeff  jeff目标s，结果输出：jeff"s

[^]: ^表示非 //示例：[^u]

//[]里面的元字符只是普通字符
/03[-./]22/.test('03-22') 结果输出：true

//() ：标记一个子表达式的开始和结束位置。子表达式可以获取供以后使用
```

进入正题，匹配的数组长度为11个，为什么？
因为匹配结果是按照()的个数和顺序决定的，重点是前面9个
最后两个[index: 0,input: 'http://test.com:8080?name=1&password=2#page1']是regexp.exec函数自带返回的
所以上面的表达式可以拆分为如下子表达式：

```js
(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?
(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))
([^:]+:)
(([^:\/\?#]+)(:\d+)?)
([^:\/\?#]+)
(:\d+)?
(\/[^?#]*)?
(\?[^#]*)?
(#.*)?

```
具体分析见下图：
![示意图](https://user-gold-cdn.xitu.io/2018/3/16/1622e2c97289603d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
思考题：
正则表达式分割之千分符格式：
```js
213435324.099.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
```
