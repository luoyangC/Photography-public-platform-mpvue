<template>
  <div>
    <div class="nav-bar">
      <div :id="0" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==0}">关注主题列表</div>
      </div>
      <div :id="1" class="nav-bar-item" @click="tabClick">
        <div class="nav-bar-title" :class="{'nav-bar-on':activeIndex==1}">关注用户列表</div>
      </div>
    </div>
    <div class="swiper-content">
      <swiper class="content" duration="500" :style="{height:contentHeight}" :current="activeIndex" @change="swiperChange" @animationfinish="onAnimationFinish">
        <swiper-item>
          <div>
            <simple-card :followTopic="topic" v-for="topic in followTopic" :key="topic.id"></simple-card>
          </div>
        </swiper-item>
        <swiper-item>
          <div>
            <simple-card :followUser="user" v-for="user in followUser" :key="user.id"></simple-card>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import SimpleCard from "@/common/simple-card"
import { getFollow } from '../../api'
export default {
  name: 'index',
  components: {
    SimpleCard,
  },
  data() {
    return {
      followUser: [],
      followTopic: [],
      activeIndex: 0,
    }
  },
  computed: {
    contentHeight() {
      return this.$store.state.systemInfo.windowHeight + "px";
    },
  },
  methods: {
    getFollowList() {
      getFollow({follow_type: 'user'})
        .then((res) => {
          console.log(res)
          this.followUser = res.data
        }).catch((err) => {
          console.log(err)
        })
      getFollow({follow_type: 'topic'})
        .then((res) => {
          console.log(res)
          this.followTopic = res.data
        }).catch((err) => {
          console.log(err)
        })
    },
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
    },
    swiperChange(e) {
      this.activeIndex = e.mp.detail.current;
    },
    // 滑动完成的回调函数
    onAnimationFinish() {
      console.log("滑动完成.....")
    },
  },
  onLoad() {
    this.getFollowList()
    console.log(this.$store.state.systemInfo)
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 500;
    top: 0;
    height: 50px;
    width: 100%;
  }
  .nav-bar-item {
    position: relative;
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 13px 0;
    text-align: center;
    font-size: 0;
  }
  .nav-bar-title {
    color: black;
    font-weight: 500;
    display: inline-block;
    font-size: 15px;
    max-width: 8em;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
  .nav-bar-on {
    color: #89c5de;
  }
  .content {
    box-sizing: border-box;
    padding-top: 50px;
    background-color: #f9f9f9;
    -webkit-overflow-scrolling: touch;
  }
  .a-input {
    display: flex;
    flex-direction: column;
    padding:7px 15px;
    color:#495060;
    box-sizing:border-box;
    border:0 solid #e9eaec;
    border-bottom-width:1px;
    left:15px;
    right:0;
    .a-input-err {
      color: red;
      font-size: 12px;
    }
    .a-input-model {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .a-input-title {
        color:#495060;
        min-width:65px;
        font-size: 14px;
        padding-right:10px
      }
      .a-input-input {
        flex:1;
        line-height:1.6;
        padding:4px 0;
        min-height:22px;
        height:auto;
        font-size:14px
      }
    }
  }
</style>
