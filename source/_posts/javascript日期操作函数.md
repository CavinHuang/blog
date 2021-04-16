---
title: javascript日期操作函数
tags:
  - javascript
  - date
category:
  - frontend
  - js
abbrlink: 6f58516
date: 2017-03-15 09:49:20
---

> 函数目录
getFormatDateStr 获得指定日期格式的字符串；
getDayPrevAfter 获得n天前/后的日期；
<!--more-->
formatDateWithTimeZone 格式化日期带时区，ISO 8601；
countDownBySecond 倒计时；
monthSize 获得指定日期所在月的天数；
getCalendarMonth 获得指定日期所在月的第一周到第四/五周的数据组合；
getOneDateWeekIndex 获得指定的某天所在该月的第几周，下标从0开始；
下面是详细的说明：

### getFormatDateStr
```javascript
/**
 * [zeroPadding 小于10的数字补0，必填]
 * @param  {[Int]} value [description]
 * @return {[String]}       [description]
 */
export function zeroPadding(value){
  return value < 10 ? `0${value}` : value;
}

/**
 * [_isDateStrSeparatorCh 判断日期格式字符串的分隔符是否是中文]
 * @param  {[String]} str [必填]
 * @return {[String]}     [分隔符]
 */
function _getDateStrSeparator(str, startIndex, endIndex) {
  startIndex = startIndex ? startIndex : 4;
  endIndex = endIndex ? endIndex : 5;
  let separator = str.slice(startIndex, endIndex);
  if (separator === '年' || separator === '月' ) {
    separator = 'Ch';
  }
  return separator;
}

/**
 * [_isDateStrSeparatorCh 判断日期格式字符串的分隔符是否是中文]
 * @param  {[String]} str [必填]
 * @return {[String]}     [分隔符]
 */
function _isDateStrSeparatorCh(str) {
  if ( str.indexOf('年')!=-1 || str.indexOf('月')!=-1 ) {
    return true;
  }
  return false;
}

/**
 * [getFormatDateStr 获得指定日期格式的字符串]
 * @param  {[String or Date]}  date  [要转换的日期，必填]
 * @param  {[String]}  dateFormatStr     [要转化的目标格式，必填，2016-11-22之间的分隔符可任意，可选项：
 * 'yyyy-mm-dd hh:mm:ss','yyyy/mm/dd hh:mm:ss','yyyy.mm.dd hh:mm:ss','yyyy年mm月dd hh:mm:ss',
 * 'yyyy-mm-dd hh:mm',
 * 'mm-dd hh:mm',
 * 'yyyy-mm-dd',
 * 'mm-dd',
 * 'hh:mm:ss',
 * 'hh:mm'
 * ]
 * @return {[String]}                [时间格式字符串]
 */
export function getFormatDateStr(date, dateFormatStr) {

    if ( !(date instanceof Date) ) {
      if ( date.indexOf('-') != -1 ) {
        date.replace(/\-/g,'/');
      }
          date = new Date(date);
      }

    dateFormatStr = dateFormatStr.toLowerCase();
    if (!dateFormatStr){
      return false;
    }

    let returnStr = '',
        separator = _getDateStrSeparator(dateFormatStr),
        year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
        second = date.getSeconds();

    if ( /^yyyy(.{1})mm(.{1})dd hh:mm:ss$/.test(dateFormatStr) ) {
      if (_isDateStrSeparatorCh(dateFormatStr)) {
        returnStr = `${year}年${zeroPadding(month)}月${zeroPadding(day)}日`;
      } else {
        separator =
        returnStr = `${year}${separator}${zeroPadding(month)}${separator}${zeroPadding(day)}`;
      }
      returnStr += ` ${zeroPadding(hour)}:${zeroPadding(minute)}:${zeroPadding(second)}`;
    } else if ( /^yyyy(.{1})mm(.{1})dd hh:mm$/.test(dateFormatStr) ) {
      if (_isDateStrSeparatorCh(dateFormatStr)) {
        returnStr = `${year}年${zeroPadding(month)}月${zeroPadding(day)}日`;
      } else {
        returnStr = `${year}${separator}${zeroPadding(month)}${separator}${zeroPadding(day)}`;
      }
      returnStr += ` ${zeroPadding(hour)}:${zeroPadding(minute)}`;
    } else if ( /^mm(.{1})dd hh:mm$/.test(dateFormatStr) ) {
      if (_isDateStrSeparatorCh(dateFormatStr)) {
        returnStr = `${zeroPadding(month)}月${zeroPadding(day)}日`;
      } else {
        separator = _getDateStrSeparator(dateFormatStr, 2, 3);
        returnStr = `${zeroPadding(month)}${separator}${zeroPadding(day)}`;
      }
      returnStr += ` ${zeroPadding(hour)}:${zeroPadding(minute)}`;
    } else if ( /^yyyy(.{1})mm(.{1})dd$/.test(dateFormatStr) ) {
      if (_isDateStrSeparatorCh(dateFormatStr)) {
        returnStr = `${year}年${zeroPadding(month)}月${zeroPadding(day)}日`;
      } else {
        returnStr = `${year}${separator}${zeroPadding(month)}${separator}${zeroPadding(day)}`;
      }
    } else if ( /^mm(.{1})dd$/.test(dateFormatStr) ) {
      if (_isDateStrSeparatorCh(dateFormatStr)) {
        returnStr = `${zeroPadding(month)}月${zeroPadding(day)}日`;
      } else {
        separator = _getDateStrSeparator(dateFormatStr, 2, 3);
        returnStr = `${zeroPadding(month)}${separator}${zeroPadding(day)}`;
      }
    } else if ( /^hh:mm:ss$/.test(dateFormatStr) ) {
      returnStr = `${zeroPadding(hour)}:${zeroPadding(minute)}:${zeroPadding(second)}`;
    } else if ( /^hh:mm$/.test(dateFormatStr) ) {
      returnStr = `${zeroPadding(hour)}:${zeroPadding(minute)}`;
    }

  return returnStr;

}
```
### getDayPrevAfter
```javascript
/**
 * [getDayPrevAfter 获得n天前/后的日期]
 * @param  {[String]} date    [日期，非必填参数，表示调用时的时间]
 * @param  {[String]} type    [前一天还是后一天，非必填参数，默认后一天]
 * @param  {[Int]} daysNum [天数，非必填参数，默认一天]
 * @return {[Date]}         [description]
 */
export function getDayPrevAfter(date, type, daysNum) {

  date = date ? date : new Date();
  type = type ? type : 'after';
  daysNum = daysNum ? daysNum : 1;

  if ( !(date instanceof Date) ) {
    if ( date.indexOf('-') != -1 ) {
      date.replace(/\-/g,'/');
    }
    date = new Date(date);
  }

  let returnDate = date;
  if (type === 'prev') {
    returnDate = new Date(date.getTime() - (daysNum * 24 * 60 * 60 * 1000));
  } else if (type === 'after') {
    returnDate = new Date(date.getTime() + (daysNum * 24 * 60 * 60 * 1000));
  }
  return returnDate;

}
```
### formatDateWithTimeZone
```javascript
/**
 * [formatDateWithTimeZone 格式化日期带时区，ISO 8601]
 * @param  {[Date]} date [日期，非必填参数，表示调用时的时间]
 * @return {[String]}     [ISO 8601格式的日期，example: 2016-11-21T14:09:15+08:00]
 */
export function formatDateWithTimeZone(date) {

  date = date ? date : new Date();
  if ( !(date instanceof Date) ) {
    if ( date.indexOf('-') != -1 ) {
      date.replace(/\-/g,'/');
    }
    date = new Date(date);
  }

  let tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num) {
          let norm = Math.abs(Math.floor(num));
          return zeroPadding(norm);
      };
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${dif}${pad(tzo / 60)}:${pad(tzo % 60)}`;

}
```
### countDownBySecond
```javascript
/**
 * [countDownBySecond 倒计时]
 * @param  {[Int]} restSeconds   [剩余秒数，必填]
 * @param  {[Int]} timeInterval   [时间间隔，非必填，默认1000ms]
 * @param  {[Function]} func   [每倒计时一次，就需要执行一次的回调函数名，非必填]
 * @param  {[Function]} endFun [倒计时结束需要执行的函数名，非必填]
 * @return {[null]}        [无返回值]
 */
