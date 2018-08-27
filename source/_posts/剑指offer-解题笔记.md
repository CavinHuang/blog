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
<!-- more -->

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

# 第五题 用两个栈实现队列
> 题目描述: 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

思路：
- 入队：将元素进栈A
- 出队：判断栈B是否为空，如果为空，则将栈A中所有元素pop，并push进栈B，栈B出栈；
- 如果不为空，栈B直接出栈。

按思路实现如下:
```js
var stack1 = [], stack2 = []
function push(node)
{
    // write code here
    stack1.push(node)
}
function pop()
{
    // write code here

    if(stack2.length == 0) {
        if(stack1.length == 0) {
            return null;
        } else{
            var len = stack1.length;
            for (var i =0; i < len; i++) {
            	stack2.push(stack1.pop())
        	}  
            return stack2.pop()
        }
    } else {
        return stack2.pop()
    }
}
```
php版如下:
```
<?php
/**
*两个栈,栈1完成队列入的操作,栈2取栈1出栈的数据,使数据反向,模拟队列
*/
$stack1 = new SplStack();
$stack2 = new SplStack();
function mypush($node)
{
    // write code here
    global $stack1;
    global $stack2;

    $stack1->push($node);
}
function mypop()
{
    // write code here
    global $stack1;
    global $stack2;
    if($stack2->isEmpty()){
        if($stack1->isEmpty()){
            return null;
        }else{
            $len = $stack1->count();
            for($i = 0; $i < $len; $i ++) {
                $stack2->push($stack1->pop());
            }
            return $stack2->pop();
        }
    }else{
        return $stack2->pop();
    }
}
```
>SplStack类通过使用一个双向链表来提供栈的主要功能。

```php
SplStack extends SplDoublyLinkedList implements Iterator , ArrayAccess , Countable {
  /* 方法 */
  __construct ( void )
  void setIteratorMode ( int $mode )
  /* 继承的方法 */
}
```
基本继承方法如下：
```php
  public void SplDoublyLinkedList::add ( mixed $index , mixed $newval );
  public mixed SplDoublyLinkedList::bottom ( void );
  public int SplDoublyLinkedList::count ( void );
  public mixed SplDoublyLinkedList::current ( void );
  public int SplDoublyLinkedList::getIteratorMode ( void );
  public bool SplDoublyLinkedList::isEmpty ( void );
  public mixed SplDoublyLinkedList::key ( void );
  public void SplDoublyLinkedList::next ( void );
  public bool SplDoublyLinkedList::offsetExists ( mixed $index );
  public mixed SplDoublyLinkedList::offsetGet ( mixed $index );
  public void SplDoublyLinkedList::offsetSet ( mixed $index , mixed $newval );
  public void SplDoublyLinkedList::offsetUnset ( mixed $index );
  public mixed SplDoublyLinkedList::pop ( void );
  public void SplDoublyLinkedList::prev ( void );
  public void SplDoublyLinkedList::push ( mixed $value );
  public void SplDoublyLinkedList::rewind ( void );
  public string SplDoublyLinkedList::serialize ( void );
  public void SplDoublyLinkedList::setIteratorMode ( int $mode );
  public mixed SplDoublyLinkedList::shift ( void );
  public mixed SplDoublyLinkedList::top ( void );
  public void SplDoublyLinkedList::unserialize ( string $serialized );
  public void SplDoublyLinkedList::unshift ( mixed $value );
  public bool SplDoublyLinkedList::valid ( void );
```
链表具有的功能基本都已实现。

# 第六题 旋转数组最小数字
> 题目描述: 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

当然我们最简单的做法是直接求出此数组的最小值，但这不是我们练习题目的目的，我们目的在于巩固和学习算法，在这里我们采用二分法来计算，主要思路如下：

需要考虑三种情况：
- (1)array[mid] >= array[left]:
出现这种情况的array类似[3,4,5,6,0,1,2]，此时最小数字一定在mid的右边。
left = mid
- (2)array[mid] == array[left]:
出现这种情况的array类似 [1,0,1,1,1] 或者[1,1,1,0,1]，此时最小数字不好判断在mid左边
还是右边,这时只好一个一个试 ，
right = mid
- (3)array[mid] < array[right]:
出现这种情况的array类似[2,2,3,4,5,6,6],此时最小数字一定就是array[mid]或者在mid的左
边。因为右边必然都是递增的。
right = mid

