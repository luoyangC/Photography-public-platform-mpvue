<template>
  <div>
    <div class="comment">
        <div class="comment-header">
          <div class="comment-header-info">
            <image v-if="comment" :src="comment.user.image" mode="scaleToFill" @click.stop="toUserInfo(comment.user.id)"></image>
            <image v-if="reply" :src="reply.from_user.image" mode="scaleToFill" @click.stop="toUserInfo(reply.from_user.id)"></image>
            <div v-if="comment">
              <p class="comment-header-user-name" @click.stop="toUserInfo(comment.user.id)">{{comment.user.nick_name || '匿名'}}</p>
              <p class="comment-header-create-time" @click.stop>{{formatCommentTime}}</p>
            </div>
            <div v-if="reply">
              <p class="reply-header-user-name" @click.stop="toUserInfo(reply.from_user.id)">{{reply.from_user.nick_name || '匿名'}}</p>
              <p class="reply-header-create-time" @click.stop>{{formatCommentTime}}</p>
            </div>
          </div>
          <div class="comment-header-extra" @click.stop="getParent">
            <i-icon type="unfold" size="20" />
          </div>
        </div>
        <div class="comment-content">
          <div v-if="comment">
            <text class="mui-ellipsis-5">{{comment.content}}</text>
          </div>
          <div v-if="reply">
            <span v-if="reply.source_link">&nbsp;回复&nbsp;<a @click.stop="toUserInfo(reply.to_user.id)">{{reply.to_user.nick_name}}</a>：</span>
            <text>{{reply.content}}</text>
          </div>
        </div>
        <div class="comment-reply" v-if="comment && isCommentList && replytNums != 0" @click.stop="toCommentDetail(comment.id)">
          <div class="reply-item" v-for="reply in replies" :key="reply.id">
            <a @click.stop="toUserInfo(reply.from_user.id)">{{reply.from_user.nick_name}}</a>
            <span v-if="reply.source_link">&nbsp;回复&nbsp;<a @click.stop="toUserInfo(reply.to_user.id)">{{reply.to_user.nick_name}}</a></span>
            <text>：{{reply.content}}</text>
          </div>
          <div v-if="replytNums > 2" class="reply-item">
            <a>共{{replytNums}}条回复</a>
          </div>
        </div>
        <hr v-if="index != commentNums">
        <hr v-else class="last-item">
      </div>
  </div>  
</template>

<script>
import { formatTime } from '@/utils'
import { getReply } from '@/api'
import { toUserDetail } from '@/router'
export default {
  name: "comment-card",
  props: {
    reply: Object,
    index: Number,
    comment: Object,
    commentNums: Number,
    isCommentList: Boolean,
  },
  data() {
    return {
      replyList: null
    }
  },
  computed: {
    // 格式化时间
    formatCommentTime() {
      if (this.comment) {
        return formatTime(this.comment.create_time)
      }
      else if (this.reply) {
        return formatTime(this.reply.create_time)
      }
    },
    replytNums() {
      if (this.replyList) {
        return this.replyList.length
      }
    },
    replies() {
      if (this.replytNums > 2) {
        return this.replyList.slice(0, 2)
      }
      else {
        return this.replyList
      }
    }
  },
  methods: {
    // 添加回复，由父组件调用
    addCommentReply(data) {
      if (data) {
        this.replyList.push(data)
      }
    },
    // 获取评论回复
    getCommentReply() {
      getReply({comment: this.comment.id})
        .then((res) => {
          this.replyList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 跳转到用户详情页面
    toUserInfo(id) {toUserDetail(id)},
    // 跳转到评论详情页面
    toCommentDetail(id) {
      let url = `/pages/comment-detail/main?id=${id}`
      wx.navigateTo({ url })
    },
  },
  onLoad() {
    if (this.isCommentList) {
      this.getCommentReply()
    }
  }
}
</script>


<style lang="scss" scoped>
  .comment {
    display: flex;
    flex-direction: column;
    background-color: white;
    hr {
      margin-left: 55px;
    }
    .last-item {
      margin: 0;
    }
    .comment-header {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      padding:15px 15px 8px 15px;
      font-size:12px;
      align-items:center;
      .comment-header-info {
        display: flex;
        align-items: center;
        image {
          width: 32px;
          height: 32px;
          border-radius: 16px;
          margin-right: 8px;
          }
        }
        .comment-header-create-time {
          font-size: 10px;
        }
    }
    .comment-content {
      padding: 0 15px 10px 55px;
      color:#495060;
      font-size:14px;
      a {
        display: inline;
        color: #0084ff;
      }
    }
  }
  .comment-reply {
    display: flex;
    flex-direction: column;
    background-color: #eee;
    margin: 0 15px 15px 55px;
    padding: 5px 10px;
    color:#495060;
    font-size:14px;
    .reply-item {
      display: flex;
      flex-direction: row;
      a {
        display: inline;
        color: #0084ff;
      }
    }
  }
</style>
