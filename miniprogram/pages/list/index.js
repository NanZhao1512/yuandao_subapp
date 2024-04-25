// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    groupList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) { // 这里的参数e对应的就是wxml中需要传入的参数
    wx.cloud.callFunction({
      name: "fun",
      data: {
        api: "getManyGroup",
      },
    }).then((res)=> {
      this.setData({
        groupList: res.result.groupList,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})