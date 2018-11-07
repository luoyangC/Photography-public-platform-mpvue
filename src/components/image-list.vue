<template>
  <div class="image-list">
    <div class="image-head" v-if="imageHead">
      <image :src="imageHead.image" @click="handleImage(imageHead.image)" mode="aspectFill"></image>
    </div>
    <div :class="{'image-item-center': index==1 || index==4 || index==7}" class="image-item" v-for="(img,index) in imageList" :key="index">
      <image :src="img.image" @click="handleImage(img.image)" mode="aspectFill"></image>
    </div>
  </div>
</template>

<script>
export default {
  name: 'image-list',
  props: {
    'images': Array
  },
  data() {
    return {
      imageHead: null,
      imageList: null,
    }
  },
  computed: {
    imageItem() {
      let imageSize = this.images.length;
      if (imageSize == 1) {
        this.imageHead = this.images[0];
      }
      else if (imageSize == 4) {
        this.imageHead = this.images[0];
        this.imageList = this.images.slice(1,4);
      }
      else if (imageSize == 7) {
        this.imageHead = this.images[0];
        this.imageList = this.images.slice(1,7);
      }
      else {
        this.imageList = this.images;
      }
    },
  },
  methods: {
    handleImage(e) {
      let imageList = this.images;
      let urlList = [];
      imageList.forEach((item) => {
        urlList.push(item.image)
      });
      wx.previewImage({
        current: e,
        urls: urlList,
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .image-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
  .image-head {
    width: 100%;
    image {
      width: 100%;
      max-height: 200px;
    }
  }
  .image-item {
    width: 33%;
    image {
      width: 100%;
      height: 110px;
    }
  }
  .image-item-center {
    width: 33%;
    margin: 0 0.5%;
    image {
      width: 100%;
      height: 110px;
    }
   }
</style>
