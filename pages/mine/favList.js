// pages/mine/favList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid:'',
    courseList:[],
    ifFav: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      sid: app.globalData.sid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    wx.request({
      url: app.globalData.serverUrl + '/getMyFav',
      data: { sid: that.data.sid },
      method: 'POST',
      success: function (res) {
        if (res.data.code === 0) {
          that.setData({
            courseList: res.data.courseList
          })
        }
        if (that.data.courseList.length == 0) {
          that.setData({
            ifFav: 0
          })
        }else{
          that.setData({
            ifFav: 1
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})