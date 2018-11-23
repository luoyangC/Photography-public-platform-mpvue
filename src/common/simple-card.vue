<template>
  <div>
    <div class="simple-card" v-if="item">
      <div class="simple-card-body">
        <div class="simple-card-image">
          <image :src="item.image"></image>
        </div>
        <div class="simple-card-content">
          <p class="simple-card-title">{{item.title || ''}}</p>
          <P class="simple-card-info">{{item.info || ''}}</P>
        </div>
      </div>
      <div class="simple-card-extra">
        <button v-if="item.followId" size="mini" @click.stop="delFollow">取消</button>
        <button v-else size="mini" @click.stop="addFollow" style="color: #EA5149">关注</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import { delFollow, addFollow } from '../api';
export default {
  name: 'simple-card',
  props: {
    followTopic: Object,
    followUser: Object,
    topic: Object,
  },
  data() {
    return {
      item: null
    }
  },
  computed: {
    makeItem() {
      if (this.followTopic) {
        let topic = this.followTopic.follow
        this.item = {
          id: topic.id,
          title: topic.title,
          image: topic.image,
          info: topic.info,
          followId: this.followTopic.id,
          followType: 'topic'
        }
      } 
      else if (this.followUser) {
        let user = this.followUser.follow
        this.item = {
          id: user.id,
          title: user.nick_name,
          image: user.image,
          info : user.simple_info,
          followId: this.followUser.id,
          followType: 'user'
        }
      }
      else if (this.topic) {
        let topic = this.topic
        this.item = {
          id: topic.id,
          title: topic.title,
          image: topic.image,
          info: topic.info,
          followId: topic.is_follow,
          followType: 'topic'
        }
      } 
    }
  },
  methods: {
    toUserInfo(id) {
      let url = `/pages/user-info/main?id=${id}`;
      console.log(url);
      wx.navigateTo({ url })
    },
    addFollow() {
      addFollow({follow_id: this.item.id, follow_type: this.item.followType})
        .then((res) => {
          this.item.followId = res.data.id
        }).catch((err) => {
          console.log(err)
        })
    },
    delFollow() {
      delFollow(this.item.followId)
        .then((res) => {
          this.item.followId = false
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .simple-card {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding:15px;
    font-size:12px;
    align-items:center;
    background-color: white;
  }
  .simple-card-body {
    display: flex;
    align-items: center;
    image {
      width: 36px;
      height: 36px;
      margin-right: 8px;
    }
    .simple-card-title {
      font-size: 16px;
    }
    .simple-card-info {
      font-size: 12px;
    }
  }
</style>
