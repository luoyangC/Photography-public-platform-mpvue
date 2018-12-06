<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div v-for="activity in keepActivityList" :key="activity.id">
      <activity-card :activity="activity"></activity-card>
    </div>
  </div>
</template>

<script>
import ActivityCard from "../../common/activity-card";
import { getActivity } from '@/api'
export default {
  name: 'index',
  data() {
    return {
      keepActivityList: [],
    }
  },
  components: {
    ActivityCard,
  },
  methods: {
    getkeepActivityList() {
      getActivity({keep:2})
        .then((res) => {
          this.keepActivityList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  onLoad() {
    this.getkeepActivityList()
  }
}
</script>

<style lang="scss" scoped>

</style>
