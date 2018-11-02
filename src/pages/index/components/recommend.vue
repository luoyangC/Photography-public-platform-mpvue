<template>
  <div>
    <scroll-view scroll-y :style="{height:contentHeight}">
      <a @click="getTest">getTest</a>
      <a @click="addTest">addTest</a>
      <a @click="delTest">delTest</a>
    </scroll-view>
  </div>
</template>

<script>
  import { addTest, delTest, getTest } from "../../../api/api";

export default {
  name: 'recommend',
  props: {
    winHeight: Number
  },
  data() {
    return {
      test: 'test',
    };
  },
  computed: {
    contentHeight() {
      return this.winHeight - 50 + "px";
    },
  },
  methods: {
    getTest() {
      console.log(this.test);
      getTest().then((res) => {console.log(res)})
    },
    addTest() {
      addTest({title:'Test'}).then((res) => {console.log(res)})
    },
    delTest() {
      delTest(5).then((res) => {console.log(res)}).catch((err) => {console.log(err)})
    }
  }
};
</script>

<style scoped>

</style>
