<template>
  <div class="a-card" @click.stop="toActivityDetail(activity.id,false)">
    <div class="a-card-tag" v-if="activity.topic.title">
      <span @click.stop="toTopicDetail(activity.topic.id)"># {{activity.topic.title}}</span>
      <div class="a-card-header-extra" @click.stop="openAction">
        <i-icon type="unfold" size="20" />
      </div>
    </div>
    <div class="a-card-content">
      <text class="mui-ellipsis-5">{{activity.content}}</text>
      <div @click.stop>
        <image-list :images="activity.images"></image-list>
      </div>
    </div>
    <div class="a-card-header">
      <div class="a-card-header-info" @click.stop="toUserInfo(activity.user.id)">
        <image  :src="activity.user.image"></image>
        <div>
          <p class="a-card-header-user-name">{{activity.user.nick_name || '匿名'}}&nbsp;发布</p>
        </div>
      </div>
    </div>
    <hr/>
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
        <i-icon v-if="activity.is_share" size="20" color="#EA5149" type="share_fill" @click.stop="toShare(activity.id, 'share')" />
        <i-icon v-else size="20" type="share" @click.stop="toShare(activity.id, 'share')" />
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
import { toUserDetail, toActivityEdit } from '@/router'
import { delActivity, delLike, addLike, delKeep, addKeep, addMessage } from '../api';
export default {
  name: 'activity-card',
  props: {
    'activity': Object,
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
        if (this.activity.is_keep) {
          return [{name: '取消收藏'},{name: '举报'},{name: '去分享',icon: 'share',openType: 'share'}]
        } else {
          return [{name: '收藏'},{name: '举报'},{name: '去分享',icon: 'share',openType: 'share'}]
        }
      }
    },
  },
  methods: {
    changeKeepType() {
      if (this.activity.is_keep) {
        delKeep(this.activity.is_keep)
          .then((res) => {
            console.log(res)
            this.activity.is_keep == false
            this.activity.Keep_nums --
          }).catch((err) => {
            console.log(err)
          })
      } else {
        addKeep({activity: this.activity.id})
          .then((res) => {
            console.log(res)
            this.activity.is_Keep = res.data.id
            this.activity.keep_nums ++
          }).catch((err) => {
            console.log(err)
          })
      }
    },
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
    addReport() {
      addMessage({to_user:1,message_type:'report', activity:this.activity.id}).then((res) => {
        wx.showToast({
          title: '举报成功',
          icon: 'success',
          duration: 2000
        })
      })
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
          toActivityEdit(this.activity.id, 'activity')
        }
      } else {
        if (index == 0) {
          // 收藏操作
          this.changeKeepType()
        } else if (index == 1 ) {
          // 举报操作
          this.addReport()
        }
      }
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    openAction() {
      console.log('click')
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
    toShare(id, type) { toActivityEdit(id, type) },
    toUserInfo(id) { toUserDetail(id)},
    toTopicDetail(id) {
      let url = `/pages/topic-detail/main?id=${id}`;
      console.log(url);
      wx.navigateTo({ url })
    },
    toActivityDetail(id, comment) {
      let url = `/pages/activity-detail/main?id=${id}&comment=${comment}`;
      console.log(url);
      wx.navigateTo({ url })
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
  }
  .a-card:active {
    background-color: #f9f9f9;
  }
  .a-card-header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding:15px;
    font-size:12px;
    align-items:center;

  }
  .a-card-header-info {
    display: flex;
    align-items: center;
  }
  .a-card-header-info image {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-right: 8px;
  }
  .a-card-content {
    padding:0 15px;
    color:#495060;
    font-size:14px;
  }
  .a-card-tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:15px 15px 8px 15px;
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
    padding:15px;
    color:#80848f;
    font-size:12px;
    div {
      display: flex;
      align-items: center
    }
  }
</style>
