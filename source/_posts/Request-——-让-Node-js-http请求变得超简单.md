---
title: Request —— 让 Node.js http请求变得超简单
date: 2017-11-23 16:22:59
tags:
  - node
  - request
category: 前端开发
---
Request —— 让 Node.js http请求变得超简单

Node.js的模块——request。有了这个模块，http请求变的超简单。(转载自http://segmentfault.com/a/1190000000385867)
使用超简单

Request使用超简单，同时支持https和重定向。

```javascript
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 打印google首页
  }
})
```
<!--more-->
 ### 流

任何响应都可以输出到文件流。
```javascript
request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
```
反过来，也可以将文件传给PUT或POST请求。未提供header的情况下，会检测文件后缀名，在PUT请求中设置相应的content-type。
```javascript
fs.createReadStream('file.json').pipe(request.put('http://mysite.com/obj.json'))
```
请求也可以pipe给自己。这种情况下会保留原content-type和content-length。
```javascript
request.get('http://google.com/img.png').pipe(request.put('http://mysite.com/img.png'))
```
### 表单
request支持application/x-www-form-urlencoded和multipart/form-data实现表单上传。

x-www-form-urlencoded很简单：

request.post('http://service.com/upload', {form:{key:'value'}})
或者：

request.post('http://service.com/upload').form({key:'value'})
使用multipart/form-data不用操心设置header之类的琐事，request会帮你解决。
```javascript
var r = request.post('http://service.com/upload')
var form = r.form()
form.append('my_field', 'my_value')
form.append('my_buffer', new Buffer([1, 2, 3]))
form.append('my_file', fs.createReadStream(path.join(__dirname, 'doodle.png'))
form.append('remote_file', request('http://google.com/doodle.png'))
```
### HTTP认证
```javascript
request.get('http://some.server.com/').auth('username', 'password', false);
```
 或
```javascript
request.get('http://some.server.com/', {
  'auth': {
    'user': 'username',
    'pass': 'password',
    'sendImmediately': false
  }
});
```
sendImmediately，默认为真，发送一个基本的认证header。设为false之后，收到401会重试（服务器的401响应必须包含WWW-Authenticate指定认证方法）。

sendImmediately为真时支持Digest认证。

### OAuth登录
```javascript
// Twitter OAuth
var qs = require('querystring')
  , oauth =
    { callback: 'http://mysite.com/callback/'
    , consumer_key: CONSUMER_KEY
    , consumer_secret: CONSUMER_SECRET
    }
  , url = 'https://api.twitter.com/oauth/request_token'
  ;
request.post({url:url, oauth:oauth}, function (e, r, body) {
  // Ideally, you would take the body in the response
  // and construct a URL that a user clicks on (like a sign in button).
  // The verifier is only available in the response after a user has
  // verified with twitter that they are authorizing your app.
  var access_token = qs.parse(body)
    , oauth =
      { consumer_key: CONSUMER_KEY
      , consumer_secret: CONSUMER_SECRET
      , token: access_token.oauth_token
      , verifier: access_token.oauth_verifier
      }
    , url = 'https://api.twitter.com/oauth/access_token'
    ;
  request.post({url:url, oauth:oauth}, function (e, r, body) {
    var perm_token = qs.parse(body)
      , oauth =
        { consumer_key: CONSUMER_KEY
        , consumer_secret: CONSUMER_SECRET
        , token: perm_token.oauth_token
        , token_secret: perm_token.oauth_token_secret
        }
      , url = 'https://api.twitter.com/1/users/show.json?'
      , params =
        { screen_name: perm_token.screen_name
        , user_id: perm_token.user_id
        }
      ;
    url += qs.stringify(params)
    request.get({url:url, oauth:oauth, json:true}, function (e, r, user) {
      console.log(user)
    })
  })
})
```
### 定制HTTP header

User-Agent之类可以在options对象中设置。在下面的例子中，我们调用github API找出某仓库的收藏数和派生数。我们使用了定制的User-Agent和https.
```javascript
var request = require('request');

var options = {
    url: 'https://api.github.com/repos/mikeal/request',
    headers: {
        'User-Agent': 'request'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.stargazers_count + " Stars");
        console.log(info.forks_count + " Forks");
    }
}

request(options, callback);
```
### cookies

默认情况下，cookies是禁用的。在defaults或options将jar设为true，使后续的请求都使用cookie.
```javascript
var request = request.defaults({jar: true})
request('http://www.google.com', function () {
  request('http://images.google.com')
})
```
通过创建request.jar()的新实例，可以使用定制的cookie，而不是request全局的cookie jar。
```javascript
var j = request.jar()
var request = request.defaults({jar:j})
request('http://www.google.com', function () {
  request('http://images.google.com')
})
```
或者
```javascript
var j = request.jar()
var cookie = request.cookie('your_cookie_here')
j.setCookie(cookie, uri, function (err, cookie){})
request({url: 'http://www.google.com', jar: j}, function () {
  request('http://images.google.com')
})
```
注意，setCookie至少需要三个参数，最后一个是回调函数。
