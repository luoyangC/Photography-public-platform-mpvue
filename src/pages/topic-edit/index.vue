<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="content-item">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  onLoad(option) {
  },
  onUnload() {
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: sticky;
  z-index: 500;
  top: 0;
  height: 50px;
  width: 100%;
  background-color: white;
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
  font-size: 12px;
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
  background-color: #f9f9f9;
  -webkit-overflow-scrolling: touch;
}
.content-item {
  // position: fixed;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 15px;
  background-color: #f9f9f9;
  textarea {
    width: 100%;
    background-color: white;
    border-top:1rpx solid #dddee1;
    box-shadow: 0 1rpx 6rpx #ccc;
  }
  .image-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
    margin-top: 15px;
    .image-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.3%;
      height: 125px;
      image {
        width: 95%;
        height: 95%;
      }
    }
  }
  .content-operate {
    margin-top: 15px;
  }
  .content-send {
    margin-top: 15px;
  }
}
</style>
