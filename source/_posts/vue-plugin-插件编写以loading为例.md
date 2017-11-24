---
title: vue plugin 插件编写以loading为例
date: 2017-11-24 10:30:20
tags:
  - vue
  - vuejs
  - javascript
  - 前端
category: 前端开发
---

我们在使用vue开发的过程中，经常会遇到这两个问题：

我要使用loading(加载动画) toast（浮层提示） dialog（弹框提示）之类的全局性组件，但是用全局组件注册的话非常麻烦，还要在template标签中书写组件html代码然后参数通过在data选项中注册变量来控制组件的显示/隐藏/提示语，显得异常麻烦~
我要使用某些全局函数例如（axios）来进行某些操作，如果每次使用都需要import或者require的话，是一件不太优雅的事情
所以我们就想到在vue的全局实例Vue或者指向这个实例的指针this的原型上添加某一方法来达到随用随取的效果。

本文以loading为例，讲下如何编写一个Vue插件。
<!--more-->
首先我们编写一个普通的loading组件，作为插件的模板：
```javascript
 // my-project/src/plugin/loading/loading.vue
<template>
  <transition :name="animateName">
    <div class="loadings" v-show="isShow">
      <div class="loadings__loader">
        <div class="loadings__loader__dot"></div>
        <div class="loadings__loader__dot"></div>
        <div class="loadings__loader__dot"></div>
        <div class="loadings__loader__dot"></div>
        <div class="loadings__loader__dot"></div>
      </div>
    </div>
  </transition>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        isShow: false,
        hasAnimate: true,
      }
    },
    computed: {
      /**
       * 动画效果样式，没有返回空
       * @return {String} 样式
       */
      animateName() {
        return this.hasAnimate ? 'opacity' : ''
      },
    },
    methods: {
      /**
       * 开启动画效果
       */
      opemAnimate() {
        this.hasAnimate = true
      },
      /**
       * 去除动画效果
       * @return {Promise} 返回promise
       */
      removeAnimate() {
        return new Promise((resolve) => {
          this.hasAnimate = false
          resolve()
        })
      },
      /**
       * 显示动画loading
       */
      show() {
        this.isShow = true
      },
      /**
       * 隐藏动画loading
       */
      hide() {
        this.isShow = false
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>

  .loadings {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: transparent;

    &__loader {
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%,-50%,0)

      &__dot {
        width 40px
        height 40px
        background #3ac
        border-radius 100%
        display inline-block
        animation slide 1s infinite
        margin-right: 6px;

        for index in (1..5) {
          &:nth-child({index}) {
            animation-delay (0.2 + 0.1s * index)
            // background green(#ce2424, (50 * index))
            background lighten(#ce2424, (index * 6))
          }
        }
      }
    }
  }

  @keyframes slide
    0%
      transform scale(1)
    50%
      opacity .3
      transform scale(2)
    100%
      transform scale(1)

  .opacity {
    &-enter-active, &-leave-active {
      transition: all 0.6s
    }
    &-enter, &-leave-active {
      opacity: 0
    }
  }
</style>
```
这时如果你将其注册为全局组件，也是可以使用的，但是前面我们说过，这样使用非常不优雅

然后我们将其做成插件
```javascript
 // my-project/src/plugin/loading/index.js
import Loading from './loading.vue'

export default {
  /**
   * 每个插件都有的install方法，用于安装插件
   * @param {Object} Vue - Vue类
   * @param {Object} [pluginOptions] - 插件安装配置
   */
  install(Vue, pluginOptions = {}) {
    // 创建"子类"方便挂载
    const VueLoading = Vue.extend(Loading)
    let loading = null

    /**
     * 初始化并显示loading
     * @returns {Promise} Promise实例
     */
    function $loading() {
      return new Promise((resolve) => {
        // 第一次调用
        if (!loading) {
          loading = new VueLoading()
          // 手动创建一个未挂载的实例
          loading.$mount()
          // 挂载
          document.querySelector(pluginOptions.container || 'body').appendChild(loading.$el)
        }
        // 显示loading
        loading.show()
        resolve()
      })
    }
    // 定义关闭loading方法
    $loading.end = (noAnimate = false) => {
      return new Promise((resolve) => {
        if (!loading || !loading.isShow) {
          resolve()
          return
        }
        // 首页判断是否在关闭时需要动画
        if (noAnimate) {
          // 默认只在此次行为下移除动画,之后的行为仍有动画
          loading.removeAnimate().then(() => {
            loading.opemAnimate()
          })
        }

        loading.hide()
      })
    }

    Vue.loading = Vue.prototype.$loading = $loading
  },
}
```
然后我们在入口文件app.js中引入并且安装插件就可以了：
```javascript
···
import Vue from 'vue'
import VueLoading from './loading'
···

···
Vue.use(VueLoading, {
  container: '.app',
})
···
```
接下来可以在你任意想要的地方执行this.loading()就可以启动loading动画了，在需要关闭的地方执行this.loading.end()就可以关闭咯
