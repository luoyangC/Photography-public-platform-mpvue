<template>
  <div class="invite-card">
    <i-card :title="invite.content" :extra="formatInviteTime">
      <div class="agreement-content" slot="content">
        <div class="content-user-info" style="padding-top:8px">
          <i-avatar :src="invite.from_user.image" size="default" shape="circle"></i-avatar>
          <span style="margin-left:8px">{{invite.from_user.nick_name}}&nbsp;发布</span>
        </div>
      </div>
      <div slot="footer" v-if="isAuthor && invite.answer==2" style="display:flex;justify-content: space-between;">
        <m-btn size="small" btn-style="background: #0084ff;border-radius: 66rpx;color: #fff;" @click.stop="answerHandle({type:'ok'})">接受</m-btn>
        <m-btn size="small" btn-style="background: #EA5149;border-radius: 66rpx;color: #fff;" @click.stop="answerHandle({type:'cancel'})">拒绝</m-btn>
      </div>
      <div slot="footer" v-if="!isAuthor && invite.answer==2">
        <span>等待对方回复</span>
      </div>
      <div slot="footer" v-if="invite.answer==3">
        <span>已同意</span>
      </div>
      <div slot="footer" v-if="invite.answer==4">
        <span>已拒绝</span>
      </div>
    </i-card>
  </div>
</template>

<script>
import { upMessage } from '@/api'
import { formatTime } from '@/utils'
export default {
  name: 'invite-card',
  props: {
    isAuthor: Boolean,
    invite: Object,
  },
  mounted() {
    console.log(this.isAuthor)
    console.log(this.invite)
  },
  computed: {
    formatInviteTime() {
      return formatTime(this.invite.create_time)
    }
  },
  methods: {
    answerHandle({type}) {
      if (type == 'ok' && this.invite && this.isAuthor) {
        let data = this.invite
        data.answer = 3
        upMessage(this.invite.id,data)
          .then((res) => {
            console.log('ok')
            this.invite.answer = 3
          })
          .catch((err) => {
            console.log(err)
          })
      }
      else if (type == 'cancel' && this.invite && this.isAuthor) {
        let data = this.invite
        data.answer = 4
        upMessage(this.invite.id, data)
          .then((res) => {
            this.invite.answer = 4
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  }
}
</script>

<style lang="sass" scoped>

</style>