export function countDownBySecond(restSeconds, timeInterval, func, endCallback) {
    let timer = null;
    let total = restSeconds;
    timeInterval = timeInterval ? timeInterval : 1000;
    timer = setInterval(function() {
        --total;
        if (total <= 0) {
            clearInterval(timer);
            endCallback && endCallback();
        }
        func && func(total);
    }, timeInterval);
}

```
### monthSize
```javascript
/**
 * [monthSize 获得指定日期所在月的天数]
 * @param  {[Date]} oDate [指定的日期，非必填，默认为当天]
 * @return {[Int]}       [总天数]
 */
function monthSize(oDate) {
    oDate = oDate ? oDate : new Date();
    let year = oDate.getFullYear(),
        month = oDate.getMonth(),
        _oDate = new Date();
    _oDate.setFullYear(year);
    _oDate.setMonth(month + 1, 0);
    return _oDate.getDate();
}
```
### getCalendarMonth
```javascript
/**
 * [getCalendarMonth 获得指定日期所在月的第一周到第四/五周的数据组合，形如：
 * [{
    "date": "2016/10/30", //日期字符串
    "dateNum": 30,  //日
    "isCurMonth": false, //是否当前月
    "weekIndex": 0 //是本月的第几周，下标从0开始
  },{
    "date": "2016/10/31",
    "dateNum": 31,
    "isCurMonth": false,
    "weekIndex": 0
  },{
    "date": "2016/11/1",
    "dateNum": 1,
    "day": 2,
    "isCurMonth": true,
    "isToday": false,
    "weekIndex": 0
  }]
  ]
 * @param  {[Date]} param [指定的日期，非必填，默认为当天]
 * @return {[Array]}       [获得指定日期所在月的第一周到第四/五周的数据组合]
 */
