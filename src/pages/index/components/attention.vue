<template>
  <div>
    <scroll-view scroll-y style="height: 596px;">
      <i-card class="card-item" v-for="(item,index) in cardList" :key="index" full="true" title="Title" :extra="item">
        <div style="height: 100px" slot="content">关注</div>
        <div slot="footer">尾部内容</div>
      </i-card>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: 'attention',
  data() {
    return {
      cardList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
};
</script>

<style scoped>
  .card-item {
    margin: 10px;
  }
</style>
