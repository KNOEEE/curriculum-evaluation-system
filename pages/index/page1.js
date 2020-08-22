var app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headList: [
      {
        cid: 0,
        crclmImg: "../../images/curriculumImg/img1.jpg",
        cname: "软件工程模型与方法",
        teacher: "徐六通",
        stars: 4.2,
        ifRate:0
      }
    ],
    courseList:[],
    msg:'',
    sid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      sid: options.sid
    })
    
    // that.onLocalService()
  },

  getCourseList(){
    let that = this
    wx.request({
      // url: 'http://127.0.0.1:8000/browse',
      url: app.globalData.serverUrl + '/browse',
      data: {sid: that.data.sid},
      method: 'POST',
      success: function(res) {
        that.setData({
          courseList: res.data.datalist
        })
      }
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
    that.getCourseList()
  },

  onLocalService: function () {
    let that = this
    var myList=[]
    // udp.onMessage(function (res) {
    //   console.log(res)
    //   console.log(util.newAb2str(res.message))
    //   that.setData({
    //     msg: util.newAb2str(res.message)
    //   })//每个汉字3bytes
    //   myList.push({ifRate:parseInt(that.data.msg[0]),
    //     cid:that.data.msg.substr(1,5),
    //     teacher: that.data.msg.substr(7,parseInt(that.data.msg[6])),
    //     cname: that.data.msg.slice(7 + parseInt(that.data.msg[6]))})
    //   that.setData({
    //     courseList:myList
    //   })
    // })
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
    // udp.close()
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