export function getCalendarMonth(date) {
    date = date ? date : new Date();
    let y = date.getFullYear();
    let m = date.getMonth();
    let _m;
    let firstDay = new Date(y, m, 1).getDay(); //当月第一天 周期
    let days = monthSize(date);//当月天数
    let prevMonthDays = monthSize(new Date(y, m - 1));//上月天数
    let initPrevDay = prevMonthDays - firstDay;
    let lines = Math.ceil((firstDay + days) / 7);
    _m = new Array(lines * 7);
    let nextMonthDay = 0;

    for (let i = 0; i < _m.length; i++) {
        let weekIndex = parseInt(i / 7);
        if (i < firstDay) {
            let date = ++initPrevDay;
            if (m === 0 && date > 7) {
                _m[i] = {
                    isCurMonth: false,
                    dateNum: date,
                    weekIndex,
                    date: `${y - 1}/${12}/${date}`
                };
            } else {
                _m[i] = {
                    isCurMonth: false,
                    dateNum: date,
                    weekIndex,
                    date: `${y}/${m}/${date}`
                };
            }
        } else if (i >= (firstDay + days)) {
            let date = ++nextMonthDay;

            if (m === 11 && date <= 7) {
                _m[i] = {
                    isCurMonth: false,
                    dateNum: date,
                    weekIndex,
                    date: `${y + 1}/${1}/${date}`
                };
            } else {
                _m[i] = {
                    isCurMonth: false,
                    dateNum: date,
                    weekIndex,
                    date: `${y}/${m + 2}/${date}`
                };
            }
        } else {
            let _date = i - firstDay + 1;
            let today = new Date();
            let today_y = today.getFullYear();
            let today_m = today.getMonth();
            let today_d = today.getDate();
            let isToday = today_y === y && today_m === m && today_d === _date ? true : false;
            _m[i] = {
                dateNum: _date, //日期
                day: i % 7, //周期
                weekIndex,
                isCurMonth: true,
                isToday,
                date: `${y}/${m + 1}/${_date}`
            };
        }
    }
    return _m;
}
```
### getOneDateWeekIndex
```javascript
/**
 * [getOneDateWeekIndex 获得指定的某天所在该月的第几周，下标从0开始]
 * @param  {[Date]} date [指定的日期，非必填，默认为当天]
 * @return {[Int]}      [在该月的第几周]
 */
export function getOneDateWeekIndex(date) {
    date = date ? date : new Date();
    let monthDays = getCalendarMonth(date);
    let dateString = getFormatDateStr(date, '/', true, false, false);
    let returnDate = monthDays.filter(item => {
        return item.date === dateString;
    });
    let weekIndex = returnDate[0].weekIndex;
    return weekIndex ? weekIndex : 0;
}
```
