<template>
  <div class="detail">
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="detail-content">
      <activity-card v-if="activity" :activity="activity" :isDetail="true"/>
    </div>
    <div class="detail-comment" id="comment">
      <comment-list v-if="activity" :comments="comments" :activityId="activity.id"/>
    </div>
  </div>
</template>

<script>
import ActivityCard from '../../common/activity-card'
import CommentList from '../../common/comment-list'
import { getActivityById, getComment } from "../../api"

export default {
  name: 'index',
  components: {
    ActivityCard,
    CommentList,
  },
  data() {
    return {
      activity: null,
      comments: null,
    }
  },
  methods: {
    // 获取动态详情
    async getActivity(id) {
      let {data} = await getActivityById(id)
      this.activity = data
    },
    // 获取评论列表
    async getComment(id) {
      let {data} = await getComment({activity: id})
      this.comments = data
    }
  },
  onLoad(option) {
    this.getActivity(option.id)
    this.getComment(option.id)
  },
  onUnload() {
    this.activity = null
    this.comments = null
  }
}
</script>
