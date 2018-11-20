<template>
  <div>
    <div v-for="item in keepList" :key="item.id">
      <activity-card :activity="item.activity" :isDetail="true"></activity-card>
    </div>
  </div>
</template>

<script>
import ActivityCard from "../../common/activity-card";
import { getKeep } from '@/api'
export default {
  name: 'index',
  data() {
    return {
      keepList: [],
    }
  },
  components: {
    ActivityCard,
  },
  methods: {
    getKeepList() {
      getKeep()
        .then((res) => {
          console.log(res.data)
          this.keepList = res.data
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  onLoad() {
    this.getKeepList()
  }
}
</script>

<style lang="scss" scoped>

</style>
