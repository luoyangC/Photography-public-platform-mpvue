<template>
  <div>
    <div v-for="item in activityList" :key="item.id">
      <activity-card :activity="item"></activity-card>
    </div>
  </div>
</template>

<script>
import ActivityCard from "../../common/activity-card";
import { getActivity } from '../../api';
export default {
  name: 'index',
  components: {
    ActivityCard,
  },
  data() {
    return {
      activityList: [],
    }
  },
  methods: {
    getMyActivity() {
      getActivity({user: this.$store.state.userInfo.id})
        .then((res) => {
          console.log(res)
          this.activityList = res.data
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  onLoad() {
    this.getMyActivity()
  }
}
</script>

<style lang="scss" scoped>

</style>
