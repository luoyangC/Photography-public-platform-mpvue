<template>
  <div>
    <div v-if="user">
      <user-card :user="user"></user-card>
    </div>
    <div v-else>
      <i-button type="primary" open-type="getUserInfo" @click="handleOpen">授权登录</i-button>
      <i-modal :visible="visible" @ok="handleClose" @cancel="handleClose">
        <view>确认授权</view>
      </i-modal>
    </div>
    <div>
      <i-cell-group>
        <i-cell title="我关注的主题" is-link></i-cell>
        <i-cell title="我的收藏"></i-cell>
        <i-cell title="我的通知"></i-cell>
        <i-cell title="帮助与反馈"></i-cell>
      </i-cell-group>
      <i-cell-group>
        <i-cell title="我创建的主题"></i-cell>
        <i-cell title="免流量">
          <switch slot="footer" checked />
        </i-cell>
      </i-cell-group>
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
      user: this.$store.state.userInfo.user
    }
  },
  methods: {
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
</style>
