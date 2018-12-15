<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="invite-list">
      <div class="invite-item" v-for="invite in inviteList" :key="invite.id">
        <invite-card :isAuthor="false" :invite="invite"></invite-card>
      </div>
    </div>
  </div>
</template>

<script>
import InviteCard from '@/common/invite-card'
import { getMessage } from '@/api'
export default {
  name: 'index',
  components: {
    InviteCard,
  },
  data() {
    return {
      inviteList: []
    }
  },
  methods: {
    getInviteList() {
      getMessage({real_invite:2,is_from:2,message_type:'invite'})
        .then((res) => {
          this.inviteList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  onLoad() {
    this.getInviteList()
  }
}
</script>

<style lang="scss" scoped>
  .invite-item {
    margin-bottom: 15px;
  }
</style>
