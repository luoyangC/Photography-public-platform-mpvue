<script>
/* eslint-disable */
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    console.log('app created and cache logs by setStorageSync');
    // 获取token信息，写入vuex
    const token = wx.getStorageSync('token') || '';
    const user = wx.getStorageSync('user') || '';
    this.$store.commit('SET_INFO', {token:token, user:user})
  },
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
@font-face {
  font-family: 'iconfont';  /* project id 904607 */
  src: url('//at.alicdn.com/t/font_904607_gh1rfl5sfpk.eot');
  src: url('//at.alicdn.com/t/font_904607_gh1rfl5sfpk.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_904607_gh1rfl5sfpk.woff') format('woff'),
  url('//at.alicdn.com/t/font_904607_gh1rfl5sfpk.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_904607_gh1rfl5sfpk.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
