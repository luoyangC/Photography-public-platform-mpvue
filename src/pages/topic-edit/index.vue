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
