<template>
  <div>
    <div class="add-list">
      <div class="add-item" @click="addImage"><i class="iconfont">&#xe717;</i>&nbsp;图片</div>
      <div class="add-item"><i class="iconfont">&#xe6f6;</i>&nbsp;连接</div>
      <div class="add-item" @click="addActivity"><i class="iconfont">&#xe6f5;</i>&nbsp;发送</div>
    </div>
    <div class="new-input">
      <textarea :type="text" :cursor-spacing="10" :maxlength='-1' :show-confirm-bar="false" v-model="content" :placeholder="placeholder"/>
    </div>
    <div class="image-list">
      <div :class="{'image-item-center': i==1 || i==4 || i==7}" class="image-item" v-for="(image, i) in tempFilePaths" :key="i">
        <image :src="image" mode="aspectFill"></image>
      </div>
    </div>
    <div class="cell-group">
      <i-cell-group>
        <i-cell v-if="topic" :title="topic.title" is-link url="/pages/topic/main">
          <i slot="icon" class="iconfont">&#xe706;</i>
        </i-cell>
        <i-cell v-else title="添加主题（选合适的主题会被更多人发现哦）" is-link url="/pages/topic/main">
          <i slot="icon" class="iconfont">&#xe706;</i>
        </i-cell>
        <i-cell title="添加位置" is-link url="/pages/account/main">
          <i slot="icon" class="iconfont">&#xe610;</i>
        </i-cell>
      </i-cell-group>
    </div>
  </div>
</template>

<script>
import ImageList from '@/common/image-list'
import { addActivity } from '../../api'
import { uploadimg } from '../../utils'
export default {
  components: {
    ImageList,
  },
  data() {
    return {
      content: '',
      placeholder: '想到什么，记录一下',
      tempFilePaths: [],
      topic: null,
    }
  },
  methods: {
    addActivity() {
      let that = this
      let data = {
        content: this.content,
        activity_type: 'original',
        topic:this.topic ? this.topic.id : null,
        source_link: null,
      }
      addActivity(data)
      .then((res) => {
        console.log(res)
        uploadimg({url:'http://127.0.0.1:8000/api/v1/photo/', path:this.tempFilePaths, id:res.data.id})
        this.tempFilePaths = []
        wx.navigateBack({
          delta: 1
          })
        })
      .catch((err) => {
        console.log(err)
        })
    },
    addImage() {
      wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.tempFilePaths = res.tempFilePaths
      }
    })
    },
  },
  onShow() {
    this.topic = this.$store.state.curTopic
  },
  onUnload() {
    this.$store.commit('SET_TOPIC', null);
  }
}
</script>

<style lang="scss" scoped>
  .new-input {
    height: 150px;
    padding: 15px;
    margin-top: 60px;
    background-color: white;
    textarea {
      width: 100%;
      font-size: 14px;
    }
  }
  .cell-group {
    margin-top: 10px;
  }
  .add-list {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 36px;
    top: 0;
    z-index: 999;
    font-size: 14px;
    padding: 10px 0;
    background-color: white;
    box-shadow: 0 1rpx 6rpx #ccc;
    .add-item {
      display: flex;
      align-items: center;
      color: #0084ff;
      .iconfont {
        font-size: 20px
      }
    }
  }
  .image-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px 15px;
  }
  .image-item {
    width: 33%;
    image {
      width: 100%;
      height: 110px;
    }
  }
  .image-item-center {
    width: 33%;
    margin: 0 0.5%;
    image {
      width: 100%;
      height: 110px;
    }
   }
</style>
