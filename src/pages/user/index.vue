<template>
  <div class="user-page">
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="user-info">
      <div v-if="user" class="user-info-card" @click="toUserInfo(user.id)">
        <user-card :user="user" ></user-card>
      </div>
      <div v-else class="user-info-button">
        <i-button type="primary" open-type="getUserInfo" @click="handleOpen">注册登录</i-button>
        <i-modal :visible="visible" ok-text="微信登录" cancel-text="邮箱登录" @ok="handleClick" @cancel="handleClick">
          <view>登录方式</view>
        </i-modal>
      </div>
    </div>
    <div>
      <div class="cell-group">
        <i-cell-group>
          <i-cell title="我的关注" is-link url="/pages/my-follows/main">
            <i slot="icon" class="iconfont">&#xe6db;</i>
          </i-cell>
          <i-cell title="我的收藏" is-link url="/pages/my-keeps/main">
            <i slot="icon" class="iconfont">&#xe6ca;</i>
          </i-cell>
           <i-cell title="我的邀请" is-link url="/pages/my-invites/main">
            <i slot="icon" class="iconfont">&#xe607;</i>
          </i-cell>
          <i-cell title="我的回复" is-link url="/pages/my-replies/main">
            <i slot="icon" class="iconfont">&#xe6b8;</i>
          </i-cell>
          <i-cell title="我的通知" is-link url="/pages/my-messages/main">
            <i slot="icon" class="iconfont">&#xe637;</i>
            <div slot="footer" class="message-footer" v-if="messageNums">{{messageNums}}</div>
          </i-cell>
        </i-cell-group>
      </div>
      <div class="cell-group">
        <i-cell-group>
          <i-cell title="账户设置" is-link url="/pages/account/main">
            <i slot="icon" class="iconfont">&#xe61d;</i>
          </i-cell>
          <i-cell title="开启认证">
            <i slot="icon" class="iconfont">&#xe982;</i>
          </i-cell>
          <i-cell title="夜间模式">
            <i slot="icon" class="iconfont">&#xe6c1;</i>
            <i-switch slot="footer" :value="night" @change="onNight" />
          </i-cell>
          <i-cell title="帮助反馈" is-link url="/pages/help/main">
            <i slot="icon" class="iconfont">&#xe60b;</i>
          </i-cell>
        </i-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { getActivity, loginWeixin, getUserInfo } from "@/api";
import { toUserDetail } from '@/router'
import UserCard from './components/card'

export default {
  components: {
    UserCard,
  },
  data () {
    return {
      visible: false,
      user: null,
      night: false,
      messageNums: 0,
    }
  },
  methods: {
    handleUserInfo() {
      console.log('userInfo')
    },
    onNight() {
      this.night = !this.night
    },
    handleClick(e) {
      this.visible = false
      if ( e.mp.type == 'ok' ) {
        wx.login({ success: (res) => {
          const code = res.code
          wx.getUserInfo({ success: (res) => {
            const iv = res.iv
            const encryptedData = res.encryptedData
            loginWeixin({code:code, encryptedData:encryptedData, iv:iv})
              .then((res) => {
                let token = res.data.token
                wx.setStorage({key:"token", data:token, success: () => {
                  getUserInfo({self:2}).then((res) => {
                    this.user = res.data[0]
                    this.$store.commit('SET_INFO', res.data[0])
                    console.log('get user info is success')
                    }).catch((err) => {
                      console.log(err)
                    })
                }})
              })
            } })
          }})
      } else {
        console.log(e)
        wx.navigateTo({
          url: '/pages/email/main'
        })
      }
    },
    handleOpen() {
      this.visible = true;
    },
    getData() {
      getActivity()
        .then((res) => {console.log(res)})
        .catch((err) => {console.log(err)})
    },
    toUserInfo(id) {
      toUserDetail(id)
    },
  },
  onShow() {
    this.user = this.$store.state.userInfo
    this.messageNums = this.$store.state.msgNums
    console.log('user on show')
  },
};
</script>

<style lang="scss" scoped>
  .user-page {
    background-color: #f9f9f9;
  }
  .user-info {
    padding-top: 10px;
  }
  .cell-group {
    margin-top: 10px;
  }
  .user-info-card {
    background-color: white;
    margin:0 15px;
    border-radius:6px;
    :active {
      background-color: #f9f9f9;
    }
  }
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
