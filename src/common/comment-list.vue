<template>
  <div>
    <div class="comment-title">全部评论</div>
    <div class="comment-list" :style="{minHeight: commentsHeight}">
      <div v-if="commentNums == -1" class="no-comment">什么都没有，赶快试着评论一下吧</div>
      <div class="comment-item" v-for="(comment, index) in comments" :key="comment.id" @click="handleCommentOpen(comment, index)">
        <comment-card :comment="comment" :index="index" :commentNums="commentNums" :isCommentList="true" ref="comment"></comment-card>
      </div>
    </div>
    <div class="comment-input" :style="{width: commentWidth}">
      <div class="comment-icon">
        <i-icon size="20" type="emoji" />
      </div>
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
import { addComment, addReply, delComment } from "@/api"
import CommentCard from '@/common/comment-card'
export default {
  name: 'comment-list',
  props: {
    comments: Array,
    activityId: Number,
    agreementId: Number,
  },
  components: {
    CommentCard,
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
    getChild (){
         console.log(this.$refs.comment)
     },
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
          this.comments.splice(this.currentIndex, 1)
          this.currentIndex = 0
          this.currentComment = null
        }).catch((err) => {
          console.log(err)
        })
    },
    // 添加评论或者回复
    addCommentOrReply() {
      if (this.currentComment) {
        addReply({content:this.content,comment:this.currentComment.id,source_link:null})
          .then((res) => {
            // 调用子组件的添加回复函数，将API的返回数据传入子组件
            this.$refs.comment[this.currentIndex].addCommentReply(res.data)
            this.currentIndex = 0
            this.currentComment = null
          }).catch((err) => {
            console.log(err)
          })
      } else {
        if (this.activityId) {
          addComment({content:this.content,activity:this.activityId,agreement:null})
            .then((res) => {
              this.comments.push(res.data)
              this.currentIndex = 0
              this.currentComment = null
            }).catch((err) => {
              console.log(err)
            })
        }
        else if (this.agreementId) {
          addComment({content:this.content,agreement:this.agreementId,activity:null})
            .then((res) => {
              this.comments.push(res.data)
              this.currentIndex = 0
              this.currentComment = null
            }).catch((err) => {
              console.log(err)
            })
        }
        else {
          console.log('err')
        }
      }
      this.content = ''
      this.placeholder = '友善发言的人运气不会太差'
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
    .comment-icon {
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
