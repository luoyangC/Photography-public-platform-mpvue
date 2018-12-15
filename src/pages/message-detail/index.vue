<template>
  <div class="message-detail">
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="message-list" v-if="messageType=='invite' && agreement && inviteList">
      <div class="message-agreement-info" v-if="agreement">
        <i-card :title="agreement.agreement_type" :extra="agreement.create_time">
          <div class="agreement-content" slot="content">
            <div class="content-text">
              <text>{{agreement.content}}</text>
            </div>
            <div class="content-user-info" style="padding-top:8px">
              <i-avatar :src="agreement.user.image" size="default" shape="circle"></i-avatar>
              <span style="margin-left:8px">{{agreement.user.nick_name}}&nbsp;发布</span>
            </div>
          </div>
          <div slot="footer" v-if="!agreement.is_author">
            <span v-if="answerMessage">以发送邀请</span>
            <span v-else style="color:#0084ff" @click.stop="inviteHandleOpen" >发送邀请</span>
          </div>
        </i-card>
      </div>
      <div class="message-answer-info" v-if="answerMessage">
        <!-- <i-card :title="answerMessage.content" :extra="answerMessage.create_time">
          <div class="agreement-content" slot="content">
            <div class="content-user-info" style="padding-top:8px">
              <i-avatar :src="answerMessage.from_user.image" size="default" shape="circle"></i-avatar>
              <span style="margin-left:8px">{{answerMessage.from_user.nick_name}}&nbsp;发布</span>
            </div>
          </div>
          <div slot="footer" v-if="agreement.is_author && answerMessage.answer==2" style="display:flex;justify-content: space-between;">
            <m-btn size="small" btn-style="background: #0084ff;border-radius: 66rpx;color: #fff;" @click.stop="answerHandle({type:'ok'})">接受</m-btn>
            <m-btn size="small" btn-style="background: #EA5149;border-radius: 66rpx;color: #fff;" @click.stop="answerHandle({type:'cancel'})">拒绝</m-btn>
          </div>
          <div slot="footer" v-if="!agreement.is_author && answerMessage.answer==2">
            <span>等待对方回复</span>
          </div>
          <div slot="footer" v-if="answerMessage.answer==3">
            <span>已同意</span>
          </div>
          <div slot="footer" v-if="answerMessage.answer==4">
            <span>已拒绝</span>
          </div>
        </i-card> -->
        <invite-card :isAuthor="agreement.is_author" :invite="answerMessage"></invite-card>
      </div>
      <div class="message-item" 
          :class="message.from_user.id == userInfo.id ? 'item-right' : 'item-left'" 
          v-for="message in inviteList" :key="message.id">
        <div class="message-image">
          <i-avatar :src="message.from_user.image" size="default" shape="circle"></i-avatar>
        </div>
        <div class="message-content">
          <text class="message-content-text">{{message.content}}</text>
        </div>
      </div>
    </div>
    <div class="message-list" v-if="messageType=='letter' && letterList">
      <div class="message-item" 
          :class="message.from_user.id == userInfo.id ? 'item-right' : 'item-left'" 
          v-for="message in letterList" :key="message.id">
        <div class="message-image">
          <i-avatar :src="message.from_user.image" size="default" shape="circle"></i-avatar>
        </div>
        <div class="message-content">
          <text class="message-content-text">{{message.content}}</text>
        </div>
      </div>
    </div>
    <div class="message-input">
      <div class="message-icon">
        <i-icon size="20" type="emoji" />
      </div>
      <textarea :type="text" :fixed="true" :cursor-spacing="10" :auto-height="true" :show-confirm-bar="false"
                v-model.lazy="content" @blur="blured" :focus="focus" :placeholder="placeholder"/>
      <span @click.stop="handleSendMessage">发送</span>
    </div>
    <div class="message-modal">
      <i-modal title="确认发送邀请" :visible="inviteVisible" @ok="inviteHandleClose" @cancel="inviteHandleClose">
      </i-modal>
    </div>
  </div>
</template>

<script>
import InviteCard from '@/common/invite-card'

