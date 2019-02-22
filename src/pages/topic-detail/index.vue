<template>
  <div class="topic-detail">
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="topic" v-if="topic">
      <div class="topic-image">
        <img class='image-back' :src="topic.image" mode='aspectFill'>
        <div class="image-before"></div>
        <div class="topic-info">
          <div class="title">{{topic.title}}</div>
          <div class="info">{{topic.info}}</div>
        </div>
        <div class="topic-footer">
          <div class="follow-nums">关注人数：{{topic.follow_nums}}</div>
          <div class="follow-btn">
            <m-button :btnStyle="styleIsFollow" v-if="topic.is_follow" size="small" :plain=true @click.stop="delFollow">取消</m-button>
            <m-button :btnStyle="style" v-else size="small" @click.stop="addFollow" style="color: #EA5149">关注</m-button>
          </div>
        </div>
      </div>
    </div>
    <div class="approximately">
      <activity-card v-for="item in activityList" :key="item.id" :activity="item" :topicDetail="true"></activity-card>
    </div>
    <div>
      <m-loadmore v-if="isLoadEnd" text="到底啦..."/>
      <m-loadmore v-else text="正在努力加载中..." :icon="true"/>
    </div>
  </div>
</template>

<script>
import ActivityCard from "../../common/activity-card";
import { getActivity, getTopicById, addFollow, delFollow } from "../../api/index";
export default {
  components: {
    ActivityCard,
  },
  data() {
    return {
      topic: null,
      activityList: [],
      nextPage: 'http://www.luoyangc.cn/api/v1/topic/',
      user: this.$store.state.userInfo,
      styleIsFollow: 'border-radius:66rpx;color:#000;',
      style: 'background:#EA5149;border-radius:66rpx;color:#fff;'
    };
  },
  computed: {
    isLoadEnd() {
      if (this.nextPage) return false
      else return true
    }
  },
  methods: {
    // 添加关注
    async addFollow() {
      let {data} = await addFollow({follow_id: this.topic.id, follow_type: 'topic'})
      this.topic.is_follow = data.id
    },
    // 取消关注
    async delFollow() {
      await delFollow(this.topic.is_follow)
      this.topic.is_follow = false
    },
    // 获取动态列表
    async getActivity(id) {
      let {data} = await getActivity({topic:id})
      this.activityList = data.results
      this.nextPage = data.next
    },
    // 获取主题详情
    async getTopic(id) {
      let {data} = await getTopicById(id)
      this.topic = data
    },
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
  },
  // 首次加载
  onLoad(option) {
    this.getTopic(option.id)
    this.getActivity(option.id)
  },
  // 下拉
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.getActivity(this.topic.id)
    setTimeout(function() {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },1000)
  },
  // 触底
  onReachBottom() {
    this.loadMore()
  },
};
</script>

<style lang="scss" scoped>
  .topic{
    .topic-image {
      height: 400rpx;
      overflow:hidden;
      position: relative;
      .image-back {
        width: 100%;
      }
      .image-before {
        position: absolute;
        width:100%;
        height:400rpx;
        left:0;
        top:0;
        background-color: rgba($color: #000, $alpha: 0.5)
      }
      .topic-info {
        color:white;
        position: absolute;
        width:100%;
        left:0;
        top:100rpx;
        text-align: center;
        .title{
          font-size:20px;
        }
        .info{
          font-size: 14px;
        }
      }
      .topic-footer {
        color:white;
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width:100%;
        left:0;
        bottom: 0;
        text-align: center;
        padding: 15px;
        font-size: 14px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
      }
    }
  }
</style>
