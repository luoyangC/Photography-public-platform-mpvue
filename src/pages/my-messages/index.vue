<template>
  <div class="my-message">
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="cell-group">
      <i-cell-group>
        <i-cell title="收到的私信" is-link url="/pages/message/main?type=letter">
          <i slot="icon" class="iconfont">&#xe6db;</i>
          <div slot="footer" class="message-footer" v-if="letterNums">{{letterNums}}</div>
        </i-cell>
        <i-cell title="收到的邀请" is-link url="/pages/message/main?type=invite">
          <i slot="icon" class="iconfont">&#xe6ca;</i>
          <div slot="footer" class="message-footer" v-if="inviteNums">{{inviteNums}}</div>
        </i-cell>
        <i-cell title="收到的回复" is-link url="/pages/message/main?type=reply">
          <i slot="icon" class="iconfont">&#xe607;</i>
          <div slot="footer" class="message-footer" v-if="replyNums">{{replyNums}}</div>
        </i-cell>
        <i-cell title="系统的通知" is-link url="/pages/message/main?type=notice">
          <i slot="icon" class="iconfont">&#xe637;</i>
          <div slot="footer" class="message-footer" v-if="noticeNums">{{noticeNums}}</div>
        </i-cell>
      </i-cell-group>
    </div>
  </div>
</template>

<script>
import { getMessage } from '@/api';
export default {
  name: "index",
  data() {
    return {
      letterNums: 0,
      inviteNums: 0,
      replyNums: 0,
      noticeNums: 0,
    }
  },
  methods: {
    // ('letter', '私信'),
    // ('invite', '邀请'),
    // ('reply', '回复'),
    // ('notice', '通知')
    getMessageList() {
      getMessage({message_type:'letter', read:false, is_from:3, is_to:2})
        .then((res) => {this.letterNums = res.data.length})
        .catch((err) => {console.log(err)})
      getMessage({message_type:'invite', read:false, is_from:3, is_to:2})
        .then((res) => {this.inviteNums = res.data.length})
        .catch((err) => {console.log(err)})
      getMessage({message_type:'reply', read:false, is_from:3, is_to:2})
        .then((res) => {this.replyNums = res.data.length})
        .catch((err) => {console.log(err)})
      getMessage({message_type:'notice', read:false, is_from:3, is_to:2})
        .then((res) => {this.noticeNums = res.data.length})
        .catch((err) => {console.log(err)})
    }
  },
  onLoad() {
    this.getMessageList()
    this.$store.commit('SET_MSGNUMS', 0)
  }
};
</script>

<style lang="scss" scoped>
  .message-footer {
    text-align: center;
    font-size: 10px;
    width: 15px;
    height: 15px;
    line-height: 15px;
    background-color: #EA5149;
    border-radius: 10px;
    color: white;
  }
</style>
