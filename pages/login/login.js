// pages/login/login.js
var app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0,
    direct:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.onLocalService()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },

  bind: function () {
    var _this = this;
    if (!_this.data.userid || !_this.data.passwd) {
      wx.showToast({
        title: '学号或密码不能为空',
        icon:'none'
      })
      return false;
    }
    // console.log(app.globalData.serverUrl)
    wx.request({
      // url: 'http://127.0.0.1:8000/login',
      url: app.globalData.serverUrl + '/login',
      data: { sid: _this.data.userid,
              pwd: _this.data.passwd },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        if(res.data.code===0){
          app.globalData.sid = _this.data.userid
          wx.reLaunch({
            url: '../index/page1?sid=' + _this.data.userid,
          })
        }else{
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
          })
          return false
        }
      },
    })
  },

  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 10) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },

  setPwd(){
    wx.reLaunch({
      url: 'changePwd',
    })
  },

  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //迁移至onload
  },

  /**
   * 监听函数接收
   */
  onLocalService: function () {
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