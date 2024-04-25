Page({
  data: {
    groupId: "",
  },
  //加载页面时的处理
  onLoad: function (params) {
    let groupId = wx.getStorageSync("groupId");
    // 判断本地是否有groupID信息
    if (groupId) {
      this.setData({
        groupId: groupId,
      });
    } else {
      //调用获取我的小组信息，避免关掉小程序后信息清空
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: {
            type: "getMyGroup",
          },
        })
        .then((res) => {
          if (res.result?.groupId) {
            wx.setStorageSync("groupId", res.result.groupId);
            this.setData({
              groupId: res.result.groupId,
            });
          }
        });
    }
  },
  // 显示页面时的处理
  onShow: function (params) {
    let groupId = wx.getStorageSync("groupId");
    if (groupId) {
      this.setData({
        groupId: groupId,
      });
    }
  },
});