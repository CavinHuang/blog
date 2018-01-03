---
title: 《剑指offer》解题笔记
date: 2018-01-03 10:30:43
tags:
  - javascript
  - 剑指offer
category:
  - 前端开发
---
匆匆忙忙的写完博客主题，终于下定决心折腾下算法了，打算把牛客网的剑指offer系列题目，用JavaScript和php实现一份。

# 第一题 二维数组中的查找

> 题目描述: 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

这是一道数组查找题，要求是时间限制1s，空间限制：32768K

首先，我们先把题目中别的东西去掉，只看做是一道二维数组查找题，来看，首先想到的肯定是通过循环遍历来实现，于是我们有了第一版的代码，JavaScript解题如下：
```js
function Find(target, array) {
    var i = 0
    // write code here
    for(i; i < array.length; ++i){
        if(InArray(target, array[i]) !== -1){
            return true
        }
    }
    return false
}
function InArray(val, array, idx) {
  var arrLen = array.length;
  if (!array) return -1;
  idx = idx || 0;
  idx = (idx < 0 || idx > array.length - 1) ? 0 : idx;
  for (; idx < arrLen; idx++) {
    if (array[idx] === val) {
      return idx;
    }
  }
  return -1;
}
```
<!--more-->

{%asset_img 1-js-1.png 第一版js测试结果 %}
当然php代码就更简单了：
```php
function Find($target, $array)
{
    // write code here
    foreach($array as $k => $v) {
        if(in_array($target, $v)) {

            return true;
        }
    }
    return false;
}
```
结果:
{%asset_img 1-php-1.png 第一版php测试结果 %}
就相同的写法来说，js还是比php更快的，显而易见！

当然，这个题目到这并没有结束，相反才刚刚开始呢。我们仔细分析题目，提到“每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序”，这不就是二维矩阵吗。。。。允悲，数学不能成为硬伤。。。

* 矩阵是有序的，从左下角来看，向上数字递减，向右数字递增，
* 因此从左下角开始查找，当要查找数字比左下角数字大时。右移
* 要查找数字比左下角数字小时，上移

根据上面的思路，我们来实现代码：
```js
function Find(target, array)
{
    // write code here
    // 行
    var raws = array.length
    // 列
    var columns = array[0].length  
    // 从左下角开始
    for(var column = 0, raw = raws - 1; column < columns && raw >= 0; ) {
        // 找到则立马退出
        if(array[column][raw] === target) return true
        // 大于目标数，剔除本行（上移）
        if(array[column][raw] > target) raw --
        // 小于目标数，剔除本列（右移）
        if(array[column][raw] < target) column ++
    }
    return false
}
```
{%asset_img 1-js-2.png 第二版js测试结果 %}
也就是说我们从一个raws行columns列的矩阵中，从左下角一个一个的去查找我们需要的值，知道则退出，否则向右上角移动
php班的代码如下：
```php
function Find($target, $array)
{
    // write code here
    $raws = count($array);
    // 列
    $columns = count($array[0]);

    // 从左下角开始
    for($column = 0, $raw = $raws - 1; $column < $columns && $raw >= 0; ) {
        // 找到则立马退出
        if($array[$column][$raw] === $target) return true;
        // 大于目标数，剔除本行（上移）
        if($array[$column][$raw] > $target) $raw --;
        // 小于目标数，剔除本列（右移）
        if($array[$column][$raw] < $target) $column ++;
    }
    return false;
}
```
{%asset_img 1-php-2.png 第二版php测试结果 %}
计算的效率还是明显大于php，第一版的js计算速度还要快于第二版的js思路，不过也只是拓宽自己的思路而已。

# 第二题 替换空格

>题目描述: 请实现一个函数，将一个字符串中的空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

题目比较简单，主要考察字符串的知识，直接正则就行，php的话，直接用php的str操作函数就行：
```js
function replaceSpace(str)
{
    // write code here
    return str.replace(/\s/g, '%20')
}
```
{%asset_img 2-js.png 第二题js版 %}
```php
function replaceSpace($str)
{
    // write code here
    return str_replace(' ', '%20', $str);
}
```
{%asset_img 2-php.png 第二题js版 %}

# 第三题 从头到尾打印链表
>题目描述: 输入一个链表，从尾到头打印链表每个节点的值。

## 什么是链表
链表是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。

根据题目的意思，我们先实现一个粗略的版本
```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    // write code here
    var arr = []
    var current = head //当前指针
    while(current){
        arr.push(current.val)
        current = current.next // 指针下移
    }
    return arr.reverse()
}
```
{%asset_img 3-js-1.png 第三题js第一版 %}

