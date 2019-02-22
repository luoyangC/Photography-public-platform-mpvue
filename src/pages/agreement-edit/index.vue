<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="content-item">
      <textarea :type="text" :cursor-spacing="10" :maxlength='-1' :show-confirm-bar="false" v-model="content" :placeholder="placeholder"/>
      <div class="image-list">
        <div class="image-item" v-for="(image, i) in tempFilePaths" :key="i">
          <image :src="image" mode="aspectFill"></image>
        </div>
        <div class="image-item" @click="addImage" v-if="imageNums != 9">
          <image src="/static/img/add.png" mode="aspectFill" style="width: 60px;height: 60px;"></image>
        </div>
        <div class="image-item" style="width: 66.6%;height: 125px" v-if="imageNums == 0">
          <p>点击左侧加号添加图片</p>
          <p>发无关图、色情图将会被禁言</p>
        </div>
      </div>
      <div class="content-operate">
        <i-cell-group>
          <i-cell :title="agreementType.title || '约拍类型'" is-link @click="handleOpen">
            <i slot="icon" class="iconfont">&#xe706;</i>
          </i-cell>
          <i-input v-if="agreementType.type && agreementType.type != 'free'" v-model="amount" type="number" right title="金额" placeholder="请输入" style="margin:0" />
          <picker mode="region" :value="address" @change="cityChange">
            <i-cell :title="address[1] || '添加位置'" is-link>
              <i slot="icon" class="iconfont">&#xe610;</i>
            </i-cell>
          </picker>
        </i-cell-group>
      </div>
      <div class="content-send">
        <button type="warn" @click="addAgreement">发送</button>
      </div>
      <div class="content-type">
        <i-action-sheet :visible="visible" :actions="actions" show-cancel :mask-closable="false" @cancel="handleCancel" @click.stop @clickItem="handleClickItem" />
      </div>
    </div>
  </div>
</template>

<script>
import ImageList from '@/common/image-list'
import { getAgreementById, addAgreement, upAgreement } from '@/api'
import { uploadimg } from '@/utils'
export default {
  components: {
    ImageList,
  },
  data() {
    return {
      address: ['江苏省', '南京市', '浦口区'],
      actions: [{name: '希望互免'},{name: '需要收费'},{name: '愿意付费'}],
      visible: false,
      agreement: null,
      editorType: 'add',
      content: '',
      placeholder: '想到什么，记录一下',
      tempFilePaths: [],
      imageNums: 0,
      agreementType: {title: '', type: ''},
      amount: 1,
    }
  },
  methods: {
    handleClickItem(e) {
      let index = e.mp.detail.index
      if (index == 0) {
        // 互免
        this.agreementType = {title: '希望互免', type: 'free'}
      } else if (index == 1 ) {
        // 收费
        this.agreementType = {title: '需要收费', type: 'toll'}
      } else {
        // 付费
        this.agreementType = {title: '愿意付费', type: 'paid'}
      }
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    handleOpen() {
      this.visible = true
    },
    cityChange(e) {
      this.address = e.mp.detail.value
    },
    upAgreement() {
      let data = this.activity
      data.content = this.content
      data.agreement_type = this.agreementType
      data.address = this.address
      data.amount = this.amount
      upAgreement(data.id, data).then((res) => {
       wx.navigateBack({
          delta: 1,
          success: () => {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
          } })
      }).catch((err) => {
        console.log(err)
      })
    },
    addAgreement() {
      let data = {
        content: this.content,
        agreement_type: this.agreementType.type,
        address: this.address.join(','),
        amount: this.amount,
      }
      addAgreement(data).then((res) => {
        console.log(res)
        uploadimg({url:'https://www.luoyangc.cn/api/v1/sample/', path:this.tempFilePaths, id:res.data.id, type: 'agreement'})
        this.tempFilePaths = []
        wx.navigateBack({
          delta: 1,
          success: () => {
            wx.showToast({
              title: '转发成功',
              icon: 'success',
              duration: 2000
            })
          } })
        })
      .catch((err) => {
        console.log(err)
        })
    },
    addImage() {
      wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.tempFilePaths = res.tempFilePaths
        this.imageNums = res.tempFilePaths.length
        console.log(this.tempFilePaths)
      }
    })
    },
    getAgreement(id) {
      getAgreementById(id).then((res) => {
        this.editorType = 'update'
        this.agreement = res.data
        this.content = res.data.content
        this.agreementType = res.data.agreement_type
        this.amount = res.data.amount
        this.address = res.data.address
        res.data.images.forEach(element => {
          this.tempFilePaths.push(element.image)
        });
        this.imageNums = res.data.images.length
      }).catch((err) => {
        console.log(err)
      })
    },
    toTopicEdit() { toTopicEdit(0) },
    toActivityEdit() { toActivityEdit(0) },
  },
  onLoad(option) {
    this.location = this.$store.state.location
    if (option.id != 0) {
      this.getAgreement(option.id)
    } else {
      this.editorType = 'add'
    }
  },
  onUnload() {
    this.imageNums = 0
    this.editorType = 'add'
    this.agreement = null
    this.content = ''
    this.agreementType = {title: '', type: ''}
    this.tempFilePaths = []
  }
}
</script>

<style lang="scss" scoped>
.content {
  box-sizing: border-box;
  background-color: #f9f9f9;
  -webkit-overflow-scrolling: touch;
}
.content-item {
  // position: fixed;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 15px;
  background-color: #f9f9f9;
  textarea {
    width: 100%;
    background-color: white;
    border-top:1rpx solid #dddee1;
    box-shadow: 0 1rpx 6rpx #ccc;
  }
  .image-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
    margin-top: 15px;
    .image-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.3%;
      height: 125px;
      image {
        width: 95%;
        height: 95%;
      }
    }
  }
  .content-operate {
    margin-top: 15px;
  }
  .content-send {
    margin-top: 15px;
  }
}
</style>
