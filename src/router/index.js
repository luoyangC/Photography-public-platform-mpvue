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

export const toActivityDetail = (id) => {
  let url = `/pages/activity-detail/main?id=${id}`
  wx.navigateTo({ url })
}

export const toCommentDetail = (id) => {
  let url = `/pages/comment-detail/main?id=${id}`
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

export const toActivityEdit = (id, type) => {
  let url = `/pages/activity-edit/main?id=${id}&type=${type}`
  wx.navigateTo({ url })
}

export const toAgreementEdit = (id) => {
  let url = `/pages/agreement-edit/main?id=${id}`
  wx.navigateTo({ url })
}

export const toTopicEdit = (id) => {
  let url = `/pages/topic-edit/main?id=${id}`
  wx.navigateTo({ url })
}