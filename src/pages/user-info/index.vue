<template>
  <div v-if="user">
    <div class="user-thumb">
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
        <div class="user-info">{{user.simple_info || "该用户很懒，什么也没留下"}}</div>
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
    <div class="nav-bar" :class="{isTop:isTop}">
      <div :id="0" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==0}">发布</div>
      </div>
      <div :id="1" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==1}">档案</div>
      </div>
    </div>
    <div class="swiper-content">
      <swiper class="content" duration="500" :style="{height:swiperHeight}" :current="activeIndex" @change="swiperChange" @animationfinish="onAnimationFinish">
        <swiper-item>
          <div class="user-activity">
            <i-panel title="用户动态">
              <scroll-view :scroll-y="isScroll" :style="{height:scrollHeight}" @scrolltoupper="onLiveBottom">
                <activity-card :activity="activity" v-for="activity in activityList" :key="activity.id"></activity-card>
              </scroll-view>
            </i-panel>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="user-archive">
            <i-panel title="基础信息">
              <i-input :value="user.gender" title="性别" disabled />
              <i-input :value="user.birthday" title="星座" disabled />
              <i-input :value="user.simple_info" title="签名" disabled />
              <i-input :value="user.address" title="所在地" disabled />
              <i-input :value="user.approve" title="认证类型" disabled />
            </i-panel>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import ActivityCard from "../../common/activity-card";
import { getActivity, getUserInfoById } from '@/api'
export default {
  name: 'index',
  components: {
    ActivityCard,
  },
  data() {
    return {
      user: null,
      isTop: false,
      isScroll: false,
      activeIndex: 0,
      windowHeight: 0,
      activityList: null,
      style: 'background:rgba(250,76,69, 0.5);border-radius:66rpx;color:#fff;min-width:0;margin-left:8px;'
    }
  },
  computed: {
    swiperHeight() {
      return this.windowHeight - 50 + "px";
    },
    scrollHeight() {
      return this.windowHeight - 94 + "px";
    }
  },
  methods: {
    onLiveBottom() {
      this.isTop = false
      this.isScroll = false
    },
    getUserInfo(id) {
      getUserInfoById(id)
        .then((res) => {
          console.log(res)
          this.user = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getSystemInfo() {
      wx.getSystemInfo({
        success: (res) => {
          this.windowHeight = res.windowHeight
          }
      })
    },
    getActivity(id) {
      getActivity({user: id})
        .then((res) => {
          console.log(res)
          this.activityList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
  onLoad(option) {
    this.getSystemInfo()
    this.getUserInfo(option.id)
    this.getActivity(option.id)
  },
  onUnload() {
    this.user = null
    this.activityList = null
  },
  onReachBottom() {
    console.log('down')
    this.isTop = true
    this.isScroll = true
  },
  // onPageScroll(e) {
  //   console.log(e)
  //   if (e.scrollTop > 295) {
  //     this.isTop = true
  //     this.isScroll = true
  //   }
  //   else {
  //     this.isTop = false
  //     this.isScroll = false
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  .user-thumb{
    width:100%;
    height:300px;
    overflow:hidden;
    position: relative;
    .image-back{
      filter: blur(15px);
      width: 100%;
    }
    .image-before {
        position: absolute;
        width:100%;
        height:300px;
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
  .isTop {
    border-radius:0 !important;
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
    background-color: #f9f9f9;
    -webkit-overflow-scrolling: touch;
  }
  .user-archive {
    padding: 0, 15px;
  }
</style>
