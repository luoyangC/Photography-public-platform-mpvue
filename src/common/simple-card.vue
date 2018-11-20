<template>
  <div>
    <div class="simple-card">
      <div class="simple-card-body">
        <div class="simple-card-image">
          <image  :src="item.image"></image>
        </div>
        <div class="simple-card-content">
          <p class="simple-card-title">{{item.title || ''}}</p>
          <P class="simple-card-info">{{item.info || ''}}</P>
        </div>
      </div>
      <div class="simple-card-extra">
        <button v-if="item.id" size="mini" @click.stop="delFollow">取消关注</button>
        <button v-else size="mini" @click.stop="addFollow">关注</button>
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
    topic: Object,
    user: Object,
  },
  computed: {
    item() {
      if (this.topic) {
        let follow = this.topic.follow
        return {
          id: this.topic.id,
          title: follow.title,
          image: follow.image,
          info: follow.info,
          followId: follow.id,
          followType: this.topic.follow_type
        }
      } 
      else if (this.user) {
        let follow = this.user.follow
        return {
          id: this.user.id,
          title: follow.nick_name,
          image: follow.image,
          info : follow.simple_info,
          followId: follow.id,
          followType: this.user.follow_type
        }
      } 
    }
  },
  methods: {
    addFollow() {
      console.log('add')
      addFollow({follow_id: this.item.followId, follow_type: this.item.followType})
        .then((res) => {
          console.log(res)
          this.item.id = res.data.id
        }).catch((err) => {
          console.log(err)
        })
    },
    delFollow() {
      console.log('del')
      delFollow(this.item.id)
        .then((res) => {
          console.log(res)
          this.item.id = false
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
