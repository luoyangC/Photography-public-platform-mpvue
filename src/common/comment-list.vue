<template>
  <div>
    <div class="comment-title">全部评论</div>
    <div class="comment-list" :style="{minHeight: commentsHeight}">
      <div v-if="commentNums == -1" class="no-comment">什么都没有，赶快试着评论一下吧</div>
      <div v-if="commentNums != -1" class="comment" 
           v-for="(comment, i) in comments" :key="comment.id" 
           @click="handleCommentOpen(comment, i)">
        <div class="comment-header">
          <div class="comment-header-info">
            <image :src="comment.user.image" mode="scaleToFill"></image>
            <div>
              <p class="comment-header-user-name">{{comment.user.nick_name || '匿名'}}</p>
              <p class="comment-header-create-time">{{comment.create_time || '2018.11.06'}}</p>
            </div>
          </div>
          <div class="comment-header-extra">
            <i class="iconfont">&#xe74a;</i>
          </div>
        </div>
        <div class="comment-content">
          <text class="mui-ellipsis-5">{{comment.content}}</text>
        </div>
        <div class="comment-reply" v-if="comment.reply_nums != 0" @click.stop="toCommentDetail(comment.id)">
          <div class="reply-item" v-for="reply in comment.replies" :key="reply.id">
            <a>{{reply.from_user.nick_name}}</a>
            <span v-if="reply.source_link">&nbsp;回复&nbsp;<a>{{reply.to_user.nick_name}}</a></span>
            <text>：{{reply.content}}</text>
          </div>
          <div v-if="comment.reply_nums > 2" class="reply-item">
            <a>共{{comment.reply_nums}}条回复</a>
          </div>
        </div>
        <hr v-if="i != commentNums">
        <hr v-else class="last-item">
      </div>
    </div>
    <div class="comment-input" :style="{width: commentWidth}">
      <i class="iconfont">&#xe705;</i>
      <textarea :type="text" :fixed="true" :cursor-spacing="10" :auto-height="true" :show-confirm-bar="false"
                @focus="focused" v-model.lazy="content" :focus="focus" :placeholder="placeholder"/>
      <span @click.stop="handleDatermineOpen">发送</span>
    </div>
    <div class="comment-model">
      <i-modal title="确认发表吗？" ok-text="确认发送" cancel-text="再改改" :visible="datermine"  @ok="handleDatermineClose" @cancel="handleDatermineClose" ></i-modal>
    </div>
    <div class="a-card-action">
      <i-action-sheet :visible="visible" :actions="actions" show-cancel :mask-closable="false" @cancel="handleCommentClick" @click.stop @clickItem="handleCommentClick" />
    </div>
    <div class="comment-mask" v-if="focus" @click="handleMaskClose">
    </div>
  </div>
</template>

