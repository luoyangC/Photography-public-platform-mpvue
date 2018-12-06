<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="nav-bar">
      <block v-for="(item, index) in tabs" :key="index">
        <div :id="index" class="nav-bar-item" @click="tabClick">
          <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==index}">{{item.name}}</div>
        </div>
      </block>
      <div class="nav-bar-slider" :class="navBarSliderClass"></div>
    </div>
    <div class="swiper-content">
      <swiper class="content" duration="500" :style="{height:contentHeight}" :current="currentTab" @change="swiperChange" @animationfinish="onAnimationFinish">
        <swiper-item>
          <index-attention :winHeight="winHeight"></index-attention>
        </swiper-item>
        <swiper-item>
          <index-recommend :winHeight="winHeight"></index-recommend>
        </swiper-item>
        <swiper-item>
          <index-agreement :winHeight="winHeight"></index-agreement>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import IndexAgreement from './components/agreement'
import IndexAttention from './components/attention'
import IndexRecommend from './components/recommend'
import { $Message } from '../../../static/iview/base/index.js'

export default {
  components: {
    IndexAgreement,
    IndexAttention,
    IndexRecommend,
  },
  data() {
    return {
      tabs: [
        { name: '关注', type: 1, checked: true },
        { name: '推荐', type: 2, checked: true },
        { name: '约拍', type: 3, checked: true },
      ],
      activeIndex: 1,
      currentTab: 1,
      winWidth: 0,
      winHeight: 0,
    };
  },
  computed: {
    // 动态绑定导航栏滚动条的样式
    navBarSliderClass() {
      if (this.activeIndex == 0) {
        return "nav-bar-slider-0";
      }
      if (this.activeIndex == 1) {
        return "nav-bar-slider-1";
      }
      if (this.activeIndex == 2) {
        return "nav-bar-slider-2";
      }
    },
    // 动态设置滑动区域的高度
    contentHeight() {
      return this.winHeight + "px";
    },
  },
  methods: {
    pushIndexMessage(nums) {
      if (nums > 0) {
        $Message({
          content: `您有${nums}条消息，请注意查看`,
          type: 'success',
          duration: 5,
        }) 
      }
    },
    pushNewMessage() {
      $Message({
        content: '您有一条新的消息',
        type: 'success'
      });
    },
    // 获取系统信息，主要是获取窗口的高度
    getSystemInfo() {
      let that = this;
      wx.getSystemInfo({
        success(res) {
          that.winHeight = res.windowHeight;
        }
      })
    },
    // 导航栏点击的回调函数
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
      this.currentTab = this.activeIndex;
    },
    // 左右滑动的回调函数
    swiperChange(e) {
      this.currentTab = e.mp.detail.current;
      this.activeIndex = this.currentTab;
    },
    // 滑动完成的回调函数
    onAnimationFinish() {
      console.log("滑动完成.....")
    },
  },
  onLoad() {
    this.getSystemInfo();
    this.pushIndexMessage(this.$store.state.msgNums)
    let messageSocket = this.$store.state.webSocket
    messageSocket.onMessage((res) => {
      this.pushNewMessage()
    })
  },
};
</script>

<style lang="scss" scoped>
  .nav-bar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 500;
    top: 0;
    height: 50px;
    width: 100%;
    box-shadow: 0 1rpx 6rpx #ccc;
  }
  .nav-bar-item {
    position: relative;
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 13px 0;
    text-align: center;
    font-size: 0;
  }
  .nav-bar-title {
    color: black;
    font-weight: 500;
    display: inline-block;
    font-size: 15px;
    max-width: 8em;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
  .nav-bar-on {
    color: #89c5de;
  }

  .nav-bar-slider {
    position: absolute;
    content: " ";
    left: 0;
    bottom: 0;
    width: 100rpx;
    height: 3px;
    background-color: #89c5de;
    -webkit-transition: -webkit-transform 0.1s;
    transition: -webkit-transform 0.1s;
    transition: transform 0.1s, -webkit-transform 0.1s;
  }

  .nav-bar-slider-0 {
    left: 75rpx;
    transform: translateX(0);
  }

  .nav-bar-slider-1 {
    left: 75rpx;
    transform: translateX(250rpx);
  }

  .nav-bar-slider-2 {
    left: 75rpx;
    transform: translateX(500rpx);
  }

  .content {
    box-sizing: border-box;
    padding-top: 50px;
    background-color: #f9f9f9;
    -webkit-overflow-scrolling: touch;
  }
</style>
