// pages/info/info.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid:'',
    teacher:'',
    cid:'',
    cname:'',
    rate:0,
    stars:0,
    textList:[],
    buttonTxt:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      cid: options.cid,
      cname: options.cname,
      rate: options.rate,
      stars: options.stars,
      sid: app.globalData.sid,
    })
    wx.request({
      url: app.globalData.serverUrl + '/getComm',
      data: {sid:that.data.sid,
        cid: that.data.cid},
      method: 'POST',
      success: function(res) {
        if(res.data.code===0){
          that.setData({
            textList: res.data.textList,
            teacher: res.data.teacher,
          })
          if(res.data.favored===0){
            that.setData({
              buttonTxt:"收藏",
            })
          }else{
            that.setData({
              buttonTxt: "取消收藏",
            })
          }
        }
      },
    })
  },

  onFavor(){
    let that = this
    if(that.data.buttonTxt=="收藏"){
    wx.request({
      url: app.globalData.serverUrl + '/favorite',
      data: {
        fav: 1,
        sid: that.data.sid,
        cid: that.data.cid
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          buttonTxt:"取消收藏",
        })
      },
    })
    }else{
      wx.request({
        url: app.globalData.serverUrl + '/favorite',
        data: {
          fav: 0,
          sid: that.data.sid,
          cid: that.data.cid
        },
        method: 'POST',
        success: function (res) {
          wx.showToast({
            title: '取消收藏',
          })
          that.setData({
            buttonTxt: "收藏",
          })
        },
      })
    }
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