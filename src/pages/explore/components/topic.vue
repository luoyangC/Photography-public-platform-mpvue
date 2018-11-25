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
    };
  },
  computed: {
    contentHeight() {
      return this.winHeight -100 + "px";
    },
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
      let url = `/pages/topic-detail/main?id=${id}`
      wx.navigateTo({ url })
    },
  },
  onLoad() {
    this.getTopic()
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
</style>