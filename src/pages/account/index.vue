<template>
  <div>
    <div class="cell-group">
      <i-cell-group>
        <i-cell title="当前登录模式" label="微信登录">
        </i-cell>
      </i-cell-group>
    </div>
    <div class="cell-group">
      <i-cell-group>
        <i-cell title="关联微信账号">
          <i-switch slot="footer" :value="atWeixin"/>
        </i-cell>
        <i-cell title="关联邮箱账号">
          <i-switch slot="footer" :value="atEmail"/>
        </i-cell>
        <i-cell title="退出当前登录" @click="logOut">
        </i-cell>
        <i-modal :visible="visible" @ok="handleClose" @cancel="handleClose">
          <view>确认注销</view>
        </i-modal>
      </i-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      atWeixin: true,
      atEmail: false,
      visible: false,
    }
  },
  methods: {
    logOut() {
      this.visible = true;
    },
    handleClose(e) {
      if ( e.mp.type == 'ok' ) {
        wx.removeStorageSync('token')
        this.$store.commit('SET_INFO', null)
        wx.switchTab({ url: '/pages/user/main' })
      }
      this.visible = false
    },
  }
}
</script>

<style lang="scss" scoped>
  .cell-group {
    margin-top: 10px;
  }
</style>
