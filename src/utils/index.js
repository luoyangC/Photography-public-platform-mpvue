export const formatNumber = (n) => {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export const formatTime = (date) => {
  let now = new Date()
  date = new Date(date)

  let now_year = now.getFullYear();
  let now_month = now.getMonth() + 1;
  let now_day = now.getDate();

  let date_year = date.getFullYear();
  let date_month = date.getMonth() + 1;
  let date_day = date.getDate();

  let date_hour = date.getHours();
  let date_minute = date.getMinutes();

  if (date_year != now_year) {
    let t1 = [date_year, date_month, date_day].map(formatNumber).join('/')
    return `${t1}`
  }
  else if (date_month != now_month || date_day != now_day) {
    let t2 = [date_month, date_day].map(formatNumber).join('/')
    return `${t2}`
  }
  else {
    let t3 = [date_hour, date_minute].map(formatNumber).join(':');
    return `${t3}`;
  }
}

export const uploadimg = (data) => {
  let i = data.i ? data.i : 0
  let success = data.success ? data.success : 0
  let fail = data.fail ? data.fail : 0;
  let formData = data.type == 'activity' ? {activity: data.id} : {agreement: data.id}
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'image',
    formData: formData,
    header: {
      "Content-Type": "multipart/form-data",
    },
    success: (resp) => {
      success++;
    },
    fail: (res) => {
      fail++;
    },
    complete: () => {
      i++;
      if (i == data.path.length) {   //当图片传完时，停止调用
        // wx.showToast({
        //   title: '上传成功',
        //   duration: 1500,
        //   mask: 'false'
        // })
        wx.navigateBack({
          delta: 1,
          success: () => {
            wx.showToast({
              title: '转发成功',
              icon: 'success',
              duration: 2000
            })
          } })
      } else {//若图片还没有传完，则继续调用函数
        data.i = i;
        data.success = success;
        data.fail = fail;
        uploadimg(data)
      }
    }
  });
}
