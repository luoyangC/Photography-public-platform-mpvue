<template>
  <div class="a-card">
    <div class="a-card-header">
      <div class="a-card-header-info">
        <image  :src="agreement.user.image"></image>
        <div>
          <p class="a-card-header-user-name">{{agreement.user.nick_name || '匿名'}}</p>
          <p class="a-card-header-create-time">{{agreement.create_time || '2018.11.06'}}</p>
        </div>
      </div>
      <div class="a-card-header-extra">
        <i class="iconfont">&#xe74a;</i>
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
      <span><i class="iconfont">&#xe610;</i>&nbsp;{{agreement.address.city}}</span>
      <span><i class="iconfont">&#xe70c;</i>&nbsp;0</span>
      <span><i class="iconfont">&#xe614;</i>&nbsp;0</span>
      <span><i class="iconfont">&#xe710;</i></span>
    </div>
  </div>
</template>

<script>
import ImageList from './image-list'
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
