<template>
  <div class="detail">
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="detail-content">
      <agreement-card v-if="agreement" :agreement="agreement" :isDetail="true"></agreement-card>
    </div>
    <div class="detail-comment" id="comment">
      <comment-list v-if="agreement" :comments="comments" :agreementId="agreement.id"></comment-list>
    </div>
  </div>
</template>

<script>
import AgreementCard from '@/common/agreement-card'
import CommentList from '@/common/comment-list'
import { getAgreementById, getComment } from "@/api"
export default {
  name: 'index',
  components: {
    AgreementCard,
    CommentList,
  },
  data() {
    return {
      agreement: null,
      comments: null,
    }
  },
  methods: {
    getAgreement(id) {
      getAgreementById(id)
        .then((res) => {
          this.agreement = res.data;
        }).catch((err) => {
          console.log(err)
      })
    },
    getComment(id) {
      getComment({agreement: id})
        .then((res) => {
          this.comments = res.data
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  onLoad(option) {
    this.getAgreement(option.id)
    this.getComment(option.id)
  },
  onUnload() {
    this.agreement = null
    this.comments = null
  }
}
</script>

<style lang="scss" scoped>

</style>