按照上面的思路，我实现如下：
```js
function minNumberInRotateArray(arr)
{
    if(arr.length == 0) return 0;
    // 取出左右边界
    var left = 0;
    var right = arr.length - 1
    var mid;
    while(arr[left] >= arr[right]) {
      if(right-left==1){
         mid=right;
         break;
      }
      // 取出中间点，二分法关键标识
      mid = Math.floor(((left + right) / 2))
      // 前部分和中间比较，大于往右移，小于往左移
      if(arr[mid] >= arr[left]) {
          left = mid
      }else if(arr[mid] < arr[left]) {
          right = mid
      }else if(arr[mid] == arr[left] && arr[mid] == arr[right]){ // 相等时，逐个比较
          var res = arr[0]
          for(var i = 0; i < arr.length; i ++) {
              if(res > arr[i]) return res
          }
      }
    }
    return arr[mid]
}
```
简单版的js代码如下:
```js
function minNumberInRotateArray(arr)
{
   return Math.min.apply(null, arr)
}
```
PHP的话比较简单，就不用二分法了，直接：
```php
function minNumberInRotateArray($arr)
{
    // write code here
    if(empty($arr)) return 0;
    return min($arr);
}
```

# 第七题 斐波那契数列

>题目描述: 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项。
n<=39

>斐波那契数列：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
如果设F(n）为该数列的第n项（n∈N*），那么这句话可以写成如下形式：:F(n)=F(n-1)+F(n-2)
显然这是一个线性递推数列。

其核心公式是：
```bash
F(n) = F(n-1) + F(n-2)
```

根据公式，完成如下代码:
```js
function Fibonacci(n)
{
    // write code here
    // 1 时，永远为1，无需计算
    if(n <= 1) return n;
    // 根据f(n) = f(n-1) + f(n+1)设定三个变量
    var f1 = 0, f2 = 1, fn;

    // 循环查找
    for(var i = 2; i <= n; i ++) {
        // 算出当前指针
        fn = f1 + f2;
        // 更新指针
        f1 = f2;
        f2 = fn;
    }
    return fn;
}
```
此道题php版也差不多，就不贴代码了。

# 第八道 跳台阶

>题目描述: 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

数列题，没什么好说的，找规律就行，代码如下：
```js
function jumpFloor(number)
{
    // write code here
    if(number === 0 || number === 1 || number === 2) {
        return number;
    }
    var oneStep = 1;
    var twoStep = 2;
    var num = 0;
    for(var i = 3; i <= number; i ++) {
        num = oneStep + twoStep
        oneStep = twoStep
        twoStep = num
    }
    return num
}
```

# 第九题 变态跳台阶

>题目描述: 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

首先，我们分析下：
f(1) = 1
f(2) = f(2-1) + f(2-2)         //f(2-2) 表示2阶一次跳2阶的次数。
f(3) = f(3-1) + f(3-2) + f(3-3)
...
f(n) = f(n-1) + f(n-2) + f(n-3) + ... + f(n-(n-1)) + f(n-n)

说明：
-1）这里的f(n) 代表的是n个台阶有一次1,2,...n阶的 跳法数。
-2）n = 1时，只有1种跳法，f(1) = 1
-3) n = 2时，会有两个跳得方式，一次1阶或者2阶，这回归到了问题（1） ，f(2) = f(2-1) + f(2-2)
-4) n = 3时，会有三种跳得方式，1阶、2阶、3阶，
    那么就是第一次跳出1阶后面剩下：f(3-1);第一次跳出2阶，剩下f(3-2)；第一次3阶，那么剩下f(3-3)
    因此结论是f(3) = f(3-1)+f(3-2)+f(3-3)
-5) n = n时，会有n中跳的方式，1阶、2阶...n阶，得出结论：
    f(n) = f(n-1)+f(n-2)+...+f(n-(n-1)) + f(n-n) => f(0) + f(1) + f(2) + f(3) + ... + f(n-1)
-6) 由以上已经是一种结论，但是为了简单，我们可以继续简化：
    f(n-1) = f(0) + f(1)+f(2)+f(3) + ... + f((n-1)-1) = f(0) + f(1) + f(2) + f(3) + ... + f(n-2)
    f(n) = f(0) + f(1) + f(2) + f(3) + ... + f(n-2) + f(n-1) = f(n-1) + f(n-1)

可以得出：
    f(n) = 2*f(n-1)

思路清晰后，解起来就快了。
```js
function jumpFloorII(number)
{
    // write code here
    if(number <= 1) return 1;
    return 2 * jumpFloorII(number - 1)
}
```
# 第十题 矩形覆盖
> 题目描述: 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

