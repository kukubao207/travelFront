var app=getApp();

Page({
  data: {
    icon_url:"../../images/icon9.jpeg",
    userInfo:{},
    userNum:""
  },
  checkSession(e) {
    wx.checkSession({
      success: res => {
        console.log("success to session")
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      fail: res => {
      }
    })
  },
  login(e) {
    wx.login({
      success: res => {
        wx.request({
          url: "http://"+app.globalData.productIp+":"+app.globalData.productPort + '/user/login',
          method: 'post',
          header: {
            'content-type': 'application/json'
          },
          data: {
            code: res.code,
            userInfo: e.detail.userInfo
          },
          success: res => {
            var user = {
              userNum: stuNum
            }
            wx.setStorageSync('user', user)
            console.log(res.data)
            wx.setStorageSync('openid', res.data.data.openid)
            wx.setStorageSync('ownerid', res.data.data.id)
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.checkSession()
    //console.log(wx.getStorageSync('user'))
    if(wx.getStorageSync('user')){
      var user = wx.getStorageSync('user');
      if (user.userNum != "") {
        this.setData({
          userNum: user.userNum,
        })
      }
    }
    
  },

  formSubmit: function (e) {
    var stuNum = e.detail.value.stuNum;
    var psd = e.detail.value.psd;

    wx.request({
      method: 'POST',
      url: 'http://39.108.186.54:8080/user/signIn',
      data: {
        "password": psd,
        "stuNum": stuNum
      },
      header: { "Accept": "*/*" },
      success: function (res) {
        if(res.data.code == 200){
          var user = {
            userNum: stuNum
          }

          wx.showToast({
            title: '登陆成功',
          }),
          wx.setStorageSync('user', user),
          wx.switchTab({
            url: '../index/index',
          })
        }else{
          wx.showToast({
            title: '学号或密码错误',
            icon: "none"
          })
        }
      }
    })
  },
  reg:function(e){
    wx.navigateTo({
      url: '../reg/reg',
    })
  }

})
