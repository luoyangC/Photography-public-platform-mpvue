<template>
  <div>
    <div class="search-wrap">
      <m-search class="search" v-model="value" icon-color="#EA5149" ph-color="#EA5149" placeholder="请输入"></m-search>
    </div>
    <div class="approximately">
      <div class="item" v-for="topic in topicList" :key="topic.id" @click="toTopicDetail(topic.id)">
        <simple-card :topic="topic"></simple-card>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleCard from "@/common/simple-card"
import { getTopic } from '../../api'
export default {
  components: {
    SimpleCard,
  },
  data() {
    return {
      topicList: [],
      value: ''
    };
  },
  methods: {
    getTopic() {
      getTopic()
        .then((res) => {
          console.log(res)
          this.topicList = res.data
        }).catch((err) => {
          console.log(err)
        })
    },
    toTopicDetail(id) {
      let url = `/pages/topic-detail/main?id=${id}`;
      console.log(url);
      wx.navigateTo({ url })
    },
  },
  onLoad() {
    this.getTopic()
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
    height: 90rpx;
    background: white;
    box-shadow: 0 1rpx 6rpx #ccc;
    .search {
      flex-grow: 1;
      margin: 15rpx 30rpx;
    }
  }
  .approximately {
    box-sizing: border-box;
    padding-top: 100rpx;
  }
</style>
