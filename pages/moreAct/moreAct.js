// pages/moreAct/moreAct.js
Page({

  /**
   * Page initial data
   */
  data: {
    userNum: "",
    activityID: {},
    activities: {},
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
      url: 'http://39.108.186.54:8080/activity/' + this.data.userNum + '/activitiesByStuNum' + '/0' + '/10',
      header: { "Accept": "*/*" },
      success: function (res) {
        console.log("返回参加的活动ID：")
        //console.log(res.data)
        that.setData({
          activityID: res.data.data.content
        })
        console.log(that.data.activityID)

        for (var index in res.data.data.content) {
          var id = res.data.data.content[index].activityId;
          wx.request({
            url: 'http://39.108.186.54:8080/activity/activityInfo/' + id,
            header: { "Accept": "*/*" },
            success: function (res) {
              // that.setData({
              //   acitvities: res.data.data
              // })
              // console.log(that.data.acitvities)
              console.log(res.data.data)
              var acts = that.data.activities
              acts[index] =  res.data.data
              that.setData({
                activities: acts
              })
              // that.data.acitvities.push(res.data.data.content)
            }
          })
        }
        //console.log(that.data.acitvities)
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