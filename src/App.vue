<script>
import { getUserInfo } from './api'
/* eslint-disable */
export default {
  methods: {
    // 获取系统信息
    getSystemInfo() {
      wx.getSystemInfo({
        success: (res) => { this.$store.commit('SET_SYSTEM', res)}
      })
    },
    // 获取用户信息
    async getUserInfo() {
      let {data} = await getUserInfo({self:2})
      this.$store.commit('SET_INFO', data.results[0])
    },
    // 获取定位信息
    getLocation() {
      wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/',
          data: {
            ak: 'DRF3LymHPGDm78IgIifgHqzH9t7ItZBM',
            location: `${res.latitude},${res.longitude}`,
            output: 'json',
          },
          success: (res) => {
            if (res.data.status == 0) {
              let add = res.data.result.addressComponent
              this.$store.commit('SET_LOCATION', [add.province, add.city, add.district])
            }
          }
        })
      }
      })
    },
    // 建立WebSocket连接
    connectSocket() {
      let token = wx.getStorageSync('token')
      if (token) {
        let messageSocket = wx.connectSocket({
          // url: 'wss://www.luoyangc.cn/wss/get/message/',
          url: 'ws://127.0.0.1:8000/get/message/',
          header:{
            'content-type': 'application/json',
            'authorization': token,
          },
          method:"GET",
          success: (e) => {
            console.log('webSocket连接',e)
          },
          fail: (e) => {
            console.log(e)
          }
        })
        messageSocket.onMessage((res) => {
          let messageList = JSON.parse(res.data)
          this.$store.commit('SET_MSGNUMS', messageList.length)
        })
        this.$store.commit('SET_WEBSOCKET', messageSocket)
      } else {
        console.log('请登陆')
      }
    },
  },
  onLaunch() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')

    this.getSystemInfo()
    this.getUserInfo()
    this.getLocation()
    this.connectSocket()
  },
};
</script>

<style lang="scss">
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
  src: url('//at.alicdn.com/t/font_904607_3w01l6xzy1i.eot');
  src: url('//at.alicdn.com/t/font_904607_3w01l6xzy1i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_904607_3w01l6xzy1i.woff') format('woff'),
  url('//at.alicdn.com/t/font_904607_3w01l6xzy1i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_904607_3w01l6xzy1i.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  display: inline-block;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: #f9f9f9;
}
hr {
  border-top:1rpx solid #dddee1;
  margin:0 15px;
}
.mui-ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  font-size: 14px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.mui-ellipsis-5 {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  font-size: 14px;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
