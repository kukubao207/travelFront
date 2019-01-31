//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    ifGetUserInfo:true,
    motto: 'Hello World',
    userInfo: {},
    userInfo2: {},
    userNum: "",
    organizeActivities : {},
    activityID: {},
    acitvities: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../more/more'
    })
  },
  moreOrginazeActivities:function(){
    wx.navigateTo({
      url: '../moreOrg/moreOrg'
    })
  },

  moreActivities: function(){
    wx.navigateTo({
      url: '../moreAct/moreAct'
    })
  },
  
  bindPersonalInfoTap: function() {
    wx.navigateTo({
      url: '../personalInfo/personalInfo'
    })
  },
  onLoad: function () {
    let that=this
    console.log('onLoadMore')

    if (wx.getStorageSync('user').userNum) {
      this.setData({
        userNum: wx.getStorageSync('user').userNum
      })
    }
    wx.request({
      //method: "GET",
      url: 'http://39.108.186.54:8080/user/userInfo/' + this.data.userNum,
      //data: "22222",
      header: { "Accept": "*/*" },
      success: function (res) {
        console.log("返回个人信息：")
        console.log(res.data)
        that.setData({
          userInfo2: res.data
        })
        console.log(that.data)
      }
    })

    wx.request({
      //method: "GET",
      url: 'http://39.108.186.54:8080/user/myOrganizeActivity/' + this.data.userNum+'/0'+'/1',
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

    wx.request({
      //method: "GET",
      url: 'http://39.108.186.54:8080/activity/' + this.data.userNum + '/activitiesByStuNum' + '/0' + '/1',
      header: { "Accept": "*/*" },
      success: function (res) {
        console.log("返回参加的活动ID：")
        //console.log(res.data)
        that.setData({
          activityID: res.data.data.content
        })
        console.log(that.data.activityID['0'].activityId)

        wx.request({
          url: 'http://39.108.186.54:8080/activity/activityInfo/' + that.data.activityID['0'].activityId,
          header: { "Accept": "*/*" },
          success: function(res){
            that.setData({
              acitvities:res.data.data
            })
            console.log(that.data.acitvities)
          }
        })  


      }
    })

    // 查看是否授权
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
  loginTap: function () {
    wx.navigateTo({
      url: '../more/more'
    })
  }
  
})