<template>
  <div class="a-card" @click="toAgreementDetail(agreement.id)">
    <div class="a-card-header">
      <div class="a-card-header-info">
        <image :src="agreement.user.image" @click.stop="toUserDetail(agreement.user.id)"></image>
        <div>
          <p class="a-card-header-user-name" @click.stop="toUserDetail(agreement.user.id)">{{agreement.user.nick_name || '匿名'}}</p>
          <p class="a-card-header-create-time">{{formatAgreementTime || '2018.11.06'}}</p>
        </div>
      </div>
      <div class="a-card-header-extra">
        <i-icon type="unfold" size="20" />
      </div>
    </div>
    <div class="a-card-tag">
      <span># {{getType}} #</span>
      <span v-if="agreement.amount != 0">{{agreement.amount}}¥</span>
    </div>
    <div class="a-card-content">
      <text class="mui-ellipsis-5">{{agreement.content}}</text>
      <image-list :images="agreement.images"></image-list>
    </div>
    <hr>
    <div class="a-card-footer">
      <div>
        <i-icon size="20" type="coordinates" @click.stop />
        <span>&nbsp;{{agreement.address.city}}</span>
      </div>
      <div>
        <i-icon v-if="agreement.is_comment" size="20" type="interactive_fill" color="#EA5149"/>
        <i-icon v-else size="20" type="interactive"/>
        <span>&nbsp;{{agreement.comment_nums}}</span>
      </div>
      <div>
        <i-icon v-if="agreement.is_message" size="20" type="send" color="#EA5149" @click.stop="toMessage(agreement)" />
        <i-icon v-else size="20" type="send" @click.stop="toMessage(agreement)" />
        <span>&nbsp;{{agreement.message_nums}}</span>
      </div>
      <div>
        <i-icon size="20" type="more" @click.stop />
      </div>
    </div>
  </div>
</template>

<script>
import ImageList from './image-list'
import { formatTime } from '@/utils'
import { toUserDetail, toMessageList, toMessageDetail, toAgreementDetail } from '@/router'
export default {
  name: 'agreement-card',
  components: {
    ImageList,
  },
  props: {
    agreement: Object,
    isDetail: Boolean,
  },
  computed: {
    getType() {
      if (this.agreement.agreement_type == 'free') {
        return '希望互免'
      }
      else if (this.agreement.agreement_type == 'toll') {
        return '需要收费'
      }
      else if (this.agreement_type == 'paid') {
        return '愿意付费'
      }
    },
    formatAgreementTime() {
      return formatTime(this.agreement.create_time)
    }
  },
  methods: {
    toUserDetail(id) {toUserDetail(id)},
    toMessage(agreement) {
      if (this.agreement.is_author) {
        toMessageList(agreement.id,'invite')
        }
      else {
        toMessageDetail(agreement.id,'invite',agreement.user.id)
        }
    },
    toAgreementDetail(id) {toAgreementDetail(id)},
  },
}
</script>

<style lang="scss" scoped>
  .a-card {
    display: flex;
    flex-direction: column;
    margin:10px 0;
    background-color: white;
  }
  .a-card-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding:15px;
    font-size:12px;
    align-items:center;

  }
  .a-card-header-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .a-card-header-info image {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-right: 8px;
  }
  .a-card-content {
    padding:15px;
    color:#495060;
    font-size:14px;
  }
  .a-card-tag {
    display: flex;
    justify-content: flex-start;
    padding: 0 15px;
    span {
      font-size:15px;
      margin-right: 10px;
      color: #888;
    }
  }
  .a-card-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding:15px;
    color:#80848f;
    font-size:12px;
  }
</style>
