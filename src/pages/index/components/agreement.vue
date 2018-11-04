<template>
  <div class="agreement">
    <scroll-view scroll-y :style="{height:contentHeight}">
      <i-card class="card-item" v-for="(item,index) in cardList" :key="index" full="true" title="Title" :extra="item">
        <div style="height: 100px" slot="content">约拍</div>
        <div slot="footer">尾部内容</div>
      </i-card>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: 'agreement',
  props: {
    winHeight: Number
  },
  data() {
    return {
      cardList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  computed: {
    contentHeight() {
      return this.winHeight - 50 + "px";
    },
  },
};
</script>

<style scoped>
  .card-item {
  }
</style>
