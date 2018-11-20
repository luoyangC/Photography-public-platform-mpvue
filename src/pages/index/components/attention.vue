<template>
  <div>
    <scroll-view scroll-y :style="{height:contentHeight}">
      <div v-for="item in activityList" :key="item.id">
        <index-card :activity="item"></index-card>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import IndexCard from "@/common/index-card"
import { getActivity } from "@/api/index"
export default {
  name: 'attention',
  props: {
    winHeight: Number
  },
  components: {
    IndexCard,
  },
  data() {
    return {
      activityList: [],
    };
  },
  computed: {
    contentHeight() {
      return this.winHeight - 50 + "px";
    },
  },
  methods: {
    getActivity() {
      getActivity({follow:'topic'})
        .then((res) => {
          console.log(res);
          this.activityList = res.data
        })
    }
  },
  onLoad() {
    this.getActivity()
  }
};
</script>

<style scoped>
</style>
