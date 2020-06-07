// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    valueSearch:'',
    found:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.getCourseList()
  },

  getCourseList(){
    let that = this
    if(that.data.valueSearch!=''){
      wx.request({
        url: getApp().globalData.serverUrl + '/search',
        data: { keyword: that.data.valueSearch },
        method: 'POST',
        success: function (res) {
          if (res.data.code === 0) {
            that.setData({
              courseList: res.data.datalist,
            })
          }
          if(that.data.courseList.length==0){
            that.setData({
              found:0
            })
          }
          else{
            that.setData({
              found: 1
            })
          }
        }
      })
    }else{
    wx.request({
      url: getApp().globalData.serverUrl+'/hot',
      success: function(res) {
        if(res.data.code===0){
          that.setData({
            courseList: res.data.datalist,
            found:1
          })
        }
        if (that.data.courseList.length == 0) {
          that.setData({
            found: 0
          })
        }
        else {
          that.setData({
            found: 1
          })
        }
      }
    })
    }
  },

  onChange(e) {
    this.data.valueSearch = e.detail
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