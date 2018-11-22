<template>
  <div>
    <div class="thumb" v-if="user">
      <img class="image-back" :src="user.image" mode='aspectFill'>
      <div class="image-before"></div>
      <div class="user-detail">
        <div class="user-title">
          <div class="user-image">
            <img class="user-image" :src="user.image" mode='aspectFit'>
          </div>
          <div class="user-editer">
            <m-button :btnStyle="style" size="normal"><i-icon size="20" type="message" /></m-button>
            <m-button :btnStyle="style" size="normal">编辑</m-button>
          </div>
        </div>
        <div class="user-name">{{user.nick_name}}</div>
        <div class="user-info">{{user.simple_info}}</div>
        <div class="user-tags">
          <m-tag text="男" type="fill" type-color="rgba(250,76,69, 0.2)"></m-tag>
          <m-tag text="摄影师" type="fill" type-color="rgba(250,76,69, 0.2)"></m-tag>
          <m-tag text="重庆市" type="fill" type-color="rgba(250,76,69, 0.2)"></m-tag>
          <m-tag text="天秤座" type="fill" type-color="rgba(250,76,69, 0.2)"></m-tag>
        </div>
      </div>
      <div class="user-nums">
        <div class="nums-item">关注的主题</div>
        <div class="nums-item">我关注的人</div>
        <div class="nums-item">关注我的人</div>
      </div>
    </div>
    <div class="nav-bar">
      <div :id="0" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==0}">发布</div>
      </div>
      <div :id="1" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==1}">档案</div>
      </div>
    </div>
    <div class="swiper-content">
      <swiper class="content" duration="500" :style="{height:contentHeight}" :current="activeIndex" @change="swiperChange" @animationfinish="onAnimationFinish">
        <swiper-item>
          <div>
            发布内容
          </div>
        </swiper-item>
        <swiper-item>
          <div>
            回复内容
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      user: null,
      activeIndex: 0,
      style: 'background:rgba(250,76,69, 0.5);border-radius:66rpx;color:#fff;min-width:0;margin-left:8px;'
    }
  },
  computed: {
    contentHeight() {
      return this.$store.state.systemInfo.windowHeight + "px";
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
  },
  onShow() {
    this.user = this.$store.state.userInfo
  },
}
</script>

<style lang="scss" scoped>
  .thumb{
    width:100%;
    height:550rpx;
    overflow:hidden;
    position: relative;
    .image-back{
      filter: blur(15px);
      width: 100%;
    }
    .image-before {
        position: absolute;
        width:100%;
        height:550rpx;
        left:0;
        top:0;
        background-color: rgba($color: #000, $alpha: 0.2)
      }
    .user-detail{
      color:white;
      position: absolute;
      display: flex;
      flex-direction: column;
      width:100%;
      left:0;
      top:80rpx;
      padding: 15px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      .user-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      .user-image {
        width: 56px;
        height: 56px;
        border-radius: 28px;
      }
      .user-name{
        font-size:16px;
        margin-bottom: 8px;
      }
      .user-info{
        font-size: 12px;
        margin-bottom: 8px;
      }
      .user-tags {
        m-tag {
          margin-right: 8px; 
        }
      }
    }
    .user-nums {
      position: absolute;
      display: flex;
      left: 0;
      bottom: 10rpx;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      padding: 15px;
      color:white;
    }
  }
  .nav-bar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: sticky;
    z-index: 500;
    top: 0;
    height: 50px;
    width: 100%;
    background-color: white;
    border-top-left-radius:20rpx;
    border-top-right-radius:20rpx;
    margin-top: -20rpx;
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
    padding-top: 50px;
    background-color: #f9f9f9;
    -webkit-overflow-scrolling: touch;
  }
</style>
