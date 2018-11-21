<template>
  <div class="a-card"  @click="toActivityDetail(activity.id,false)">
    <div class="a-card-header">
      <div class="a-card-header-info">
        <image :src="activity.user.image" mode="scaleToFill"></image>
        <div>
          <p class="a-card-header-user-name">{{activity.user.nick_name || '匿名'}}</p>
          <p class="a-card-header-create-time">{{formatActivityTime || '2018.11.06'}}</p>
        </div>
      </div>
      <div v-if="isDetail" class="a-card-header-extra" @click.stop>
        <i-icon v-if="activity.is_keep" type="collection_fill" size="16" color="#EA5149" />
        <i-icon v-else type="collection" size="20" />
      </div>
      <div v-else class="a-card-header-extra" @click.stop="openAction">
        <i-icon type="unfold" size="20" />
      </div>
    </div>
    <div class="a-card-content">
      <text class="mui-ellipsis-5">{{activity.content}}</text>
      <div class="image-list" @click.stop>
        <image-list :images="activity.images"></image-list>
      </div>
      <div class="a-card-share" v-if="activity.source" @click="toActivityDetail(activity.source.id,false)">
        <div class="share-text">
          <a ref="#">@{{activity.source.user.nick_name}}：</a>
          <text class="mui-ellipsis-5">{{activity.source.content}}</text>
        </div>
        <div class="share-info">
          <span>点赞{{activity.source.like_nums}} | </span>
          <span>评论{{activity.source.comment_nums}} | </span>
          <span>转发{{activity.source.share_nums}}</span>
        </div>
        <div class="share-image">
          <image-list :images="activity.source.images"></image-list>
        </div>
      </div>
    </div>
    <div class="a-card-tag" v-if="activity.topic.title">
      <span># {{activity.topic.title}}</span>
    </div>
    <hr>
    <div class="a-card-footer">
      <div>
        <i-icon v-if="activity.is_like" size="20" type="praise_fill" color="#EA5149" @click.stop="changeLikeType" />
        <i-icon v-else type="praise" size="20" @click.stop="changeLikeType" />
        <span>&nbsp;{{activity.like_nums}}</span>
      </div>
      <div>
        <i-icon v-if="activity.is_comment" size="20" type="interactive_fill" color="#EA5149" @click.stop="toActivityDetail(activity.id,true)"/>
        <i-icon v-else size="20" type="interactive" @click.stop="toActivityDetail(activity.id,true)"/>
        <span>&nbsp;{{activity.comment_nums}}</span>
      </div>
      <div>
        <i-icon v-if="activity.is_share" size="20" type="share_fill" color="#EA5149" />
        <i-icon v-else size="20" type="share" />
        <span>&nbsp;{{activity.share_nums}}</span>
      </div>
      <div>
        <i-icon type="more"  size="20" />
      </div>
    </div>
    <div class="a-card-action">
      <i-action-sheet :visible="visible" :actions="actions" show-cancel :mask-closable="false" @cancel="handleCancel" @click.stop @clickItem="handleClickItem" />
    </div>
  </div>
</template>

<script>
import ImageList from './image-list'
import { formatTime } from '../utils'
import { delActivity, addLike, delLike } from '../api';
export default {
  name: 'activity-card',
  props: {
    'activity': Object,
    'isDetail': Boolean,
  },
  components: {
    ImageList,
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    actions() {
      if (this.activity.is_author){
        return [{name: '删除'},{name: '修改'},{name: '去分享',icon: 'share',openType: 'share'}]
      } else {
        return [{name: '收藏'},{name: '举报'},{name: '去分享',icon: 'share',openType: 'share'}]
      }
    },
    formatActivityTime() {
      return formatTime(this.activity.create_time)
    }
  },
  methods: {
    changeLikeType() {
      if (this.activity.is_like) {
        delLike(this.activity.is_like)
          .then((res) => {
            console.log(res)
            this.activity.is_like = false
            this.activity.like_nums --
          }).catch((err) => {
            console.log(err)
          })
      } else {
        addLike({activity: this.activity.id})
          .then((res) => {
            console.log(res)
            this.activity.is_like = res.data.id
            this.activity.like_nums ++
          }).catch((err) => {
            console.log(err)
          })
      }
    },
    handleClickItem(e) {
      let index = e.mp.detail.index
      // 判断是否为作者
      if (this.activity.is_author) {
        if (index == 0) {
          // 删除操作
          this.actions[0].loading = true
          this.delActivity()
        } else if (index == 1 ) {
          // 修改操作
          console.log('change')
        }
      } else {
        if (index == 0) {
          // 收藏操作
          console.log('keep')
        } else if (index == 1 ) {
          // 举报操作
          console.log('jubao')
        }
      }
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    openAction() {
      this.visible = true
    },
    delActivity() {
      delActivity(this.activity.id)
        .then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
    },
    toActivityDetail(id, comment) {
      if (!this.isDetail) {
        let url = `/pages/activity-detail/main?id=${id}&comment=${comment}`;
        console.log(url);
        wx.navigateTo({ url })
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  .a-card {
    display: flex;
    flex-direction: column;
    margin:10px 0;
    background-color: white;
    hr {
      margin-left: 55px;
    }
  }
  .a-card:active {
    background-color: #f9f9f9;
  }
  .a-card-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding:15px 15px 8px 15px;
    font-size:12px;
    align-items:center;

  }
  .a-card-header-info {
    display: flex;
    align-items: center;
  }
  .a-card-header-info image {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 8px;
  }
  .a-card-header-create-time {
    font-size: 10px;
  }
  .a-card-content {
    padding: 0 15px 0 55px;
    color:#495060;
    font-size:14px;
  }
  .a-card-share {
    display: flex;
    flex-direction: column;
    padding: 5px;
    background-color: #f9f9f9;
    .share-text {
      a {
        color: #0084ff;
      }
    }
    .share-info {
      span {
        color:#80848f;
        font-size:11px;
      }
    }
  }
  .a-card-tag {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 15px 8px 55px;
  }
  .a-card-tag span {
    font-size:10px;
    height:16px;
    padding:3px 8px;
    border-radius:10px;
    background:#e9e9e9;
    color: #0084ff;
    vertical-align:middle;
    border:1rpx solid #f9f9f9
  }
  .a-card-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 15px 15px 55px;
    color:#80848f;
    font-size:12px;
    div {
      display: flex;
      align-items: center
    }
  }
</style>