import {getAgreementById, getMessage, addMessage, upMessage} from '@/api'
import { formatTime } from '@/utils'
export default {
  name: 'index',
  components: {
    InviteCard,
  },
  data() {
    return {
      agreement: null,
      messageType: '',
      inviteList: [],
      letterList: [],
      answerMessage: null,
      userInfo: null,
      otherInfo: null,
      focus: false,
      content: '',
      placeholder: '可以在此输入额外的内容，请友善交流',
      inviteVisible: false
    }
  },
  methods: {
    answerHandle({type}) {
      if (type == 'ok' && this.answerMessage && this.agreement.is_author) {
        let data = this.answerMessage
        data.answer = 3
        upMessage(this.answerMessage.id,data)
          .then((res) => {
            console.log('ok')
            this.answerMessage.answer = 3
          })
          .catch((err) => {
            console.log(err)
          })
      }
      else if (type == 'cancel' && this.answerMessage && this.agreement.is_author) {
        let data = this.answerMessage
        data.answer = 4
        upMessage(this.answerMessage.id, data)
          .then((res) => {
            this.answerMessage.answer = 4
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    inviteHandleClose({type}) {
      if (type == 'ok' && !this.answerMessage && !this.agreement.is_anthor) {
        let data = {
          to_user:this.agreement.user.id,
          content:"你好，非常希望与你达成合作",
          message_type:"invite",
          answer:2,
          agreement:this.agreement.id
        }
        addMessage(data)
          .then((res) => {
            res.data.create_time = formatTime(res.data.create_time)
            this.answerMessage = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      }
      this.inviteVisible = false
    },
    inviteHandleOpen() { 
      this.inviteVisible = true
    },
    handleSendMessage() {
      setTimeout(() => {
        let data = {
          to_user:this.otherInfo,
          content:this.content,
          message_type:"invite",
          answer:1,
          agreement:this.agreement.id
        }
        addMessage(data)
          .then((res) => {
            this.inviteList.push(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
        this.content = ''
      }, 100);
    },
    getAgreement(id) {
      getAgreementById(id)
        .then((res) => {
          let type = res.data.agreement_type
          let amount = res.data.amount
          if (type == 'free') {
            res.data.agreement_type = '希望互免'
          }
          else if (type == 'toll') {
            res.data.agreement_type = `需要收费 ${amount} ￥`
          }
          else if (type == 'paid') {
            res.data.agreement_type = `可以付费 ${amount} ￥`
          }
          res.data.create_time = formatTime(res.data.create_time)
          this.agreement = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getLetterList(other) {
      getMessage({other:other, message_type:'letter'})
        .then((res) => {
          this.letterList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getInviteList(agreement,other) {
      getMessage({agreement,other, message_type:'invite'})
        .then((res) => {
          let inviteList = res.data
          inviteList.forEach(element => {
            if (element.answer > 1) {
              this.answerMessage = element
              inviteList.splice(inviteList.indexOf(element), 1)
            }
          });
          console.log(inviteList)
          this.inviteList = inviteList
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  onLoad(option) {
    this.messageType = option.type
    this.otherInfo = option.other
    this.userInfo = this.$store.state.userInfo
    if (option.type == 'invite') {
      this.getInviteList(option.agreement,option.other)
      this.getAgreement(option.agreement)
    }
    if (option.type == 'letter') {
      this.getLetterList(option.other)
    }
  },
  onUnload() {
    this.messageType = ''
    this.agreement = null
    this.inviteList = []
    this.answerMessage = null
  }
}
</script>

<style lang="scss" scoped>
  .message-list {
    padding: 15px;
    .message-agreement-info {
      margin-bottom: 15px;
    }
    .message-answer-info {
      margin-bottom: 15px;
    }
    .message-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 16rpx;
      .message-image {
        order: 1
      }
      .message-content {
        font-size: 14px;
        border:1rpx solid #dddeee;
        border-radius:30rpx;
        padding: 16rpx;
        margin: 0 16rpx;
        .message-content-footer {
          margin-top: 8rpx;
          display: flex;
          justify-content: space-between;
      }
      }
    }
    .item-left {
      justify-content: flex-start;
      color: #000;
      .message-content {
        order: 2;
        background-color: #fff;
      }
    }
    .item-right {
      justify-content: flex-end;
      color: #fff;
      .message-content {
        order: 0;
        background-color: #0084ff;
      }
    }
  }
  .message-input {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    bottom: 0;
    z-index: 202;
    font-size: 14px;
    padding: 10px 0;
    width: 100%;
    background-color: #f9f9f9;
    border-top:1rpx solid #dddee1;
    box-shadow: 0 1rpx 6rpx #ccc;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    .message-icon {
      width: 10%;
      margin: 0 15px;
      line-height: 30px;
      font-size: 20px;
      color: #0084ff;
      align-self: flex-end;
    }
     textarea {
      width: 80%;
      line-height: 30px;
    }
    span {
      width: 10%;
      margin: 0 15px;
      line-height: 30px;
      color: #0084ff;
      align-self: flex-end;
    }
  }
  .message-mask{
    width:100%;
    height:100%;
    position:fixed;
    background-color:#999;
    z-index:201;
    top:0;
    left:0;
    opacity:0.5;
    -moz-opacity: 0.7;  
    opacity: 0.70;  
    filter: alpha(opacity=70); 
  }
</style>
