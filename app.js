App({
  globalData:{
    serverUrl: "http://127.0.0.1:8000", //62.234.187.220
    sid:'',
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var _this=this;
    //读取缓存
    try{
      var data = wx.getStorageInfoSync();
      if(data && data.keys.length) {
        data.keys.forEach(function(key){
          var value = wx.getStorageSync(key);
          if(value){
            _this.cache[key]=value;
          }
        });
        _this._user.wx=_this.cache.userinfo||{};
        _this.processData(_this.cache.userData);
      }
    }catch(e){console.warn('获取缓存失败');} 
  },

  //保存缓存
  saveCache: function(key, value){
    if(!key||!value){return;}
    var _this = this;
    _this.cache[key] = value;
    wx.setStorage({
      key: key,
      data: value,
    });
  },
  //清除缓存
  removeCache: function(key){
    if(!key){return;}
    var _this=this;
    _this.cache[key]='';
    wx.removeStorage({
      key: key,
      success: function(res) {},
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  loginLoad: function(onLoad){
    var _this=this;
    if(!_this._t){//无登陆信息
      _this.getUser(function(e){
        typeof onLoad=="function"&&onLoad(e);
      });
    }else{ //有登陆信息
      typeof onLoad=="function"&&onLoad();
    }
  },
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
})
