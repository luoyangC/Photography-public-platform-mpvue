<template>
  <div class="agreement">
    <scroll-view scroll-y :style="{height:contentHeight}">
      <agreement-card v-for="item in agreementList" :key="item.id" :agreement="item"></agreement-card>
    </scroll-view>
  </div>
</template>

<script>
import AgreementCard from "@/components/agreement-card"
import { getAgreement } from "@/api/api"
export default {
  name: 'agreement',
  props: {
    winHeight: Number
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
  created() {
    this.getAgreement()
  }
};
</script>

<style scoped>
  .card-item {
  }
</style>
