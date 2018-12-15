<template>
  <div class="reply-card" v-if="item">
    <div class="reply-header">
      <div class="reply-header-info">
        <image :src="item.userImage" mode="aspectFill"></image>
        <div>
          <p class="reply-user-name" @click.stop>{{item.userName || '匿名'}}</p>
          <p class="reply-create-time" @click.stop>{{item.createTime || '2018.11.06'}}</p>
        </div>
      </div>
      <div class="reply-header-extra">
        <i-icon type="trash" :size="20" @click="handleDatermineOpen"/>
      </div>
    </div>
    <div class="reply-content">
      <span v-if="item.itemType=='reply'">回复<a @click="toUserDetail(reply.to_user.id)">&nbsp;{{reply.to_user.nick_name}}</a></span>
      <text>{{item.content}}</text>
      <div class="reply-comment" v-if="item.itemType=='reply'" @click="toCommentDetail(reply.comment.id)">
        <a>@{{reply.to_user.nick_name}}</a>
        <text v-if="reply.source_link">：{{reply.source_link.content}}</text>
        <text v-else>：{{reply.comment.content}}</text>
      </div>
      <div class="reply-activity" @click="toContentDetail(item.activity.id)">
        <div class="reply-activity-image">
          <image :src="item.activity.images[0].image" mode="aspectFill"></image>
        </div>
        <div class="reply-activity-content">
          <span>@{{item.activity.user.nick_name}} 发布</span><br>
          <div class="reply-activity-text">
            <text class="mui-ellipsis-2">{{item.activity.content}}</text>
          </div>
        </div>
      </div>
    </div>
    <div class="reply-model">
      <i-modal title="确认删除？" ok-text="删除" cancel-text="取消" :visible="datermine"  @ok="handleDatermineClose" @cancel="handleDatermineClose" ></i-modal>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils'
import { delComment, delReplay } from '@/api'
import { toUserDetail, toCommentDetail, toActivityDetail, toAgreementDetail } from '@/router'
import { delReply } from '../api';
export default {
  name: 'reply-card',
  props: {
    reply: Object,
    comment: Object,
  },
  data() {
    return {
      datermine: false,
      item: null,
    }
  },
  computed: {
    makeItem() {
      if (this.comment) {
        let comment = this.comment
        this.item = {
          userImage: comment.user.image,
          userName: comment.user.nick_name,
          createTime: formatTime(comment.create_time),
          content: comment.content,
          itemType: 'comment',
          contentType: comment.activity ? 'activity' : 'agreement',
          activity: comment.activity ? comment.activity : comment.agreement
        }
      }
      if (this.reply) {
        let reply = this.reply
        this.item = {
          userImage: reply.from_user.image,
          userName: reply.from_user.nick_name,
          createTime: formatTime(reply.create_time),
          content: reply.content,
          itemType: 'reply',
          contentType: reply.comment.activity ? 'activity' : 'agreement',
          activity: reply.comment.activity ? reply.comment.activity : reply.comment.agreement,
        }
      }
    }
  },
  methods: {
    handleDatermineOpen() {
      this.datermine = true
    },
    handleDatermineClose({type}) {
      if (type == 'ok') {
        this.delCommentOrReply()
      }else{
        console.log('cancel')
      }
      this.datermine = false
    },
    toUserDetail(id) { toUserDetail(id) },
    toCommentDetail(id) { toCommentDetail(id) },
    toContentDetail(id) { if (this.item.contentType == 'activity') {
      toActivityDetail(id)
    } else {
      toAgreementDetail(id)
    } },
    delCommentOrReply() {
      if (this.item.itemType == 'comment') {
        delComment(this.comment.id).then((res) => {
          console.log(res)
          this.item = null
        }).catch((err) => {
          console.log(err)
        })
      } else {
        delReply(this.reply.id).then((res) => {
          console.log(res)
          this.item = null
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  },
  onLoad() {

  }
}
</script>

<style lang="scss">
  .reply-card {
    display: flex;
    flex-direction: column;
    margin:10px 0;
    background-color: white;
    hr {
      margin-left: 55px;
    }
  }
  .reply-card:active {
    background-color: #f9f9f9;
  }
  .reply-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding:15px 15px 8px 15px;
    font-size:12px;
    align-items:center;

  }
  .reply-header-info {
    display: flex;
    align-items: center;
  }
  .reply-header-info image {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 8px;
  }
  .reply-create-time {
    font-size: 10px;
  }
  .reply-content {
    padding:0 15px 15px 15px;
    color:#495060;
    font-size:14px;
    a {
        display: inline;
        color: #0084ff;
      }
  }
  .reply-comment {
    padding-top: 4px;
    background-color: #f9f9f9;
  }
  .reply-activity {
    padding: 8px 0;
    display: flex;
    background-color: #f9f9f9;
    .reply-activity-image image {
      width: 55px;
      height: 55px;
      margin-right: 8px;
    }
    .reply-activity-text {
      padding-top: 8px;
      font-size: 11px;
      text {
        font-size: 11px;
      }
    }
  }
</style>
