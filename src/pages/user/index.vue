<template>
  <div class="user-page">
    <div class="user-info">
      <div v-if="user">
        <user-card :user="user"></user-card>
      </div>
      <div v-else>
        <i-button type="primary" open-type="getUserInfo" @click="handleOpen">授权登录</i-button>
        <i-modal :visible="visible" @ok="handleClose" @cancel="handleClose">
          <view>确认授权</view>
        </i-modal>
      </div>
    </div>
    <div>
      <div class="cell-group">
        <i-cell-group>
          <i-cell title="关注主题">
            <i slot="icon" class="iconfont">&#xe6db;</i>
          </i-cell>
          <i-cell title="我的收藏">
            <i slot="icon" class="iconfont">&#xe6ca;</i>
          </i-cell>
          <i-cell title="我的动态">
            <i slot="icon" class="iconfont">&#xe607;</i>
          </i-cell>
          <i-cell title="我的回复">
            <i slot="icon" class="iconfont">&#xe6b8;</i>
          </i-cell>
          <i-cell title="我的通知">
            <i slot="icon" class="iconfont">&#xe637;</i>
          </i-cell>
          <i-cell title="帮助反馈">
            <i slot="icon" class="iconfont">&#xe60b;</i>
          </i-cell>
        </i-cell-group>
      </div>
      <div class="cell-group">
        <i-cell-group>
          <i-cell title="关联账号">
            <i slot="icon" class="iconfont">&#xe61d;</i>
          </i-cell>
          <i-cell title="开启认证">
            <i slot="icon" class="iconfont">&#xe982;</i>
          </i-cell>
          <i-cell title="夜间模式">
            <i slot="icon" class="iconfont">&#xe6c1;</i>
            <i-switch slot="footer" :value="night" @change="onNight" />
          </i-cell>
        </i-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { getActivity, login } from "../../api/api";
import UserCard from './components/card'

export default {
  components: {
    UserCard,
  },
  data () {
    return {
      visible: false,
      user: this.$store.state.userInfo.user,
      night: false
    }
  },
  methods: {
    onNight() {
      this.night = !this.night
    },
    handleClose(e) {
      this.visible = false;
      if ( e.mp.type == 'ok' ) {
        wx.login({ success: (res) => {
          const code = res.code;
          wx.getUserInfo({ success: (res) => {
            const encryptedData = res.encryptedData;
            const iv = res.iv;
            login({code:code, encryptedData:encryptedData, iv:iv})
              .then((res) => {
                console.log(res);
                this.user = res.data.userInfo;
                wx.setStorage({key:"token", data:res.data.token});
                wx.setStorage({key:"user", data:res.data.userInfo})
              })
            } });
          }})
      } else {
        console.log('cancel')
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
  },
};
</script>

<style scoped>
  .user-page {
    background-color: #f9f9f9;
  }
  .user-info {
    padding-top: 20px;
  }
  .cell-group {
    margin-top: 20px;
  }
</style>
