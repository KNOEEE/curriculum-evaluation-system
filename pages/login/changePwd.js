// pages/login/changePwd.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid_focus: false,
    passwd_focus: false,
    new_focus: false,
    conf_focus: false,
    userid: '',
    passwd: '',
    newpwd: '',
    confirm: ''
  },

  post(){
    var _this = this;
    if (!_this.data.userid || !_this.data.passwd || !_this.data.newpwd || !_this.data.confirm) {
      wx.showToast({
        title: '学号或密码不能为空',
        icon: 'none'
      })
      return false;
    }
    if(_this.data.newpwd != _this.data.confirm){
      wx.showToast({
        title: '输入新密码不一致',
        icon: 'none',
      })
      return false;
    }
    console.log(_this.data.userid)
    console.log(_this.data.passwd)
    console.log(_this.data.newpwd)
    if(_this.data.newpwd.length < 5){
      wx.showModal({
        title: '提示',
        content: '新密码太短，确定要继续吗',
        showCancel: true,
        success: function(res) {
          if(res.confirm){
            wx.request({
              url: app.globalData.serverUrl + '/setPwd',
              data: {
                sid: _this.data.userid,
                pwd: _this.data.passwd,
                newPwd: _this.data.newpwd
              },
              method: 'POST',
              success: function (res) {
                console.log(res);
                if (res.data.code === 0) {
                  wx.showToast({
                    title: '修改成功',
                  })
                  wx.reLaunch({
                    url: 'login',
                  })
                } else {
                  wx.showToast({
                    title: '账号或密码错误',
                    icon: 'none',
                  })
                  return false
                }
              },
            })
          }else if(res.cancel){
            return false
          }
        }
      })
    }else{
    wx.request({
      url: app.globalData.serverUrl + '/setPwd',
      data: {
        sid: _this.data.userid,
        pwd: _this.data.passwd,
        newPwd: _this.data.newpwd
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data.code === 0) {
          wx.showToast({
            title: '修改成功',
          })
          wx.reLaunch({
            url: 'login',
          })
        } else {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
          })
          return false
        }
      },
    })
    }
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
  newInput: function(e){
    this.setData({
      newpwd: e.detail.value
    })
  },
  confirmInput: function(e){
    this.setData({
      confirm: e.detail.value
    })
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
    }else if(e.target.id == 'newpwd'){
      this.setData({
        'new_focus': true
      });
    }else if(e.target.id == 'confirm'){
      this.setData({
        'conf_focus': true
      })
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
    } else if (e.target.id == 'newpwd') {
      this.setData({
        'new_focus': false
      });
    } else if (e.target.id == 'confirm') {
      this.setData({
        'conf_focus': false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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