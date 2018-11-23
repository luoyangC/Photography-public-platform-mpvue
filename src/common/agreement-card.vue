<template>
  <div class="a-card">
    <div class="a-card-header">
      <div class="a-card-header-info">
        <image  :src="agreement.user.image"></image>
        <div>
          <p class="a-card-header-user-name">{{agreement.user.nick_name || '匿名'}}</p>
          <p class="a-card-header-create-time">{{formatAgreementTime || '2018.11.06'}}</p>
        </div>
      </div>
      <div class="a-card-header-extra">
        <i-icon type="unfold" size="20" />
      </div>
    </div>
    <div class="a-card-tag">
      <span># {{getType}} #</span>
      <span v-if="agreement.amount != 0">{{agreement.amount}}元</span>
    </div>
    <div class="a-card-content">
      <text class="mui-ellipsis-5">{{agreement.content}}</text>
      <image-list :images="agreement.images"></image-list>
    </div>
    <hr>
    <div class="a-card-footer">
      <div>
        <i-icon size="20" type="coordinates" />
        <span>&nbsp;{{agreement.address.city}}</span>
      </div>
      <div>
        <i-icon size="20" type="interactive"/>
        <span>&nbsp;{{agreement.comment_nums}}</span>
      </div>
      <div>
        <i-icon size="20" type="send" />
        <span>&nbsp;{{agreement.send_nums}}</span>
      </div>
      <div>
        <i-icon size="20" type="more" />
      </div>
    </div>
  </div>
</template>

<script>
import ImageList from './image-list'
import { formatTime } from '../utils'
export default {
  name: 'agreement-card',
  components: {
    ImageList,
  },
  props: {
    agreement: Object
  },
  computed: {
    getType() {
      if (this.agreement.agreement_type == 'free') {
        return '希望互免'
      }
      else if (this.agreement.agreement_type == 'toll') {
        return '需要收费'
      }
    },
    formatAgreementTime() {
      return formatTime(this.agreement.create_time)
    }
  }
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
