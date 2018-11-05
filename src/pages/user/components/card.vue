<template>
  <div class="a-card">
    <div class="a-card-content">
      <image class="a-card-thumb" :src="user.image" model="aspectFit"></image>
      <div class="a-card-title">
        <p>{{user.nick_name}}<i-tag :color="tagType.color">{{tagType.text}}</i-tag></p>
        <span>查看或编辑个人信息</span>
      </div>
    </div>
    <div class="a-card-extra">
      <i-icon type="enter" size="24"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    user: Object,
  },
  data() {
    return {
      user: null,
    }
  },
  computed: {
    tagType() {
      let approve = this.user.approve;
      if (approve == 'general') {
        return {color: 'default', text: '普通用户'}
      }
      if (approve == 'photographer') {
        return {color: 'yellow', text: '认证摄影'}
      }
      if (approve == 'model') {
        return {color: 'yellow', text: '认证模特'}
      }
    }
  },
}
</script>

<style>
  .a-card {
    display: flex;
    align-items: center;
    margin:0 16px;
    font-size:14px;
    background:#fff;
    border:1rpx solid #dddee1;
    border-radius:5px;
  }
  .a-card-content {
    flex:auto;
    text-align:left;
    padding: 10px;
  }
  .a-card-thumb {
    display:inline-block;
    width:50px;
    height:50px;
    position:relative;
    margin-left:auto;
    margin-right:auto;
    overflow:hidden;
    background-size:cover;
    vertical-align:middle;
    border-radius: 50px;
  }
  .a-card-title {
    display:inline-block;
    margin-left: 20px;
    font-size:16px;
    vertical-align:middle;
    color:#1c2438;
  }
  .a-card-title span {
    font-size: 12px;
  }
  .a-card-extra {
    flex:none;
    padding-right: 10px;
    text-align:right;
    font-size:24px;
    color:#80848f;
  }
</style>
