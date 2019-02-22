<template>
  <div class="a-card" v-if="activity" @click.stop="toActivityDetail(activity.id,false)">
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
import { delActivity, delLike, addLike, delKeep, addKeep, addMessage } from '@/api';
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
        if (this.activity.is_keep) return [{name: '取消收藏'},{name: '举报'},{name: '分享',icon: 'share',openType: 'share'}]
        else return [{name: '收藏'},{name: '举报'},{name: '分享',icon: 'share',openType: 'share'}]
      }
    },
  },
  methods: {
    // 改变收藏状态
    async changeKeepType() {
      if (this.activity.is_keep) {
        await delKeep(this.activity.is_keep)
        this.activity.is_keep = false
        this.activity.Keep_nums --
      } else {
        let {data} = await addKeep({activity: this.activity.id})
        this.activity.is_keep = data.id
        this.activity.keep_nums ++
      }
    },
    // 改变点赞状态
    async changeLikeType() {
      if (this.activity.is_like) {
        await delLike(this.activity.is_like)
        this.activity.is_like = false
        this.activity.like_nums --
      } else {
        let {data} = await addLike({activity: this.activity.id})
        this.activity.is_like = data.id
        this.activity.like_nums ++
      }
    },
    // 举报
    async addReport() {
      await addMessage({to_user:1,message_type:'report', activity:this.activity.id})
      wx.showToast({
        title: '举报成功',
        icon: 'success',
        duration: 2000
      })
    },
    handleClickItem(e) {
      let index = e.mp.detail.index
      // 判断是否为作者
      if (this.activity.is_author) {
        if (index == 0) this.delActivity()
        else if (index == 1 ) toActivityEdit(this.activity.id, 'activity')
      } 
      else {
        if (index == 0) this.changeKeepType()
        else if (index == 1 ) this.addReport()
      }
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    openAction() {
      this.visible = true
    },
    // 删除动态
    async delActivity() {
      await delActivity(this.activity.id)
      this.activity = null
    },
    toShare(id, type) { 
      toActivityEdit(id, type)
    },
    toUserInfo(id) { 
      toUserDetail(id)
    },
    toTopicDetail(id) {
      let url = `/pages/topic-detail/main?id=${id}`
      wx.navigateTo({ url })
    },
    toActivityDetail(id, comment) {
      let url = `/pages/activity-detail/main?id=${id}&comment=${comment}`
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
