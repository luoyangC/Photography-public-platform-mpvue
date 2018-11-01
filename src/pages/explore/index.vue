<template>
  <div>
    <div>
      <i-input mode="wrapped" placeholder="搜索" />
    </div>
    <div class="approximately">
      <i-card class="card-item" v-for="(item,index) in cardList" :key="index" full="true" title="Title" :extra="item">
        <div slot="content">内容不错</div>
        <div slot="footer">尾部内容</div>
      </i-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
};
</script>

<style scoped>
</style>
