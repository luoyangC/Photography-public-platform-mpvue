<template>
  <div class="topic-detail">
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
      user: this.$store.state.userInfo,
      styleIsFollow: 'border-radius:66rpx;color:#000;',
      style: 'background:#EA5149;border-radius:66rpx;color:#fff;'
    };
  },
  methods: {
    addFollow() {
      addFollow({follow_id: this.topic.id, follow_type: 'topic'})
        .then((res) => {
          this.topic.is_follow = res.data.id
        }).catch((err) => {
          console.log(err)
        })
    },
    delFollow() {
      delFollow(this.topic.is_follow)
        .then((res) => {
          this.topic.is_follow = false
        }).catch((err) => {
          console.log(err)
        })
    },
    getActivity(id) {
      getActivity({topic:id})
        .then((res) => {
          console.log(res);
          this.activityList = res.data
        })
    },
    getTopic(id) {
      getTopicById(id)
        .then((res) => {
          console.log(res)
          this.topic = res.data
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  onLoad(option) {
    this.getTopic(option.id)
    this.getActivity(option.id)
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
