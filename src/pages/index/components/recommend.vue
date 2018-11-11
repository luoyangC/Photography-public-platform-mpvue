<template>
  <div>
    <scroll-view scroll-y :style="{height:contentHeight}">
      <div v-for="item in activityList" :key="item.id" @click="toDetail(item.id)">
        <index-card :activity="item"></index-card>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import IndexCard from "@/common/index-card"
import { getActivity } from "@/api/index"
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
    toDetail(id) {
      let url = `/pages/detail/main?id=${id}`;
      console.log(url);
      wx.navigateTo({ url })
    },
    getActivity() {
      getActivity({activity_type:'original'})
        .then((res) => {
          console.log(res);
          this.activityList = res.data
        })
    }
  },
  created() {
    this.getActivity()
  },
  onShow() {
    this.getActivity()
  }
};
</script>

<style scoped>

</style>
