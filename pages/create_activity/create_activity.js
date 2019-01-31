// pages/create_activity/create_activity.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    credit: "",
    endTime: "2019-01-30 12:00",
    enrollEndTime: "2019-01-30 12:00",
    id: "",
    introduction: "",
    location: "",
    other: "无",
    personNumCur: 0,
    personNumLimit: "",
    responsiblePersonPhoneNum: "",
    startTime: "2019-01-30 12:00",
    state: 0,
    stuNum: "",
    title: "",
  },
  onLoad: function (options) {

  },
  updateTitle: function (e) {
    let that = this;
    let title = e.detail.value
    that.setData({
      title: title
    });
  },
  updateStartTime: function (e) {
    this.setData({
      startTime: e.detail.dateString
    })
  },
  updateEndTime: function (e) {
    this.setData({
      endTime: e.detail.dateString
    });
  },
  updateEnrollEndTime: function (e) {
    this.setData({
      enrollEndTime: e.detail.dateString
    });
  },
  updateLocation: function (e) {
    let that = this;
    let location = e.detail.value
    that.setData({
      location: location
    });
  },
  updateOther: function (e) {
    let that = this;
    let other = e.detail.value
    that.setData({
      other: other
    });
  },
  updatePersonNumCur: function (e) {
    let that = this;
    let personNumCur = e.detail.value;
    that.setData({
      personNumCur: personNumCur
    });
  },
  updatePersonNumLimit: function (e) {
    let that = this;
    let personNumLimit = e.detail.value;
    that.setData({
      personNumLimit: personNumLimit
    });
  },
  updateResponsiblePersonPhoneNum: function (e) {
    let that = this;
    let responsiblePersonPhoneNum = e.detail.value;
    that.setData({
      responsiblePersonPhoneNum: responsiblePersonPhoneNum
    });
  },
  updateCredit: function (e) {
    let that = this;
    let credit = e.detail.value;
    that.setData({
      credit: credit
    });
  },
  updateIntroduction: function (e) {
    let that = this;
    let introduction = e.detail.value
    that.setData({
      introduction: introduction
    });
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  create_new_activity() {
    let user = wx.getStorageSync('user');
    let jsonData = {
      "credit": this.data.credit,
      "endTime": this.data.endTime + " 00:00:00",
      "enrollEndTime": this.data.enrollEndTime + " 00:00:00",
      "id": this.data.id,
      "introduction": this.data.introduction,
      "location": this.data.location,
      "other": this.data.other,
      "personNumCur": this.data.personNumCur,
      "personNumLimit": this.data.personNumLimit,
      "responsiblePersonPhoneNum": this.data.responsiblePersonPhoneNum,
      "startTime": this.data.startTime + " 00:00:00",
      "state": this.data.state,
      "stuNum": this.data.stuNum,
      "title": this.data.title
    }
    let url = "user/createActivity/" + user.userNum;
    util.postData(url, jsonData).then(res => {
      console.log(res)
      if (res.data.code === 200) {
        wx.showToast({
          title: '活动创建成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(
          function () {
            wx.navigateBack({})
          }, 1200
        )
      } else if (res.data.code !== 201) {
        wx.showToast({
          title: '活动创建失败',
          icon: 'fail',
          duration: 2000
        })
      }
    }).catch(function (e) {
      return Promise.reject(e);
    });
  }
})