// pages/moreOrg/moreOrg.js
Page({

  /**
   * Page initial data
   */
  data: {
    userNum: "",
    organizeActivities: {},
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this
    console.log('onLoadMoreOrg')

    if (wx.getStorageSync('user').userNum) {
      this.setData({
        userNum: wx.getStorageSync('user').userNum
      })
    }
    wx.request({
      //method: "GET",
      url: 'http://39.108.186.54:8080/user/myOrganizeActivity/' + this.data.userNum + '/0' + '/10',
      header: { "Accept": "*/*" },
      success: function (res) {
        console.log("返回组织的活动信息：")
        //console.log(res.data)
        that.setData({
          organizeActivities: res.data.data.content
        })
        //console.log(that.data.organizeActivities.data.content["0"])
        console.log(that.data.organizeActivities)
      }
    })


    
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

  }
})