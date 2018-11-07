<template>
  <div>
    <scroll-view scroll-y :style="{height:contentHeight}">
      <index-card v-for="item in activityList" :key="item.id" :activity="item"></index-card>
    </scroll-view>
  </div>
</template>

<script>
import IndexCard from "@/components/index-card"
import { getActivity } from "@/api/api"
export default {
  name: 'recommend',
  props: {
    winHeight: Number
  },
  components: {
    IndexCard,
  },
  data() {
    return {
      test: 'test',
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
      getActivity()
        .then((res) => {
          console.log(res);
          this.activityList = res.data
        })
    }
  },
  created() {
    this.getActivity()
  },
};
</script>

<style scoped>

</style>
