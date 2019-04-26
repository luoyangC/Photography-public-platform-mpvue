<template>
  <div class="agreement">
    <scroll-view scroll-y :style="{height:contentHeight}" @scrolltolower="loadMore">
      <div v-for="item in agreementList" :key="item.id">
        <agreement-card :agreement="item"></agreement-card>
      </div>
      <div>
        <m-loadmore v-if="isLoadEnd" text="到底啦..."/>
        <m-loadmore v-else text="正在努力加载中..." :icon="true"/>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import AgreementCard from "@/common/agreement-card"
import { getAgreement } from "@/api/index"

export default {
  name: 'agreement',
  props: {
    winHeight: Number,
  },
  components: {
    AgreementCard,
  },
  data() {
    return {
      agreementList: [],
      nextPage: 'https://www.luoyangc.cn/api/v1/activity/',
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
    // 获取约拍
    async getAgreement() {
      let {data} = await getAgreement()
      this.agreementList = data.results
      this.nextPage = data.next
    }
  },
  onLoad() {
    this.getAgreement()
  }
};
</script>
