<template>
  <div class="my-replies">
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="nav-bar">
      <div :id="0" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==0}">我发送的评论</div>
      </div>
      <div :id="1" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==1}">我发送的回复</div>
      </div>
    </div>
    <div class="swiper-content">
      <swiper class="content" duration="500" :style="{height:swiperHeight}" :current="activeIndex" @change="swiperChange" @animationfinish="onAnimationFinish">
        <swiper-item>
          <div>
            <scroll-view scroll-y :style="{height:scrollHeight}">
              <div class="comment-item" v-for="comment in commentList" :key="comment.id">
                <reply-card :comment="comment"></reply-card>
              </div>
            </scroll-view>
          </div>
        </swiper-item>
        <swiper-item>
          <div>
            <scroll-view scroll-y :style="{height:scrollHeight}">
              <div class="reply-item" v-for="reply in replyList" :key="reply.id">
                <reply-card :reply="reply"></reply-card>
              </div>
            </scroll-view>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import ReplyCard from '@/common/reply-card'
import { getComment, getReply } from '@/api';
export default {
  name: 'index',
  components: {
    ReplyCard,
  },
  data() {
    return {
      user: null,
      commentList: [],
      replyList: [],
      activeIndex: 0,
      windowHeight: 0,
    }
  },
  computed: {
    swiperHeight() {
      return this.windowHeight + "px";
    },
    scrollHeight() {
      return this.windowHeight - 50 + "px";
    }
  },
  methods: {
    getMyComment() {
      getComment({user:this.user.id,is_detail:2})
        .then((res) => {
          this.commentList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMyReply() {
      getReply({from_user:this.user.id,is_detail:2})
        .then((res) => {
          this.replyList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
    },
    swiperChange(e) {
      this.activeIndex = e.mp.detail.current;
    },
    // 滑动完成的回调函数
    onAnimationFinish() {
      console.log("滑动完成.....")
    },
    getSystemInfo() {
      wx.getSystemInfo({
        success: (res) => {
          this.windowHeight = res.windowHeight
          }
      })
    },
  },
  onLoad() {
    this.user = this.$store.state.userInfo
    this.getSystemInfo()
    this.getMyComment()
    this.getMyReply()
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: fixed;
  z-index: 500;
  top: 0;
  height: 50px;
  width: 100%;
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
  font-size: 15px;
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
  padding-top: 50px;
  background-color: #f9f9f9;
  -webkit-overflow-scrolling: touch;
}
</style>
