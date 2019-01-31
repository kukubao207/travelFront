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
    userInfo2: {}
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

  formSubmit: function(e){
    var nickName = e.detail.value.newnickName;
    var stuNum = this.data.userNum;
    var phoneNum = this.data.userInfo2.data.phoneNum;
    var gender = this.data.userInfo2.data.gender;
    var credit = this.data.userInfo2.data.credit;
    var avatarURL = this.data.userInfo2.data.avatarURL;
    
    // console.log("Test:")
    // console.log(this.data.userInfo2.data.nickName),

    wx.request({
      method: 'POST',
      url: 'http://39.108.186.54:8080/user/updateUserInfo',
      data: {
        "stuNum": stuNum,
        "phoneNum": phoneNum,
        "avatarURL": avatarURL,
        "gender": gender,
        "nickName": nickName,
        "credit": credit
      },
      header: { "Accept": "*/*" },
      success: function(res){
        wx.navigateTo({
          url: '../personalInfo/personalInfo',
        })
      }
    })


    wx.showToast({
      title: stuNum + nickName,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log('onLoadMore')
    if (wx.getStorageSync('user').userNum){
      this.setData({
        userNum: wx.getStorageSync('user').userNum
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
          userInfo2: res.data
        })
        console.log(that.data)
      }
    })
    
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                userInfo: res.userInfo,
                ifGetUserInfo: false
              })
            }
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