<script>
import { addComment, addReply, delComment } from "../api"
export default {
  name: 'comment-list',
  props: {
    comments: Array,
    activityId: Number,
  },
  data() {
    return {
      focus: false,
      content: '',
      winHeight: 0,
      winWidth: 0,
      currentIndex: 0,
      currentComment: null,
      visible: false,
      datermine: false,
      placeholder: '友善发言的人运气不会太差',
      actionType: false,
    }
  },
  computed: {
    actions() {
      if (this.actionType){
        return [{name: '回复'},{name: '修改'},{name: '删除'}]
      } else {
        return [{name: '回复'},{name: '举报'},{name: '关注'}]
      }
    },
    commentsHeight() {
      return this.winHeight + "px"
    },
    commentWidth() {
      return this.winWidth + "px"
    },
    commentNums() {
      if (this.comments) {
        return this.comments.length-1
      }
    },
  },
  watch: {
    comments: {
      handler(newValue, oldValue) {
        return newValue
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    // 关闭确认对话框，判断是否确认，若确认则调用添加评论或者回复接口
    handleDatermineClose(e) {
      this.datermine = false
      this.focus = false
      if (e.type=='ok') {
        this.addCommentOrReply()
      }
      else {
        this.focus = true
      }
    },
    // 开启确认对话框
    handleDatermineOpen() {
      this.focus = false
      this.datermine = true
    },
    // 关闭遮罩层
    handleMaskClose() {
      this.focus = false
    },
    // 关闭评论操作的选择对话框
    handleCommentClick(e) {
      this.visible = false
      if (e.type == 'cancel') {
        return false
      }
      let index = e.mp.detail.index
      // 判断是否为作者
      if (this.actionType) {
        if (index == 0) {
          this.placeholder = `回复${this.currentComment.user.nick_name}：`
          this.focus = true
        } else if (index == 1) {
          console.log('chenge')
        } else if (index == 2) {
          this.delComment()
        } else {
          console.log('not do any')
        }
      } else {
        if (index == 0) {
          this.placeholder = `回复${this.currentComment.user.nick_name}：`
          this.focus = true
        } else if (index == 1) {
          console.log('juebao')
        } else if (index == 2) {
          console.log('like')
        } else {
          console.log('not do any')
        }
      }
    },
    // 开启评论操作的选择对话框
    handleCommentOpen(comment, index) {
      if (comment.is_author) {
        this.actionType = true
      } else {
        this.actionType = false
      }
      this.visible = true
      this.currentIndex = index
      this.currentComment = comment
    },
    // 点击输入框会触发
    focused(e) {
      this.focus = true
      console.log('focus')
    },
    // 点击完返回会触发
    blured(e) {
      console.log('blur')
    },
    delComment() {
      delComment(this.currentComment.id)
        .then((res) => {
          this.comments.pop(this.currentComment)
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      this.currentIndex = 0
      this.currentComment = null
    },
    // 添加评论或者回复
    addCommentOrReply() {
      if (this.currentComment) {
        addReply({content:this.content,comment:this.currentComment.id,to_user_id:this.currentComment.user.id})
          .then((res) => {
            this.comments[this.currentIndex].replies.push(res.data)
          }).catch((err) => {
            console.log(err)
          })
      } else {
        addComment({content:this.content,activity:this.activityId})
          .then((res) => {
            this.comments.push(res.data)
          }).catch((err) => {
            console.log(err)
          })
      }
      this.content = ''
      this.currentIndex = 0
      this.currentComment = null
      this.placeholder = '友善发言的人运气不会太差'
    },
    // 跳转到评论详情页面
    toCommentDetail(id) {
      let url = `/pages/comment-detail/main?id=${id}`
      wx.navigateTo({ url })
    },
    // 获取系统信息
    getSystemInfo() {
      let that = this;
      wx.getSystemInfo({
        success(res) {
          that.winWidth = res.windowWidth
          that.winHeight = res.windowHeight
        }
      })
    },
  },
  onLoad() {
    this.getSystemInfo()
  },
}
</script>

<style lang="scss" scoped>
  .comment-title {
    position: sticky;
    top: 0;
    background-color:#fff;
    width: 100%;
    padding: 10px 15px;
    font-size: 14px;
    border-bottom:1rpx solid #dddee1;
    box-shadow: 0 1rpx 6rpx #ccc;
  }
  .comment-list {
    margin-bottom: 56px;
  }
  .no-comment {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #495060;
    background-color: #f9f9f9;
  }
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
  .comment-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding:15px 15px 8px 15px;
    font-size:12px;
    align-items:center;

  }
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
  .comment-content {
    padding: 0 15px 10px 55px;
    color:#495060;
    font-size:14px;
  }
  .comment-input {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    bottom: 0;
    z-index: 202;
    font-size: 14px;
    padding: 10px 0;
    background-color: #f9f9f9;
    border-top:1rpx solid #dddee1;
    box-shadow: 0 1rpx 6rpx #ccc;
    .iconfont {
      width: 10%;
      margin: 0 15px;
      line-height: 30px;
      font-size: 20px;
      color: #0084ff;
      align-self: flex-end;
    }
     textarea {
      width: 80%;
      line-height: 30px;
    }
    span {
      width: 10%;
      margin: 0 15px;
      line-height: 30px;
      color: #0084ff;
      align-self: flex-end;
    }
  }
  .comment-mask{
    width:100%;
    height:100%;
    position:fixed;
    background-color:#999;
    z-index:201;
    top:0;
    left:0;
    opacity:0.5;
    -moz-opacity: 0.7;  
    opacity: 0.70;  
    filter: alpha(opacity=70); 
  }
</style>
