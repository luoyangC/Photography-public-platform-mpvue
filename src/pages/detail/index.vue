<template>
  <div class="detail">
    <div class="detail-content">
      <activity-card v-if="activity" :activity="activity"></activity-card>
    </div>
    <div class="detail-comment"></div>
  </div>
</template>

<script>
import ActivityCard from '../../common/activity-card'
import { getActivityById } from "../../api";
export default {
  name: 'index',
  components: {
    ActivityCard
  },
  data() {
    return {
      activity: null,
    }
  },
  methods: {
    getActivity(id) {
      getActivityById(id)
        .then((res) => {
          this.activity = res.data
        }).catch((err) => {
          console.log(err)
      })
    }
  },
  onLoad(option) {
    this.getActivity(option.id)
  },
  onUnload() {
    this.activity = null
  }
}
</script>

<style lang="scss" scoped>

</style>
