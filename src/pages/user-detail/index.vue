<template>
  <div v-if="user">
    <div class="show-message">
      <i-message id="message" />
    </div>
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
    <div class="user-activity-title">发布的动态</div>
    <div class="user-activity-list" :style="{minHeight:contentHeight + 50 + 'px'}">
      <span class="user-activity-detail">你一共发布了{{articleNums}}条动态</span>
      <activity-card :activity="activity" v-for="activity in activityList" :key="activity.id"></activity-card>
      <div>
        <m-loadmore v-if="isLoadEnd" text="到底啦..."/>
        <m-loadmore v-else text="正在努力加载中..." :icon="true"/>
      </div>
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
      activityList: [],
      nextPage: 'http://www.luoyangc.cn/api/v1/activity/',
      articleNums: 0,
      style: 'background:rgba(250,76,69, 0.5);border-radius:66rpx;color:#fff;min-width:0;margin-left:8px;'
    }
  },
  computed: {
    contentHeight() {
      return this.$store.getters.systemInfo.windowHeight
    },
    isLoadEnd() {
      if (this.nextPage) return false
      else return true
    }
  },
  methods: {
    // 加载更多
    async loadMore() {
      if (this.nextPage) {
        let {data} = await this.$fly.get(this.nextPage)
        this.nextPage = data.next
        data.results.forEach(element => {
          this.activityList.push(element)
        })
      }
    },
    // 获取用户信息
    async getUserInfo(id) {
      let {data} = await getUserInfoById(id)
      this.user = data
    },
    // 获取用户动态
    async getActivity(id) {
      let {data} = await getActivity({user: id})
      this.activityList = data.results
      this.articleNums = data.count
      this.nextPage = data.next
    },
    tabClick(e) {
      this.activeIndex = e.currentTarget.id
    },
    swiperChange(e) {
      this.activeIndex = e.mp.detail.current
    },
    // 滑动完成的回调函数
    onAnimationFinish() {
      console.log("滑动完成.....")
    },
  },
  onLoad(option) {
    this.getUserInfo(option.id)
    this.getActivity(option.id)
  },
  onUnload() {
    this.user = null
    this.activityList = null
  },
  onReachBottom() {
   this.loadMore()
  }
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
  .user-activity-list {
    padding: 0, 15px;
    .user-activity-detail {
      padding: 15px;
      font-size: 12px;
      color: #666;
    }
  }
  .user-activity-title {
    position: sticky;
    top: 0;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    background-color: white;
    border-top-left-radius:20rpx;
    border-top-right-radius:20rpx;
    margin-top: -25rpx;
    box-shadow: 0 1rpx 6rpx #ccc;
  }
</style>
