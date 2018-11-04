<template>
  <div>
    <div>
      <i-card title="卡片标题" extra="额外内容" :thumb="user.image">
        <view slot="content">内容不错</view>
      </i-card>
    </div>
    <div>
      <i-button open-type="getUserInfo" @click="handleOpen" @getuserinfo="bindGetUserInfo">授权登录</i-button>
      <i-button @click="getData">获取data</i-button>
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

export default {
  data () {
    return {
      detail: null,
      code: null,
      visible: false,
      user: this.$store.state.userInfo.user
    }
  },
  methods: {
    handleClose(e) {
      console.log('close',e);
      this.visible = false;
      if ( e.mp.type == 'ok' ) {
        console.log('ok');
        wx.login({
          success: (res)=> {
            if (res.code){
              login({ code: res.code, detail:this.detail })
                .then((res)=> {
                console.log(res);
                this.detail = null;
                this.user = res.data.userInfo;
                wx.setStorage({key:"token", data:res.data.token});
                wx.setStorage({key:"user", data:res.data.userInfo})})
                .catch((err)=> {
                console.log(err)
              })
            } else {
              console.log('登录失败')
            }
          }})
      } else {
        console.log('cancel')
      }
    },
    handleOpen() {
      this.visible = true
    },
    getData() {
      getActivity()
        .then((res) => {console.log(res)})
        .catch((err) => {console.log(err)})
    },
    bindGetUserInfo (e) {
      this.detail = e.mp.detail;
    },
  },
};
</script>

<style scoped>
</style>
