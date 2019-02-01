//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["报名中", "进行中","已结束"],
    currentNavtab: "0",
    page: 0,
    page_size: 6,
    feed: [],
    feed_length: 0,
  },
  onLoad: function () {
    console.log('onLoad')
    this.getData();
  },
  switchTab: function(e){
    this.setData({
      //Tab切换时要清空数据
      currentNavtab: e.currentTarget.dataset.idx,
      feed: [],
      feed_length: 0,
      page: 0,
      page_size: 6,
    });
    if(this.data.currentNavtab == 0){
      this.getData();
    } else if (this.data.currentNavtab == 1){
      this.getData1();
    }else{
      this.getData2();
    }
  },

  //刷新数据
  getData: function () {
    let that = this
    let url = "activity/activityNotStarted/" + that.data.page + "/" + this.data.page_size;
    var result = util.getData(url).then(function (res) {
      console.log(res);
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },

  getData1: function () {
    let that = this
    let url = "activity/activityOnGoing/" + that.data.page + "/" + this.data.page_size;
    var result = util.getData(url).then(function (res) {
      console.log(res);
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },

  getData2: function () {
    let that = this
    let url = "activity/activityCompleted/" + that.data.page + "/" + this.data.page_size;
    var result = util.getData(url).then(function (res) {
      console.log(res);
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
      });
    }).catch(function (e) { return Promise.reject(e); });
  },

  //顶部下拉获取最新数据
  onPullDownRefresh: function () {
    let that = this
    if (this.data.currentNavtab == 0) {
      let url = "activity/activityNotStarted/0/" + this.data.page_size
      var result = util.getData(url).then(function (res) {
        console.log(res);
        that.setData({
          feed: res.data.data.content,
          feed_length: res.data.data.content.length,
          page: 1,
        });
        wx.stopPullDownRefresh()
      });
    } else if (this.data.currentNavtab == 1) {
      let url = "activity/activityOnGoing/0/" + this.data.page_size
      var result = util.getData(url).then(function (res) {
        console.log(res);
        that.setData({
          feed: res.data.data.content,
          feed_length: res.data.data.content.length,
          page: 1,
        });
        wx.stopPullDownRefresh()
      });
    } else {
      let url = "activity/activityCompleted/0/" + this.data.page_size
      var result = util.getData(url).then(function (res) {
        console.log(res);
        that.setData({
          feed: res.data.data.content,
          feed_length: res.data.data.content.length,
          page: 1,
        });
        wx.stopPullDownRefresh()
      });
    }
  },
  //滑动到底时，加载下一页的数据
  onReachBottom: function () {
    var that = this;
    if (this.data.currentNavtab == 0) {
      var pagenum = this.data.page + 1; //获取当前页数并+1
      let url = 'activity/activityNotStarted/' + pagenum + '/' + this.data.page_size;
      util.getData(url).then(function (res) {
        console.log(res)
        if (res.data.code === 200) {
          if (res.data.data.content.length !== 0) {
            that.setData({
              feed: that.data.feed.concat(res.data.data.content),
              feed_length: that.data.feed_length + res.data.data.content.length,
              page: pagenum,
            });
          } else {
            console.log("已经没有更多活动了")
          }
        }
      })
    } else if (this.data.currentNavtab == 1) {
      var pagenum = this.data.page + 1; //获取当前页数并+1
      let url = 'activity/activityOnGoing/' + pagenum + '/' + this.data.page_size;
      util.getData(url).then(function (res) {
        console.log(res)
        if (res.data.code === 200) {
          if (res.data.data.content.length !== 0) {
            that.setData({
              feed: that.data.feed.concat(res.data.data.content),
              feed_length: that.data.feed_length + res.data.data.content.length,
              page: pagenum,
            });
          } else {
            console.log("已经没有更多活动了")
          }
        }
      })
    } else {
      var pagenum = this.data.page + 1; //获取当前页数并+1
      let url = 'activity/activityCompleted/' + pagenum + '/' + this.data.page_size;
      util.getData(url).then(function (res) {
        console.log(res)
        if (res.data.code === 200) {
          if (res.data.data.content.length !== 0) {
            that.setData({
              feed: that.data.feed.concat(res.data.data.content),
              feed_length: that.data.feed_length + res.data.data.content.length,
              page: pagenum,
            });
          } else {
            console.log("已经没有更多活动了")
          }
        }
      })
    }
  },
  //跳转到活动详情
  bindQueTap: function (e) {
    let qid = e.currentTarget.dataset.qid;
    console.log(qid)
    wx.navigateTo({
      url: '../activity_info/activity_info?activityId=' + qid
    })
  },
})



