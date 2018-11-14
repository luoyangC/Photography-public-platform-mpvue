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
    <div class="reply-list">
      <div class="reply" v-for="(reply,i) in comment.replies" :key="reply.id">
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
        <hr v-if="i != comment.reply_nums-1">
        <hr v-else class="last-item">
      </div>
    </div>
    <div class="comment-input">
      <i class="iconfont">&#xe705;</i>
      <textarea type="text" fixed="true" cursor-spacing="10" auto-height="true"
                @confirm="addComment"
                placeholder="友善发言的人运气不会太差" v-model="content"/>
      <span @click="addComment">发送</span>
    </div>
  </div>
</template>

<script>
import { getComment } from "../../api";

export default {
  name: 'index',
  data() {
    return {
      comment: null,
    }
  },
  methods: {
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
    bottom: 0;
    width: 100%;
    z-index: 999;
    font-size: 14px;
    padding: 10px 15px;
    background-color: #f9f9f9;
    border-top:1rpx solid #dddee1;
    box-shadow: 0 1rpx 6rpx #ccc;
    .iconfont {
      margin-right: 15px;
      line-height: 30px;
      font-size: 20px;
      color: #0084ff;
      align-self: flex-end;
    }
    input {
      flex: none;
      line-height: 30px;
    }
    span {
      color: #0084ff;
    }
  }
</style>
