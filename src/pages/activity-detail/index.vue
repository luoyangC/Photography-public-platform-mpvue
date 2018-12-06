<template>
  <div class="detail">
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="detail-content">
      <activity-card v-if="activity" :activity="activity" :isDetail="true"></activity-card>
    </div>
    <div class="detail-comment" id="comment">
      <comment-list v-if="activity" :comments="comments" :activityId="activity.id"></comment-list>
    </div>
  </div>
</template>

<script>
import ActivityCard from '../../common/activity-card'
import CommentList from '../../common/comment-list'
import { getActivityById, getComment } from "../../api";
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
    getActivity(id) {
      getActivityById(id)
        .then((res) => {
          this.activity = res.data;
        }).catch((err) => {
          console.log(err)
      })
    },
    getComment(id) {
      getComment({activity: id})
        .then((res) => {
          this.comments = res.data
        }).catch((err) => {
          console.log(err)
        })
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

<style lang="scss" scoped>

</style>
