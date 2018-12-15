<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="content-item">
      <textarea :type="text" :cursor-spacing="10" :maxlength='-1' :show-confirm-bar="false" v-model="content" :placeholder="placeholder"/>
      <div class="share-card" v-if="editorType == 'share' && activity" @click="toActivityDetail(activity.id,false)">
        <div class="share-text">
          <a ref="#">@{{activity.user.nick_name}}：</a>
          <text class="mui-ellipsis-5">{{activity.content}}</text>
        </div>
        <div class="share-info">
          <span>点赞{{activity.like_nums}} | </span>
          <span>评论{{activity.comment_nums}} | </span>
          <span>转发{{activity.share_nums}}</span>
        </div>
        <div class="share-image">
          <image-list :images="activity.images"></image-list>
        </div>
      </div>
      <div class="image-list" v-else>
        <div class="image-item" v-for="(image, i) in tempFilePaths" :key="i">
          <image :src="image" mode="aspectFill"></image>
        </div>
        <div class="image-item" @click="addImage" v-if="imageNums != 9">
          <image src="/static/img/add.png" mode="aspectFill" style="width: 60px;height: 60px;"></image>
        </div>
        <div class="image-item" style="width: 66.6%;height: 125px" v-if="imageNums == 0">
          <p>点击左侧加号添加图片</p>
          <p>发无关图、色情图将会被禁言</p>
        </div>
      </div>
      <div class="content-operate">
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
      <div class="content-send">
        <button v-if="editorType == 'add'" type="warn" @click="addActivity">发送</button>
        <button v-if="editorType == 'update'" type="warn" @click="upActivity">修改</button>
        <button v-if="editorType == 'share'" type="warn" @click="shareActivity">分享</button>
      </div>
    </div>
  </div>
</template>

<script>
import ImageList from '@/common/image-list'
import { getActivityById, addActivity, upActivity } from '@/api'
import { uploadimg } from '@/utils'
export default {
  components: {
    ImageList,
  },
  data() {
    return {
      windowHeight: 0,
      activity: null,
      editorType: 'add',
      content: '',
      placeholder: '想到什么，记录一下',
      tempFilePaths: [],
      imageNums: 0,
      topic: null,
    }
  },
  computed: {
    swiperHeight() {
      return this.windowHeight + 100 + "px";
    }
  },
  methods: {
    shareActivity() {
      let data = {
        content: this.content,
        activity_type: 'forward',
        topic:this.topic ? this.topic.id : null,
        source_link: this.activity.id,
      }
      addActivity(data).then((res)=> {
        wx.navigateBack({
          delta: 1,
          success: () => {
            wx.showToast({
              title: '转发成功',
              icon: 'success',
              duration: 2000
            })
          } })
      }).catch((err) => {
        console.log(err)
      })
    },
    upActivity() {
      let data = this.activity
      data.content = this.content
      data.topic = this.topic
      upActivity(data.id, data).then((res) => {
       wx.navigateBack({
          delta: 1,
          success: () => {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
          } })
      }).catch((err) => {
        console.log(err)
      })
    },
    addActivity() {
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
          delta: 1,
          success: () => {
            wx.showToast({
              title: '转发成功',
              icon: 'success',
              duration: 2000
            })
          } })
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
        this.imageNums = res.tempFilePaths.length
        console.log(this.tempFilePaths)
      }
    })
    },
    getActivity(id, type) {
      getActivityById(id).then((res) => {
        if (type == 'activity') {
          this.activity = res.data
          this.editorType = 'update'
          this.content = res.data.content
          this.topic = res.data.topic
          res.data.images.forEach(element => {
            this.tempFilePaths.push(element.image)
          });
          this.imageNums = res.data.images.length
        } else {
          this.activity = res.data
          this.editorType = 'share'
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getSystemInfo() {
      wx.getSystemInfo({
        success: (res) => {
          this.windowHeight = res.windowHeight
          }
      })
    },
  },
  onShow() {
    this.topic = this.$store.state.curTopic
  },
  onLoad(option) {
    this.getSystemInfo()
    if (option.id != 0) {
      this.getActivity(option.id, option.type)
    } else {
      this.editorType = 'add'
    }
  },
  onUnload() {
    this.imageNums = 0
    this.editorType = 'add'
    this.activity = null
    this.content = ''
    this.topic = null
    this.tempFilePaths = []
    this.$store.commit('SET_TOPIC', null);
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
