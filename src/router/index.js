export const toTopicDetail = (id) => {
  let url = `/pages/topic-detail/main?id=${id}`;
  wx.navigateTo({ url })
}

export const toUserDetail = (id) => {
  let url = `/pages/user-detail/main?id=${id}`;
  wx.navigateTo({ url })
}

export const toAgreementDetail = (id) => {
  let url = `/pages/agreement-detail/main?id=${id}`
  wx.navigateTo({ url })
}

export const toMessageList = (agreement, type) => {
  let url = `/pages/message/main?agreement=${agreement}&type=${type}`
  wx.navigateTo({ url })
}

export const toMessageDetail = (agreement, type, other) => {
  let url = `/pages/message-detail/main?agreement=${agreement}&type=${type}&other=${other}`
  wx.navigateTo({ url })
}