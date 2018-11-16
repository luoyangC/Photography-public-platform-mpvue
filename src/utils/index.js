export const formatNumber = (n) => {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export const formatTime = (date) => {
  date = new Date(date)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join('/');
  const t2 = [hour, minute, second].map(formatNumber).join(':');

  return `${t1} ${t2}`;
}

export const uploadimg = (data) => {
  let i = data.i ? data.i : 0
  let success = data.success ? data.success : 0
  let fail = data.fail ? data.fail : 0;
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'image',
    formData: {
      activity: data.id
    },
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
        wx.showToast({
          title: '上传成功',
          duration: 1500,
          mask: 'false'
        })
      } else {//若图片还没有传完，则继续调用函数
        data.i = i;
        data.success = success;
        data.fail = fail;
        uploadimg(data)
      }
    }
  });
}
