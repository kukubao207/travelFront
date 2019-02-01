  // pages/personalInfo/personalInfo.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifGetUserInfo: true,
    userNum: "",
    userInfo: {},
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log('onLoadMore')
    if (wx.getStorageSync('contacts').userNum){
      this.setData({
        userNum: wx.getStorageSync('contacts').userNum
      })
    }
    wx.request({
      //method: "GET",
      url: 'http://39.108.186.54:8080/user/userInfo/'+this.data.userNum,
      //data: "22222",
      header: { "Accept": "*/*" },
      success: function(res){
        console.log("返回个人信息：")
        console.log(res.data)
        that.setData({
          userInfo: res.data
        })
        console.log(that.data)
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