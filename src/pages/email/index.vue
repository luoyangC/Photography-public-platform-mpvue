<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="nav-bar">
      <block>
        <div :id="0" class="nav-bar-item" @click="tabClick">
          <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==0}">登录</div>
        </div>
        <div :id="1" class="nav-bar-item" @click="tabClick">
          <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==1}">注册</div>
        </div>
      </block>
    </div>
    <div class="swiper-content">
      <swiper class="content" duration="500" :style="{height:contentHeight}" :current="activeIndex" @change="swiperChange" @animationfinish="onAnimationFinish">
        <swiper-item>
          <i-panel title="登录">
            <div class="a-input">
              <div class="a-input-err">{{errMessage.username}}</div>
              <div class="a-input-err">{{errMessage.non_field_errors}}</div>
              <div class="a-input-model">
                <div class="a-input-title">邮箱</div>
                <input class="a-input-input" v-model="email" placeholder="请输入邮箱"/>
              </div>
            </div>
            <div class="a-input">
              <div class="a-input-err">{{errMessage.password}}</div>
              <div class="a-input-model">
                <div class="a-input-title">密码</div>
                <input class="a-input-input" type="password" v-model="password" placeholder="请输入密码"/>
              </div>
            </div>
            <i-button @click="login">登录</i-button>
          </i-panel>
        </swiper-item>
        <swiper-item>
          <i-panel title="注册">
            <div class="a-input">
              <div class="a-input-err">{{errMessage.email}}</div>
              <div class="a-input-model">
                <div class="a-input-title">邮箱</div>
                <input class="a-input-input" v-model="email" placeholder="请输入注册邮箱"/>
                <button @click="getEmailCode" size="mini">获取验证码</button>
              </div>
            </div>
            <div class="a-input">
              <div class="a-input-err">{{errMessage.username}}</div>
              <div class="a-input-model">
                <div class="a-input-title">用户名</div>
                <input class="a-input-input" v-model="username" placeholder="请设置用户名"/>
              </div>
            </div>
            <div class="a-input">
              <div class="a-input-err">{{errMessage.code}}</div>
              <div class="a-input-model">
                <div class="a-input-title">验证码</div>
                <input class="a-input-input" v-model="emailCode" placeholder="请输入邮箱验证码"/>
              </div>
            </div>
            <div class="a-input">
              <div class="a-input-err">{{errMessage.password}}</div>
              <div class="a-input-model">
                <div class="a-input-title">密码</div>
                <input class="a-input-input" type="password" v-model="password" placeholder="请设置用户密码"/>
              </div>
            </div>
            <i-button @click="register">注册</i-button>
          </i-panel>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { createUserByEmail, getEmailCode, getUserInfo, loginEmail } from "../../api/index";

export default {
  name: 'index',
  data() {
    return {
      email: '',
      password: '',
      username: '',
      activeIndex: 0,
      emailCode: '',
      errMessage: '',
    }
  },
  computed: {
    contentHeight() {
       return this.$store.state.systemInfo.windowHeight + "px";
    },
  },
  methods: {
    register() {
      createUserByEmail({username: this.username, email:this.email, code:this.emailCode, password:this.password})
        .then((res) => {
          wx.showToast({
            title: '恭喜完成注册，请在右侧登录',
            icon: 'none',
            duration: 3000,
            mask: true
          });
        }).catch((err) => {
          this.errMessage = err
      })
    },
    getEmailCode() {
      getEmailCode({email:this.email, send_type:'register'})
        .then((res) => {
          wx.showToast({
            title: '已发送邮箱验证码，请注意查收，验证码有效期为5分钟',
            icon: 'none',
            duration: 3000,
            mask: true
          });
        }).catch((err) => {
          console.log(err);
          this.errMessage = err
      })
    },
    async login() {
      let _login = await loginEmail({username:this.email, password:this.password})
      wx.setStorageSync('token', _login.data.token)
      let _user = await getUserInfo({self:2})
      this.$store.commit('SET_INFO', _user.data.results[0])
      wx.switchTab({ url: '/pages/user/main' })
    },
    tabClick(e) {
      this.activeIndex = e.currentTarget.id
    },
    swiperChange(e) {
      this.activeIndex = e.mp.detail.current
    },
    // 滑动完成的回调函数
    onAnimationFinish() {
      console.log("滑动完成.....")
    },
  },
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 500;
    top: 0;
    height: 50px;
    width: 100%;
  }
  .nav-bar-item {
    position: relative;
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 13px 0;
    text-align: center;
    font-size: 0;
  }
  .nav-bar-title {
    color: black;
    font-weight: 500;
    display: inline-block;
    font-size: 15px;
    max-width: 8em;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
  .nav-bar-on {
    color: #89c5de;
  }
  .content {
    box-sizing: border-box;
    padding-top: 50px;
    background-color: #f9f9f9;
    -webkit-overflow-scrolling: touch;
  }
  .a-input {
    display: flex;
    flex-direction: column;
    padding:7px 15px;
    color:#495060;
    box-sizing:border-box;
    border:0 solid #e9eaec;
    border-bottom-width:1px;
    left:15px;
    right:0;
    .a-input-err {
      color: red;
      font-size: 12px;
    }
    .a-input-model {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .a-input-title {
        color:#495060;
        min-width:65px;
        font-size: 14px;
        padding-right:10px
      }
      .a-input-input {
        flex:1;
        line-height:1.6;
        padding:4px 0;
        min-height:22px;
        height:auto;
        font-size:14px
      }
    }
  }
</style>
