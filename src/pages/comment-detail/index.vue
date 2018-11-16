<template>
  <div class="comment-detail" v-if="comment">
    <div class="comment">
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
        <text>{{comment.content}}</text>
      </div>
    </div>
    <div class="reply-title">全部回复</div>
    <div v-if="comment.replies" class="reply-list">
      <div class="reply" v-for="(reply,i) in comment.replies" :key="reply.id" @click="handleCommentOpen(reply, i)">
        <div class="reply-header">
          <div class="reply-header-info">
            <image :src="reply.from_user.image" mode="scaleToFill"></image>
            <div>
              <p class="reply-header-user-name">{{reply.from_user.nick_name || '匿名'}}</p>
              <p class="reply-header-create-time">{{reply.create_time || '2018.11.06'}}</p>
            </div>
          </div>
          <div class="reply-header-extra">
            <i class="iconfont">&#xe74a;</i>
          </div>
        </div>
        <div class="reply-content">
          <span v-if="reply.source_link">&nbsp;回复&nbsp;<a>{{reply.to_user.nick_name}}</a>：</span><text>{{reply.content}}</text>
        </div>
        <hr v-if="i != replyNums">
        <hr v-else class="last-item">
      </div>
    </div>
    <div class="comment-input">
      <i class="iconfont">&#xe705;</i>
      <textarea :type="text" :fixed="true" :cursor-spacing="10" :auto-height="true" :show-confirm-bar="false"
                @focus="focused" v-model.lazy="content" :focus="focus" :placeholder="placeholder"/>
      <span @click.stop="handleDatermineOpen">发送</span>
    </div>
    <div class="comment-model">
      <i-modal :visible="visible" :actions="actions" :action-mode="vertical" @clickItem="handleCommentClick"></i-modal>
      <i-modal title="确认发表吗？" ok-text="确认发送" cancel-text="再改改" :visible="datermine"  @ok="handleDatermineClose" @cancel="handleDatermineClose" ></i-modal>
    </div>
    <div class="comment-mask" v-if="focus" @click="handleMaskClose">
    </div>
  </div>
</template>

<script>
import { getComment, addReply } from "../../api";

export default {
  name: 'index',
  data() {
    return {
      comment: null,
      focus: false,
      content: '',
      currentIndex: 0,
      currentReply: null,
      visible: false,
      datermine: false,
      placeholder: '友善发言的人运气不会太差',
      actions: [{name: '回复'}, {name: '关注'}, {name: '举报'}]
    }
  },
  computed: {
    replyNums() {
      if (this.comment) {
        return this.comment.replies.length - 1
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
      let index = e.mp.detail.index
      if (index == 0) {
        this.placeholder = `回复${this.currentReply.from_user.nick_name}：`
        this.focus = true
      } else {
        // 其他的逻辑以后再写
        this.commentId = 0
        this.commentUser = 0
      }
    },
    handleCommentOpen(reply, index) {
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
    addReply() {
      if (this.currentReply) {
        addReply({content:this.content, to_user_id:this.currentReply.from_user.id, comment:this.comment.id, source_link:this.currentReply.id})
          .then((res) => {
            this.comment.replies.push(res.data)
          }).catch((err) => {
            console.log(err)
          })
      } else {
        addReply({content:this.content,comment:this.comment.id,to_user_id:this.comment.user.id})
          .then((res) => {
            this.comment.replies.push(res.data)
          }).catch((err) => {
            console.log(err)
          })
      }
      this.content = ''
      this.currentReply = null
      this.placeholder = '友善发言的人运气不会太差'
    },
    getComment(id) {
      getComment(id)
        .then((res) => {
          this.comment = res.data
        }).catch((err) => {
          console.log(err)
      })
    },
  },
  onLoad(option) {
    this.getComment(option.id);
  },
  onUnload() {
    this.comment = null
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
  .comment,.reply {
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
  .comment-header,.reply-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding:15px 15px 8px 15px;
    font-size:12px;
    align-items:center;

  }
  .comment-header-info,.reply-header-info {
    display: flex;
    align-items: center;
    image {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      margin-right: 8px;
    }
  }
  .comment-header-create-time,.reply-header-create-time {
    font-size: 10px;
  }
  .comment-content,.reply-content {
    padding: 0 15px 10px 55px;
    color:#495060;
    font-size:14px;
    a {
      display: inline;
      color: #0084ff;
    }
  }
  .comment-input {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    bottom: 0;
    z-index: 999;
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
    z-index:998;
    top:0;
    left:0;
    opacity:0.5;
    -moz-opacity: 0.7;  
    opacity: 0.70;  
    filter: alpha(opacity=70); 
  }
</style>
