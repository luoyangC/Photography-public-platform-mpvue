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
import ActivityCard from "@/common/activity-card";
import { getActivity } from '@/api'
export default {
  name: 'index',
  data: () => ({
    keepActivityList: [],
  }),
  components: {
    ActivityCard,
  },
  methods: {
    async getkeepActivityList() {
      let {data} = await getActivity({keep:2})
      this.keepActivityList = data.results
    }
  },
  onLoad() {
    this.getkeepActivityList()
  }
}
</script>
