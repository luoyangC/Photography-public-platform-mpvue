<template>
  <div class="comment-detail" v-if="comment">
    <!-- <div class="comment">
      <div class="comment-header">
        <div class="comment-header-info">
          <image :src="comment.user.image" mode="scaleToFill" @click.stop="toUserInfo(comment.user.id)"></image>
          <div>
            <p class="comment-header-user-name" @click.stop="toUserInfo(comment.user.id)">{{comment.user.nick_name || '匿名'}}</p>
            <p class="comment-header-create-time">{{comment.create_time || '2018.11.06'}}</p>
          </div>
        </div>
        <div class="comment-header-extra">
          <i-icon type="unfold" size="20" />
        </div>
      </div>
      <div class="comment-content">
        <text>{{comment.content}}</text>
      </div>
    </div> -->
    <div class="comment">
      <comment-card :comment="comment"></comment-card>
    </div>
    <div class="reply-title">全部回复</div>
    <div class="reply-list" v-if="replyList">
      <div class="reply-item" v-for="(reply,index) in replyList" :key="reply.id" @click="handleCommentOpen(reply, index)">
        <comment-card :reply="reply" :index="index" :commentNums="replyNums"></comment-card>
      </div>
    </div>
    <div class="comment-input">
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
import { getCommentById, addReply, delReply, getReply } from "@/api";
import { formatTime } from '@/utils'
import CommentCard from '@/common/comment-card'
export default {
  name: 'index',
  components: {
    CommentCard,
  },
  data() {
    return {
      content: null,
      focus: false,
      currentIndex: 0,
      currentReply: null,
      comment: null,
      visible: false,
      datermine: false,
      placeholder: '友善发言的人运气不会太差',
      actionType: false,
      replyList: null,
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
    replyNums() {
      if (this.replyList) {
        return this.replyList.length - 1
      } else {
        return 0
      }
    },
  },
  methods: {
    handleDatermineClose(e) {
      this.datermine = false
      this.focus = false
      if (e.type=='ok') {
        this.addReply()
      }
      else {
        this.focus = true
      }
    },
    handleDatermineOpen() {
      this.focus = false
      this.datermine = true
    },
    handleMaskClose() {
      this.focus = false
    },
    handleCommentClick(e) {
      this.visible = false
      if (e.type == 'cancel') {
        return false
      }
      let index = e.mp.detail.index
      // 判断是否为作者
      if (this.actionType) {
        if (index == 0) {
          this.placeholder = `回复${this.currentReply.from_user.nick_name}：`
          this.focus = true
        } else if (index == 1) {
          console.log('chenge')
        } else if (index == 2) {
          this.delReply()
        } else {
          console.log('not do any')
        }
      } else {
        if (index == 0) {
          this.placeholder = `回复${this.currentReply.from_user.nick_name}：`
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
    handleCommentOpen(reply, index) {
      if (reply.is_author) {
        this.actionType = true
      } else {
        this.actionType = false
      }
      this.visible = true
      this.currentIndex = index
      this.currentReply = reply
    },
    focused(e) {
      // 点击输入框会触发
      this.focus = true
      console.log('focus')
    },
    blured(e) {
      // 点击完返回会触发
      console.log('blur')
    },
    delReply() {
      delReply(this.currentReply.id)
        .then((res) => {
          this.replyList.splice(this.currentIndex, 1)
          this.currentIndex = 0
          this.currentReply = null
        }).catch((err) => {
          console.log(err)
        })
    },
    addReply() {
      if (this.currentReply) {
        addReply({content:this.content, to_user_id:this.currentReply.from_user.id, comment:this.comment.id, source_link:this.currentReply.id})
          .then((res) => {
            this.replyList.push(res.data)
          }).catch((err) => {
            console.log(err)
          })
      } else {
        addReply({content:this.content,comment:this.comment.id,to_user_id:this.comment.user.id})
          .then((res) => {
            this.replyList.push(res.data)
          }).catch((err) => {
            console.log(err)
          })
      }
      this.content = ''
      this.currentReply = null
      this.placeholder = '友善发言的人运气不会太差'
    },
    // 获取评论回复
    getCommentReply(id) {
      getReply({comment: id})
        .then((res) => {
          this.replyList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取评论详情
    getComment(id) {
      getCommentById(id)
        .then((res) => {
          this.comment = res.data
        }).catch((err) => {
          console.log(err)
      })
    },
    toUserInfo(id) {
      let url = `/pages/user-info/main?id=${id}`;
      wx.navigateTo({ url })
    },
  },
  onLoad(option) {
    this.getComment(option.id);
    this.getCommentReply(option.id)
  },
  onUnload() {
    this.currentComment = null
    this.comment = null
    this.replyList = null
  }
}
</script>

<style lang="scss" scoped>
  .reply-title {
    position: sticky;
    top: 0;
    background-color:#fff;
    width: 100%;
    padding: 10px 15px;
    margin-top: 15px;
    font-size: 14px;
    border-bottom:1rpx solid #dddee1;
    box-shadow: 0 1rpx 6rpx #ccc;
  }
  .reply-list {
    margin-bottom: 56px;
  }
  .comment-input {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
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
