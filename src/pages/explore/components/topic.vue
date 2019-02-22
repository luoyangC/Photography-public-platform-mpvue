<template>
  <div class="topic-list">
    <scroll-view scroll-y :style="{height:contentHeight}">
      <div class="topic-title">
        <i-icon size="20" color="#EA5149" type="label" />
        <p>热门主题</p>
      </div>
      <div class="topic-item" v-for="topic in topicList" :key="topic.id" @click="toTopicDetail(topic.id)">
        <simple-card :topic="topic"></simple-card>
      </div>
      <div>
        <m-loadmore v-if="isLoadEnd" text="到底啦..."/>
        <m-loadmore v-else text="正在努力加载中..." :icon="true"/>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import SimpleCard from "@/common/simple-card"
import { getTopic } from "@/api/index"
export default {
  name: 'topic',
  props: {
    winHeight: Number,
  },
  components: {
    SimpleCard,
  },
  data() {
    return {
      topicList: [],
      nextPage: 'http://www.luoyangc.cn/api/v1/topic/',
    };
  },
  computed: {
    contentHeight() {
      return this.winHeight -100 + "px";
    },
    isLoadEnd() {
      if (this.nextPage) return false
      else return true
    }
  },
  methods: {
    async getTopic(search) {
      let {data} = await getTopic({search:search})
      this.topicList = data
      this.nextPage = null
    },
    toTopicDetail(id) {
      let url = `/pages/topic-detail/main?id=${id}`
      wx.navigateTo({ url })
    },
  },
  onLoad() {
    this.getTopic('')
  }
};
</script>

<style lang="scss" scoped>
  .topic-title {
    padding: 8px 15px;
    font-size: 14px;
    p {
      display: inline;
      margin-left: 4px;
    }
  }
  .topic-more {
    font-size: 12px;
    color: #666;
    padding: 20px;
    text-align: center;
  }
</style>