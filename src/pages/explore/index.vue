<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="search-wrap">
      <m-search class="search" v-model="value" icon-color="#EA5149" ph-color="#EA5149" placeholder="请输入 主题/用户/约拍城市"></m-search>
    </div>
    <div class="nav-bar">
      <div :id="0" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==0}">主题</div>
      </div>
      <div :id="1" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==1}">用户</div>
      </div>
      <div :id="2" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==2}">约拍</div>
      </div>
    </div>
    <div class="swiper-content">
      <swiper class="content" duration="500" :style="{height:swiperHeight}" :current="activeIndex" @change="swiperChange" @animationfinish="onAnimationFinish">
        <swiper-item>
          <explore-topic :winHeight="windowHeight"></explore-topic>
        </swiper-item>
        <swiper-item>
          <explore-user :winHeight="windowHeight"></explore-user>
        </swiper-item>
        <swiper-item>
          <explore-agreement :winHeight="windowHeight"></explore-agreement>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import ExploreUser from './components/user'
import ExploreTopic from './components/topic'
import ExploreAgreement from './components/agreement'
export default {
  components: {
    ExploreAgreement,
    ExploreTopic,
    ExploreUser,
  },
  data() {
    return {
      value: '',
      activeIndex: 0,
      windowHeight: 0,
    };
  },
  computed: {
    swiperHeight() {
      return this.windowHeight + "px";
    },
  },
  methods: {
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
    },
    swiperChange(e) {
      this.activeIndex = e.mp.detail.current;
    },
    // 滑动完成的回调函数
    onAnimationFinish() {
      console.log("滑动完成.....")
    },
    getSystemInfo() {
      wx.getSystemInfo({
        success: (res) => {
          this.windowHeight = res.windowHeight
          }
      })
    },
  },
  onLoad() {
    this.getSystemInfo()
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    console.log('下拉');
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh()
    },1000);
  },
};
</script>

<style lang="scss" scoped>
  .search-wrap {
    position: fixed;
    display: flex;
    top: 0;
    z-index: 201;
    align-items: center;
    width: 100%;
    height: 50px;
    background: white;
    .search {
      flex-grow: 1;
      margin: 15rpx 30rpx;
    }
  }
  .nav-bar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 500;
    top: 50px;
    height: 50px;
    width: 100%;
    background: white;
    border-bottom: 0.5rpx solid #ccc;
    // box-shadow: 0 1rpx 6rpx #ccc;
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
  .content {
    box-sizing: border-box;
    padding-top: 100px;
    background-color: #f9f9f9;
    -webkit-overflow-scrolling: touch;
  }
</style>
