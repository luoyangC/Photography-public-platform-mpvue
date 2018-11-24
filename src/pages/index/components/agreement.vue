<template>
  <div class="agreement">
    <scroll-view scroll-y :style="{height:contentHeight}">
      <agreement-card v-for="item in agreementList" :key="item.id" :agreement="item"></agreement-card>
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
    };
  },
  computed: {
    contentHeight() {
      return this.winHeight - 50 + "px";
    },
  },
  methods: {
    getAgreement() {
      getAgreement().then((res) => {
        console.log(res);
        this.agreementList = res.data
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  onLoad() {
    this.getAgreement()
  }
};
</script>

<style lang="scss" scoped>
  .card-item {
  }
</style>
