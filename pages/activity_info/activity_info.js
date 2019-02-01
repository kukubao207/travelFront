var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    activityId: "",
    activityInfo: {},
    activityManInfo: {},
    isRegisterActivity: false,
  },
  //事件处理函数
  onLoad: function (options) {
    console.log(options.activityId)
    this.setData({
      activityId: options.activityId
    })
    this.getActivityInfo();
    this.checkIsRegister();
  },
  checkIsRegister: function (e) {
    let that = this;
    let user = wx.getStorageSync('user');
    let stuNum = user.userNum;
    console.log(stuNum)
    let url = 'user/getActivityInfo/'+stuNum + '/'+this.data.activityId;
    util.getData(url).then(res=>{
      console.log(res);
      if(res.data.data===null){
        that.setData({
          isRegisterActivity:false
        })
      }else{
        that.setData({
          isRegisterActivity: true
        })
      }
    })
  },
  registerActivity: function (e) {
    console.log(e)
    let that = this;
    let activityId = e.currentTarget.dataset.activityid;
    let user = wx.getStorageSync('user');
    let url = 'user/registerActivity/' + activityId;
    let jsonData = {
      activityId: activityId,
      stuNum: user.userNum,
      password: '',
      phoneNum: '',
    }
    util.postData(url,jsonData).then(res=>{
      console.log(res)
      if(res.data.code===200){
        that.setData({
          isRegisterActivity:true,
        })
        wx.showToast({
          title: '报名成功',
        })
      }else if(res.data.code===8000){
        wx.showToast({
          title: '超过报名截止时间!',
        })
      }else if(res.data.code===9000){
        wx.showToast({
          title: '已报名过',
        })
      }
    })
  },
  bindPersonalInfoTap: function () {
    var contacts = {
      userNum: this.data.activityManInfo.stuNum
    }
    wx.setStorageSync('contacts', contacts)
    wx.navigateTo({
      url: '../contactInfo/contactInfo'
    })
  },

  getActivityInfo: function() {
    let that = this;
    let url = '/activity/activityInfo/'+ this.data.activityId;
    util.getData(url).then(res => {
      if(res.data.code === 200){
        that.setData({
          activityInfo:res.data.data,
        })
        let url = '/user/userInfo/' + res.data.data.stuNum;
        util.getData(url).then(res => {
          if(res.data.code === 200){
            that.setData({
              activityManInfo: res.data.data
            })
          }
        })
      }
    })
  }
})
