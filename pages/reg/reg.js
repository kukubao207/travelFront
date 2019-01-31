// pages/reg/reg.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  formSubmit: function(e){
    var stuNum = e.detail.value.stuNum;
    var phoneNum = e.detail.value.phoneNum;
    var psd1 = e.detail.value.password1;
    var psd2 = e.detail.value.password2;


    if (stuNum == "" || phoneNum==""||psd1=="")
    {
      wx.showToast({
        title: '有未填写信息',
        icon: "none"
      })

    }
    else{
      if (psd1 == psd2) {
        var user = {
          userNum: stuNum
        }
        wx.request({
          method: 'POST',
          url: 'http://39.108.186.54:8080/user/signUp',
          data: {
            "password": psd1,
            "phoneNum": phoneNum,
            "stuNum": stuNum
          },
          header: { "Accept": "*/*" },
          success: function (res) {
            wx.showToast({
              title: '注册成功',
            })
            wx.setStorageSync('user', user)
            wx.navigateTo({
              url: '../login/login',
            })
          }

        })
      }else{
        wx.showToast({
          title: '两次密码需一致',
          icon: "none"
        })

      }
      

    }
  }
})