这版代码还有改进的地方，请看下面一版
```
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    // write code here
    var arr = []
    while(head !== null){
        arr.unshift(head.val) // 取出当前节点
        head = head.next // 下移指针
    }
    return arr
}
```
{%asset_img 3-js-2.png 第三题js第二版 %}
减少变量，重复利用变量。
php版的代码如下，思路是一样的，只是用php实现而已
```php
/*class ListNode{
    var $val;
    var $next = NULL;
    function __construct($x){
        $this->val = $x;
    }
}*/
function printListFromTailToHead($head)
{
    // write code here
    $arr = [];
    while(!is_null($head)){
        $arr[] = $head->val;
        $head = $head->next;
    }
    return array_reverse($arr);
}
```
{%asset_img 3-php.png 第三题js第二版 %}

# 第四题 重建二叉树
>题目描述: 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

## 什么是二叉树
>二叉树是每个节点最多有两个子树的树结构。通常子树被称作“左子树”（left subtree）和“右子树”（right subtree）。

## 二叉树的前中后序遍历

{%asset_img 4-ercha.jpg 第三题js第二版 %}

- 前根序遍历：先遍历根结点，然后遍历左子树，最后遍历右子树。
ABDHECFG
- 中根序遍历：先遍历左子树，然后遍历根结点，最后遍历右子树。
HDBEAFCG
- 后根序遍历：先遍历左子树，然后遍历右子树，最后遍历根节点。
HDEBFGCA

针对此道题，思路如下：
 - 1.先求出根节点（前序序列第一个元素）。
 - 2.将根节点带入到中序遍历序列中求出左右子树的中序遍历序列，即根节点在中序数组中的索引。
 - 3.通过左右子树的中序序列元素集合带入前序遍历序列可以求出左右子树的前序序列。
 - 4.左右子树的前序序列第一个元素分别是根节点的左右儿子
 - 5.求出了左右子树的4种序列可以递归上述步骤

最主要的思路是，把大化小，分拆遍历,代码如下:
```js
function reConstructBinaryTree(pre, vin)
{
   // write code here
   if(pre.length === 0 || vin.length === 0) return null
   // 根节点为前根的第一个，中根的中间节点
   var nodeIndex = vin.indexOf(pre[0]) // 根在中序的序列
   var leftNode = vin.slice(0, nodeIndex) // 头到根
   var rightNode = vin.slice(nodeIndex+1) // 跳过根

   // 通过左右子树的中序序列元素集合带入前序遍历序列可以求出左右子树的前序序列
   var TreeNode = {
       val: pre[0],
       left: reConstructBinaryTree(pre.slice(1, nodeIndex+1), leftNode), // 遍历左子树
       right: reConstructBinaryTree(pre.slice(nodeIndex+1), rightNode) // 遍历右子树
   }
   return TreeNode
}
```
php版本如下:
```php
/*class TreeNode{
    var $val;
    var $left = NULL;
    var $right = NULL;
    function __construct($val){
        $this->val = $val;
    }
}*/
function reConstructBinaryTree($pre, $vin)
{
    // write code here
    if($pre && $vin) {
        $index = array_search($pre[0], $vin);
        // 创建节点
        $tree = new TreeNode($pre[0]);
        $left = array_slice($vin, 0, $index);
        $right = array_slice($vin, $index + 1);
        $tree->left = reConstructBinaryTree(array_slice($pre, 1, $index), $left);
        $tree->right = reConstructBinaryTree(array_slice($pre, $index+1), $right);
        return $tree;
    }

}
```
```php
array_slice(array,start,length,preserve)
```
|参数     |描述                                                                         |
|:-------:|-----------------------------------------------------------------------------|
|  array  |必需。规定数组。                                                                |
|  start  |必需。数值。规定取出元素的开始位置。 0 = 第一个元素。                              |
|         |如果该值设置为正数，则从前往后开始取。                                            |
|         |如果该值设置为负数，则从后向前取 start 绝对值。 -2 意味着从数组的倒数第二个元素开始。|
|  length |可选。数值。规定被返回数组的长度。                                                |
|         |如果该值设置为整数，则返回该数量的元素。                                           |
|         |如果该值设置为负数，则函数将在举例数组末端这么远的地方终止取出。                     |
|         |如果该值未设置，则返回从 start 参数设置的位置开始直到数组末端的所有元素。            |
| preserve|可选。规定函数是保留键名还是重置键名。可能的值：                                    |
|         |true - 保留键名                                                                 |
|         |false - 默认。重置键名                                                          |

```php
array_search(value,array,strict)
```
|   参数   | 描述                                                                  |
|:-------:|----------------------------------------------------------------------|
|value    |	必需。规定需要搜素的键值。                                             |
|array    |	必需。规定被搜索的数组。                                               |
|strict   |可选。如果该参数被设置为 TRUE，则函数在数组中搜索数据类型和值都一致的元素。可能的值：true false - 默认如果设置为 true，则在数组中检查给定值的类型，数字 5 和字符串 5 是不同的（参见实例 2）|
