// pages/mine/comm.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid:'',
    cid:'',
    cname:'',
    stars:0,
    rate:0,
    teacher:'',
    textRec:'',
    valueList: [], 
    indexList: [{
      id: 0,
      name: "主讲教师",
      intro: "教师师德好，学术造诣高，教学能力强，教学经验丰富"
    }, {
      id: 1,
      name: "教学内容",
      intro: "教学内容新颖，信息量大；有效培养学生的创新思维能力"
    }, {
      id: 2,
      name: "教学条件",
      intro: "为学生自主学习提供有效的资料，实验教材配套齐全"
    }, {
      id: 3,
      name: "教学方法",
      intro: "能有效调动学生学习积极性，促进学生思考，发展学生能力"
    }, {
      id: 4,
      name: "教学效果",
      intro: "讲课有感染力，能给学生思考、联想、创新的启迪"
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      sid: app.globalData.sid,
      cid: options.cid,
      cname: options.cname,
      stars: options.stars,
      rate: options.rate,
      teacher: options.teacher
    })
    console.log(that.data.sid)
    console.log(that.data.cid)
    wx.request({
      url: app.globalData.serverUrl + '/getATxt',
      data: {sid: that.data.sid,
          cid: that.data.cid},
      method: 'POST',
      success: function(res) {
        if (res.data.code === 0) {
          that.setData({
            textRec: res.data.text,
            valueList: res.data.indexList
          })
        }
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