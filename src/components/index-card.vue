<template>
  <div class="a-card">
    <div class="a-card-tag">
      <span># {{activity.topic.title}}</span>
      <div class="a-card-header-extra">
        <i class="iconfont">&#xe74a;</i>
      </div>
    </div>
    <div class="a-card-content">
      <text class="mui-ellipsis-5">{{activity.content}}</text>
      <image-list :images="activity.images"></image-list>
    </div>
    <div class="a-card-header">
      <div class="a-card-header-info">
        <image  :src="activity.user.image"></image>
        <div>
          <p class="a-card-header-user-name">{{activity.user.nick_name || '匿名'}}</p>
        </div>
      </div>
    </div>
    <hr/>
    <div class="a-card-footer">
      <span><i class="iconfont">&#xe71b;</i>&nbsp;{{activity.like_nums}}</span>
      <span><i class="iconfont">&#xe70c;</i>&nbsp;{{activity.comment_nums}}</span>
      <span><i class="iconfont">&#xe726;</i>&nbsp;{{activity.share_nums}}</span>
      <span><i class="iconfont">&#xe72a;</i></span>
    </div>
  </div>
</template>

<script>
import ImageList from './image-list'
export default {
  name: 'activity-card',
  props: {
    'activity': Object,
  },
  components: {
    ImageList,
  },
};
</script>

<style scoped>
  .a-card {
    display: flex;
    flex-direction: column;
    margin:10px 0;
    background-color: white;
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
    padding:15px;
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
  }
</style>
