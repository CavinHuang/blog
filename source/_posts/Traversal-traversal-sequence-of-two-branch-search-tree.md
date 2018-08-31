---
title: 二叉搜索树的后序遍历序列
date: 2018-08-31 14:39:38
tags:
  - php
  - 二叉树
  - 二叉树的后序遍历
category:
  - php开发与学习
  - 算法
---

# 什么是二叉树的后序遍历

后序遍历首先遍历左子树，然后遍历右子树，最后访问根结点，在遍历左、右子树时，仍然先遍历左子树，然后遍历右子树，最后遍历根结点。(来自百度百科)
<!--more-->
后序遍历：若二叉树为空，则空操作返回，否则从左到右先叶子结点后结点的方式遍历访问左右子树，最后访问根结点。

特点：
- ①. 左------>右------>根
- ②. 根据后序遍历的结果可知最后访问的必定是root结点。

下面是一道剑指offer的题目:

>题目描述：输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

我的思路是这样的:

已知条件：后序序列最后一个值为root；二叉搜索树左子树值都比root小，右子树值都比root大。
- 1、确定root；
- 2、遍历序列（除去root结点），找到第一个大于root的位置，则该位置左边为左子树，右边为右子树；
- 3、遍历右子树，若发现有小于root的值，则直接返回false；
- 4、分别判断左子树和右子树是否仍是二叉搜索树（即递归步骤1、2、3）。

代码实现:
```php
function VerifySquenceOfBST($sequence)
{
    // write code here
    $count = count($sequence);
    // 数组为空当然不是二叉树的后序遍历集合
    if ($count == 0){
      return false;
    }
    // 一个元素肯定是后序遍历集合
    if ($count == 1) {
        return true;
    } else {
        $result = true;
        // 按照后序遍历的规则拿出根
        $root = end($sequence);
        $mid_index = -1;

        $left = [];
        $right = [];

        // 分出根节点的索引
        for ($i = 0; $i < $count; $i ++) {
            if ($sequence[$i] < $root) {
                $mid_index = $i;
            }
        }
        // 分出左子树和右子树
        for($i = 0; $i < $count - 1; $i ++) {
            if ($i <= $mid_index) {
                $left[] = $sequence[$i];
            } else {
                $right[] = $sequence[$i];
            }
        }

        // 左孩子如果有大于根的情况排除
        for($i = 0; $i < count($left); $i ++) {
            if ($left[$i] > $root) {
                return false;
            }
        }

        // 右孩子如果有小于根的情况排除
        for($i = 0; $i < count($right); $i ++) {
            if ($right[$i] < $root) {
                return false;
            }
        }

        // 分别判断左子树和右子树是否仍是二叉搜索树
        if (count($left) > 0) {
            $result &= VerifySquenceOfBST($left);
        }

        if ($result && count($right) > 0) {
            $result &= VerifySquenceOfBST($right);
        }

        return $result;
    }
}
```

算法题很巩固基础，加油!
