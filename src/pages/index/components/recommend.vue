<template>
  <div>
    <scroll-view scroll-y :style="{height:contentHeight}" @scrolltolower="loadMore">
      <div v-for="item in activityList" :key="item.id">
        <index-card :activity="item"></index-card>
      </div>
      <div>
        <m-loadmore v-if="isLoadEnd" text="到底啦..."/>
        <m-loadmore v-else text="正在努力加载中..." :icon="true"/>
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
      activityList: [],
      nextPage: 'http://www.luoyangc.cn/api/v1/activity/',
    };
  },
  computed: {
    contentHeight() {
      return this.winHeight - 50 + "px";
    },
    isLoadEnd() {
      if (this.nextPage) return false
      else return true
    }
  },
  methods: {
    // 加载更多
    async loadMore() {
      if (this.nextPage) {
        // let {data} = await this.$fly.get('https' + this.nextPage.slice(4))
        let {data} = await this.$fly.get(this.nextPage)
        this.nextPage = data.next
        data.results.forEach(element => {
          this.activityList.push(element)
        })
      }
    },
    // 获取动态
    async getActivity() {
      let {data} = await getActivity({activity_type:'original'})
      this.activityList = data.results
      this.nextPage = data.next
    }
  },
  onLoad() {
    this.getActivity()
  }
};
</script>
