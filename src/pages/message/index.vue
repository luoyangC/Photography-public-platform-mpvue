<template>
  <div>
    <div class="show-message">
      <i-message id="message" />
    </div>
    <div class="message-list">
      <i-cell-group>
        <div class="message-item" v-for="message in messageList" :key="message.id" 
             @click="toMessageDetail(message.agreement,message.message_type,message.from_user.id)">
          <i-cell :title="message.from_user.nick_name" :label="message.content" is-link>
            <div slot="icon" class="message-user-image" @click.stop="toUserInfo(message.from_user.id)">
              <image :src="message.from_user.image"></image>
            </div>
            <div slot="footer" class="message-footer">
              <div v-if="message.read">
                <span>{{message.create_time}}</span>
              </div>
              <i-badge v-else count=1 dot i-class-alone="demo-badge-alone">
                <span>{{message.create_time}}</span>
              </i-badge>
            </div>
          </i-cell>
        </div>
      </i-cell-group>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils'
import { getMessage, upMessage } from "@/api"
import { toMessageDetail, toUserDetail } from '@/router'
export default {
  name: "index",
  data() {
    return {
      messageList: [],
    };
  },
  computed: {
  },
  methods: {
    toUserInfo(id) {toUserDetail(id)},
    toMessageDetail(agreement, type, other) {toMessageDetail(agreement, type, other)},
    getMessage(agreement,type) {
      getMessage({agreement:agreement,message_type:type, is_from:3, is_to:2})
        .then((res) => {
          if (res.data.length > 0) {
            let messageList = res.data
            messageList.forEach(element => {
              element.create_time = formatTime(element.create_time)
              this.messageList = messageList
            });
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  onLoad(option) {
    console.log(option.type)
    if (option.agreement) {
      this.getMessage(option.agreement,option.type)
    }
    else {
      this.getMessage('',option.type)
    }
  },
  onUnload() {
    this.messageList = []
  }
};
</script>

<style lang="scss" scoped>
.message-user-image image {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-right: 8px;
}
.message-footer {
  padding-right: 20rpx;
}
</style>
