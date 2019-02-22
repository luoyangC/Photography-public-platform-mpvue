<template>
  <div class="agreement">
    <scroll-view scroll-y :style="{height:contentHeight}">
      <div class="agreement-title">
        <picker mode="region" :value="location" @change="cityChange">
          <i-icon size="20" color="#EA5149" type="coordinates" />
          <p>当前定位城市：<span>{{location[1]}}</span></p>
        </picker>
      </div>
      <agreement-card v-for="item in agreementList" :key="item.id" :agreement="item"></agreement-card>
      <div class="agreement-more">———— 没有更多啦～ ————</div>
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
      location: ['江苏省', '南京市', '浦口区'],
    };
  },
  computed: {
    contentHeight() {
      return this.winHeight -100 + "px";
    },
  },
  methods: {
    cityChange(e) {
      this.location = e.mp.detail.value
    },
    async getAgreement(search) {
      let {data} = await getAgreement({search:search})
      this.agreementList = data.results
    }
  },
  onLoad() {
    this.getAgreement('')
    this.location = this.$store.state.location
  }
};
</script>

<style lang="scss" scoped>
  .agreement-title {
    padding: 8px 15px 8px 15px;
    margin-bottom: -10px;
    font-size: 14px;
    p {
      display: inline;
      margin-left: 4px;
      span {
        color: #0084ff;
      }
    }
  }
  .agreement-more {
    font-size: 12px;
    color: #666;
    padding: 20px;
    text-align: center;
  }
</style>