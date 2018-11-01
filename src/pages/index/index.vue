<template>
  <div>
    <div class="nav-bar">
      <block v-for="(item, index) in tabs" :key="index">
        <div :id="index" :class="{'nav-bar-item-on':activeIndex == index}" class="nav-bar-item" @click="tabClick">
          <div class="nav-bar-title">{{item.name}}</div>
        </div>
      </block>
      <div class="nav-bar-slider" :class="navBarSliderClass"></div>
    </div>
    <div class="swiper-content">
      <swiper class="content" duration="100" :style="'height:'+contentHeight" :current="currentTab" @change="swiperChange" @animationfinish="onAnimationFinish">
        <swiper-item>
          <index-attention></index-attention>
        </swiper-item>
        <swiper-item>
          <index-recommend></index-recommend>
        </swiper-item>
        <swiper-item>
          <index-approximately></index-approximately>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import IndexApproximately from './components/approximately'
import IndexAttention from './components/attention'
import IndexRecommend from './components/recommend'

export default {
  components: {
    IndexApproximately,
    IndexAttention,
    IndexRecommend,
  },
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination'
      },
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
    contentHeight() {
      return this.winHeight + "px";
    },
  },
  methods: {
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
      console.log(this.activeIndex);
    },
    swiperChange(e) {
      this.currentTab = e.mp.detail.current;
      this.activeIndex = this.currentTab;
    },
    onAnimationFinish() {
      console.log("滑动完成.....")
    },
    onPullDownRefresh:function() {
      wx.showNavigationBarLoading();
      setTimeout(function()
      {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      },1500);
    },
  },
  onLoad() {
    let res = wx.getSystemInfoSync();
    this.winWidth = res.windowWidth;
    this.winHeight = res.windowHeight;
  },
};
</script>

<style scoped>
  .nav-bar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 500;
    top: 0;
    height: 50px;
    width: 100%;
    border-bottom: 1rpx solid #ccc;
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

  .nav-bar-slider {
    position: absolute;
    content: " ";
    left: 0;
    bottom: 0;
    width: 6em;
    height: 3px;
    background-color: #89c5de;
    -webkit-transition: -webkit-transform 0.1s;
    transition: -webkit-transform 0.1s;
    transition: transform 0.1s, -webkit-transform 0.1s;
  }

  .nav-bar-slider-0 {
    left: 29rpx;
    transform: translateX(0);
  }

  .nav-bar-slider-1 {
    left: 29rpx;
    transform: translateX(250rpx);
  }

  .nav-bar-slider-2 {
    left: 29rpx;
    transform: translateX(500rpx);
  }

  .content {
    box-sizing: border-box;
    padding-top: 50px;
    background-color: #f9f9f9;
    -webkit-overflow-scrolling: touch;
  }

  .controls {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    text-align: center;
    z-index: 8888;
    top: 80px;
    height: 50px;
    width: 100%;
  }
</style>
