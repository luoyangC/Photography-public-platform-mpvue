<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="topic-list">
      <i-cell-group>
        <i-cell v-if="topicList" v-for="topic in topicList" :key="topic.id" :title="topic.title" @click="goBack(topic)"></i-cell>
      </i-cell-group>
    </div>
  </div>
</template>

<script>
import { getTopic } from '../../api';
export default {
  name: 'index',
  data() {
    return {
      topicList: [],
    }
  },
  methods: {
    getTopic() {
      getTopic()
        .then((res) => {
          this.topicList = res.data
        }).catch((err) => {
          console.log(err)
        })
    },
    goBack(topic) {
      this.$store.commit('SET_TOPIC', topic);
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onLoad() {
    this.getTopic()
  }
}
</script>

<style lang="scss" scoped>

</style>