这道题本质上依旧是斐波那契数列
2*n的大矩形，和n个2*1的小矩形
其中target*2为大矩形的大小
有以下几种情形：
- 1⃣️target <= 0 大矩形为<= 2*0,直接return 1；
- 2⃣️target = 1大矩形为2*1，只有一种摆放方法，return1；
- 3⃣️target = 2 大矩形为2*2，有两种摆放方法，return2；
- 4⃣️target = n 分为两步考虑：

第一次摆放一块 2*1 的小矩阵，则摆放方法总共为f(target - 1)

第一次摆放一块1*2的小矩阵，则摆放方法总共为f(target-2)
因为，摆放了一块1*2的小矩阵（用√√表示），对应下方的1*2（用××表示）摆放方法就确定了，所以为f(targte-2)

代码如下：
```js
function rectCover(number)
{
    // write code here
    if(number <= 0) return 0
    if(number <= 2) return number
    return rectCover(number - 1) + rectCover(number - 2)
}
```

# 第十一题 二进制中1的个数
>题目描述: 输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

大神的代码如下，请欣赏：
```js
function NumberOf1(n)
{
    // write code here
 	var count = 0;
    while(n!= 0){
      count++;
      n = n & (n - 1);
    }
    return count;
}
```
思路分析：
如果一个整数不为0，那么这个整数至少有一位是1。如果我们把这个整数减1，那么原来处在整数最右边的1就会变为0，原来在1后面的所有的0都会变成1(如果最右边的1后面还有0的话)。其余所有位将不会受到影响。
举个例子：一个二进制数1100，从右边数起第三位是处于最右边的一个1。减去1后，第三位变成0，它后面的两位0变成了1，而前面的1保持不变，因此得到的结果是1011.我们发现减1的结果是把最右边的一个1开始的所有位都取反了。这个时候如果我们再把原来的整数和减去1之后的结果做与运算，从原来整数最右边一个1那一位开始所有位都会变成0。如1100&1011=1000.也就是说，把一个整数减去1，再和原整数做与运算，会把该整数最右边一个1变成0.那么一个整数的二进制有多少个1，就可以进行多少次这样的操作。

我的代码，相对来说比较简陋了，如下：
```js
function NumberOf1(n)
{
    // write code here
    if(n < 0) {
        n = n >>> 0 // 利用位移计算，来算负数的补码
    }
   	var tn = n.toString(2), count = 0
    // 找到1即可
    for(var i = 0; i < tn.length; i++) {
        if(1 === tn[i]*1) {
            count ++
        }
    }
    return count
}
```
> N>>>1就代表N的二进制右移一位，二进制右移一位就能得到中间值。

例如
```
10>>>1
10的二进制代码为 1010
向右移动一位后为 0101
即 5
```

# 第十二题 数值的整数次方
>题目描述: 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

解题如下：
```js
function Power(base, exponent)
{
    // write code here
    return Math.pow(base, exponent)
}
```
php代码如下:
```php
function Power($base, $exponent)
{
    // write code here
    return pow($base, $exponent);
}
```

# 第十三题 调整数组顺序使奇数位于偶数前面

> 题目描述:输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

本题主要考察js中数组的增删，也就是push(尾增),unshift(头增)和pop(尾删),shift(头删)这四个方法：
```js
function reOrderArray(array)
{
    // write code here
    var arr1 = [], arr2 = []
    for(var i = 0; i < array.length; i++){
        if(array[i] % 2 === 0) {
            arr1.push(array[i])
        }else{
            arr2.push(array[i])
        }
    }
    return arr2.concat(arr1)
}
```
php代码如下，主要是对array_merge函数的运用:
```php
function reOrderArray($array)
{
    // write code here
    $arr1 = [];
    $arr2 = [];
    foreach($array as $k => $v) {
        if($v % 2 === 0) {
            $arr1[] = $v;
        }else{
            $arr2[] = $v;
        }
    }
    return array_merge($arr2, $arr1);
}
```

# 第十四题 链表中倒数第k个结点

>题目描述:输入一个链表，输出该链表中倒数第k个结点。

在第三题中曾提到链表是一个包含本节点信息和下一个节点指针的节点，此题主要考察对链表的认识，先看代码：
```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k)
{
    // write code here
    var currentNode = head
    var ListArr = []
    while(currentNode !== null) {
        ListArr.push(currentNode)
        currentNode = currentNode.next
    }

    return ListArr[ListArr.length - k]
}
```
首先收集所有的链表节点信息，用js可以计算的数组存放，通过循环查找所有的节点，进行归拢，最后返回倒数K的节点出去。
PHP代码：
```php
/*class ListNode{
    var $val;
    var $next = NULL;
    function __construct($x){
        $this->val = $x;
    }
}*/
function FindKthToTail($head, $k)
{
    // write code here
    $currentNode = $head;
    $arr = [];
    while(!is_null($currentNode)) {
        $arr[] = $currentNode;
        $currentNode = $currentNode->next;
    }

    return $arr[(count($arr) - $k)];
}
```

