<template>
  <div class="activity">
    <div @click="handleNewActivity" class="activity-input">
      <image class="activity-input-user-image" :src="user.image" mode="scaleToFill"></image>
      <div class="activity-input-content">
        <p>发表动态...</p>
      </div>
    </div>
    <div class="approximately">
      <activity-card v-for="item in activityList" :key="item.id" :activity="item"></activity-card>
    </div>
  </div>
</template>

<script>
import ActivityCard from "../../common/activity-card";
import { getActivity } from "../../api/index";
export default {
  components: {
    ActivityCard,
  },
  data() {
    return {
      activityList: [],
      user: this.$store.state.userInfo.user,
    };
  },
  methods: {
    handleNewActivity () {
      console.log('new activity')
    },
    getActivity() {
      getActivity()
        .then((res) => {
          console.log(res);
          this.activityList = res.data
        })
    }
  },
  onShow() {
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
