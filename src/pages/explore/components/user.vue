<template>
  <div class="user-list">
    <scroll-view scroll-y :style="{height:contentHeight}">
      <div class="photographer-list">
        <div class="user-title">
          <i-icon size="20" color="#EA5149" type="camera" />
          <p>摄影师推荐</p>
        </div>
        <div v-for="user in photographerList" :key="user.id" @click="toUserInfo(user.id)">
          <simple-card :user="user"></simple-card>
        </div>
      </div>
      <div class="model-list">
        <div class="user-title">
          <i-icon size="20" color="#EA5149" type="like" />
          <p>模特推荐</p>
        </div>
        <div v-for="user in modelList" :key="user.id" @click="toUserInfo(user.id)">
          <simple-card :user="user"></simple-card>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import SimpleCard from "@/common/simple-card"
import { getUserInfo } from "@/api/index"
export default {
  name: 'agreement',
  props: {
    winHeight: Number,
  },
  components: {
    SimpleCard,
  },
  data() {
    return {
      modelList: [],
      photographerList: [],
    };
  },
  computed: {
    contentHeight() {
      return this.winHeight -100 + "px";
    },
  },
  methods: {
    getmodelList() {
      getUserInfo({approve:"model"}).then((res) => {
        this.modelList = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    getphotographerList() {
      getUserInfo({approve:"photographer"}).then((res) => {
        this.photographerList = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    toUserInfo(id) {
      let url = `/pages/user-info/main?id=${id}`
      wx.navigateTo({ url })
    },
  },
  onLoad() {
    this.getmodelList()
    this.getphotographerList()
  }
};
</script>

<style lang="scss" scoped>
  .user-title {
    padding: 8px 15px;
    font-size: 14px;
    p {
      display: inline;
      margin-left: 4px;
    }
  }
</style>