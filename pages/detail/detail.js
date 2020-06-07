// pages/detail/detail.js
var app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: '', //student id
    msg:'',//从server收到的消息
    cname:'',
    msgSend:'',
    ifrate:0,
    cid:'',
    teacher:'',
    indexList:[{
        id: 0,
        name: "主讲教师",
        intro:"教师师德好，学术造诣高，教学能力强，教学经验丰富"
      },{
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
    index0: 0,
    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,
  },

  bindTextAreaBlur:function(e){
    let that=this
    console.log(e.detail.value)
    that.setData({
      msgSend:e.detail.value
    })
  },
  
  onChange0(value){
    let that = this
    that.data.index0 = value.detail
    console.log(value)
    console.log(that.data.index0)
  },
  onChange1(value) {
    let that = this
    that.data.index1 = value.detail
    console.log(value)
    console.log(that.data.index1)
  },
  onChange2(value) {
    let that = this
    that.data.index2 = value.detail
  },
  onChange3(value) {
    let that = this
    that.data.index3 = value.detail
  },
  onChange4(value) {
    let that = this
    that.data.index4 = value.detail
    console.log(value)
    console.log(that.data.index4)
  },

  onFavor(){
    let that = this
    wx.request({
      url: app.globalData.serverUrl + '/favorite',
      data: {fav: 1,
        sid: that.data.sid,
        cid: that.data.cid},
      method: 'POST',
      success: function(res) {
        if(res.data.code===0){
        wx.showModal({
          title: '收藏成功',
          showCancel: false
        })
        }else{
          wx.showToast({
            title: '已收藏过',
            icon: 'none',
          })
        }
      },
    })
  },

  onSend(){
    let that = this
    if(that.data.index0 * that.data.index2 * that.data.index3 *
    that.data.index4 * that.data.index1 == 0){
      wx.showToast({
        title: '有未打分的选项',
        icon: 'none',
        duration: 1500,
      })
      return false
    }
    if(that.data.ifrate==0){
      wx.showModal({
        title: '确定提交吗',
        content: '一旦提交不可更改',
        success: function (res) {
          if(res.confirm){
            that.send()
          }else if (res.cancel) {
            return false
          }
        },
      })
    }else{
      wx.showModal({
        title: '已评价过',
        showCancel: false,
      })
      return false
    }
  },

  send(){
    let that = this
    wx.request({
      url: app.globalData.serverUrl + '/evaluate',
      data: {
        sid: that.data.sid,
        cid: that.data.cid,
        index:[that.data.index0,that.data.index1,
          that.data.index2, that.data.index3, that.data.index4],
        text:that.data.msgSend,
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
        that.setData({
          ifrate: 1,
        })
        if(res.data.code===0){
          wx.showToast({
            title: '评价成功',
          })
        }else{
          wx.showToast({
            title: '未知错误',
            icon: 'none',
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      cname:options.cname,
      ifrate:options.ifrate,
      cid:options.cid,
      sid: options.sid,
      teacher: options.teacher
    })
    console.log(that.data.ifrate)
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('someEvent', { data: 'test' });
    // that.onLocalService()
  },

  onLocalService(){
    let that = this
    udp.onMessage(function (res) {
      console.log(res)
      console.log(util.newAb2str(res.message))
      that.setData({
        msg: util.newAb2str(res.message)
      })//每个汉字3bytes
      that.setData({
        ifrate:1
      })
      wx.showModal({
        title: '评价成功',
        content: '你的打分为:'+that.data.msg,
        showCancel: false,
        success(res){
          if(res.confirm){
            console.log('用户点击确定')
          }
        }
      })
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
    // udp.close()
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