# 第十五题 反转链表

>题目描述: 输入一个链表，反转链表后，输出链表的所有元素。

根据题目的意思，我们可以假设输入的链表为 1 > 2 > 3 > 4 > 5 > null,则其反转之后必须为 null > 5 > 4 > 3 > 2 > 1

代码如下：
```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead)
{
    // write code here
    var pNode1 = pHead, pNode2 = null, tmp = null;

    while(pNode1){
        // 保存next
        tmp = pNode1.next

        //重新指定 next
        pNode1.next = pNode2

        // 调换位置
        pNode2 = pNode1
        pNode1 = tmp
    }

    return pNode2
}
```
php代码，相差不多，就不贴了。

# 第十六题 合并两个排序的链表

>题目描述:输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2)
{
    // write code here
   if(pHead1 === null) return pHead2
   else if(pHead2 === null) return pHead1

   var result = {}  // 新建链表

   // 判断当前两个节点的大小
   // 把小值放入前面
   // 再用更大值和更小值得下一个节点比较
   if(pHead1.val > pHead2.val) {
		result = pHead2
    	result.next = Merge(pHead1, pHead2.next)
   }else{
       result = pHead1
       result.next = Merge(pHead2, pHead1.next)
   }

    return result
}
```
解题思路：
假设输入的用例是{1,3,5}和{2,4,6}
- 先用1和2比较，把1放入新的链表，然后递归比较1的下一个节点
- 用2和3比较，确认2为1的下一个节点，然后递归2的下一个节点，
- ... ...

# 第十七题 树的子结构

>题目描述: 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

我的思路是先比较根节点，然后再比较左树，再比较右树，递归比较。
```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2)
{
    // write code here
    // 比较根 => 比较左 => 比较右
    if(!pRoot1 || !pRoot2) return false  // 排除空树
    return isSub(pRoot1, pRoot2) || HasSubtree(pRoot1.left, pRoot2) || HasSubtree(pRoot1.right, pRoot2)
}
// 检测是否是子
function isSub(pR1, pR2){
    if(!pR2) return true
    if(!pR1) return false
    if(pR1.val === pR2.val) {
        return isSub(pR1.left, pR2.left) && isSub(pR1.right, pR2.right) // 递归往下比较
    }else{
        return false
    }
}
```

# 第十八题 顺时针打印矩阵

>题目描述: 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.

首先我们确定矩阵结构是这样
```
[1,2,3,4]
[5,6,7,8]
[9,10,11,12]
[13,14,15,16]
```
也是就说我们最终获得数应该是沿着矩阵边沿，一层一层剥洋葱一样，把矩阵解刨开来，我思路如下：
旋转魔方解法：
假如矩阵就为上面这个矩阵：
我们取出第一行，这是第一条变，然后我们把整个矩阵逆时针旋转90°，此时矩阵结构如下：
```
[8,12,16]
[7,11,15]
[6,10,14]
[5,9,13]
```
此时第一行则为原矩阵最外边最右边的那条边，再把第一行取出，继续旋转，此时矩阵结构如下：
```
[15,14,13]
[11,10,9]
[7,6,5]
```
以此类推，直到矩阵最后一个数值，下面是js代码:
```js
function printMatrix(matrix)
{
    // write code here
 	if(!matrix) return
	var result = [];  
    var tmp = matrix.shift()
    result = result.concat(tmp)
    while(matrix !== null) {
		matrix = turn(matrix)
		if(!matrix) break;
		result = result.concat(matrix.shift())
	}
	return result
}
/**
 * 旋转数组
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function turn (arr) {
 	if(!arr||arr.length < 0 || arr[0] == undefined) return
	 // 取行和列
  var rows = arr.length, cols = arr[0].length
  var i, j, newArr = [];
	for(j=cols; j > 0; j --) {
		var tmp = []
		for(i = 0; i < rows; i ++) {
			tmp.push(arr[i][j - 1])
		}
		newArr.push(tmp)
    }
    return newArr;
}
```

# 第十九题 包含min函数的栈

>题目描述: 定义栈的数据结构，请在该类型中实现一个能够得到栈最小元素的min函数。

```js
var result = []
function push(node)
{
    // write code here
    result.push(node)
}
function pop()
{
    // write code here
	result.pop()
}
function top()
{
    // write code here
    return result[0]
}
function min()
{
    // write code here
	return Math.min.apply(null, result)
}
```
没什么亮点，Math.min的用法而已。
