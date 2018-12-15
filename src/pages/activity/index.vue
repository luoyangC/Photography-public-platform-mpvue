<template>
  <div class="activity">
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div v-if="user" @click="handleOpen" class="activity-input">
      <image class="activity-input-user-image" :src="user.image" mode="scaleToFill"></image>
      <div class="activity-input-content">
        <p>发表新内容...</p>
      </div>
    </div>
    <div class="approximately">
      <activity-card v-for="item in activityList" :key="item.id" :activity="item"></activity-card>
    </div>
    <div class="new-content-action">
      <i-action-sheet :visible="visible" :actions="actions" show-cancel :mask-closable="false" @cancel="handleCancel" @click.stop @clickItem="handleClickItem" />
    </div>
  </div>
</template>

<script>
import ActivityCard from "@/common/activity-card"
import { getActivity } from "@/api"
import { toAgreementEdit, toTopicEdit, toActivityEdit } from '@/router'
export default {
  components: {
    ActivityCard,
  },
  data() {
    return {
      activityList: [],
      user: null,
      visible: false,
      actions: [{name: '动态'},{name: '约拍'},{name: '主题'}]
    };
  },
  methods: {
    handleClickItem(e) {
      let index = e.mp.detail.index
      if (index == 0) {
        // 发布新动态
        toActivityEdit(0, 'activity')
      } else if (index == 1 ) {
        // 发布新约拍
        toAgreementEdit(0)
      } else {
        // 发布新主题
        toTopicEdit(0)
      }
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    handleOpen() {
      this.visible = true
    },
    toNewActivity () { toActivityEdit(0, 'activity') },
    getActivity() {
      getActivity({follow:'user'})
        .then((res) => {
          console.log(res);
          this.activityList = res.data
        })
    }
  },
  onShow() {
    this.user = this.$store.state.userInfo
    this.getActivity()
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    console.log('下拉');
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh()
    },1000);
  },
};
</script>

<style lang="scss" scoped>
  .activity-input {
    display: flex;
    align-items: center;
    padding:15px;
    background-color: white;
  }
  .activity-input:active {
    background-color: #f9f9f9;
  }
  .activity-input-user-image {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 8px;
  }
  .activity-input-content {
    flex: auto;
    font-size: 12px;
  }
</style>
