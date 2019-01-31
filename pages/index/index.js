//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
     //这是轮播图图片
    imgUrls: [
      '../../images/logo.jpg',
      '../../images/logo.jpg',
      '../../images/logo.jpg',
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    page: 0,
    page_size: 6,
    feed: [],
    feed_length: 0,
  },

  onLoad: function () {
    console.log('onLoad')
    this.getData();
  },
  my_activity: function () {
    wx.navigateTo({
      url: '/pages/notify/notify',
    })
  },

  clock_in: function () {
    wx.navigateTo({
      url: '/pages/do_activity/do_activity',
    })
  },
  create_activity: function(){
    wx.navigateTo({
      url: '/pages/create_activity/create_activity',
    })
  },
  //跳转到问题页
  bindQueTap: function (e) {
    let qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '../question/question?id=' + qid
    })
  },
  //跳转到提问页
  bindAskTap: function (e) {
    wx.navigateTo({
      url: '../writeQuestion/writeQuestion'
    })
  },
  //刷新数据
  getData: function () {
    let that = this
    let url = "activity/list/" + that.data.page + "/"+this.data.page_size;
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
    let url = "activity/list/0/"+this.data.page_size
    var result = util.getData(url).then(function (res) {
      console.log(res);
      that.setData({
        feed: res.data.data.content,
        feed_length: res.data.data.content.length,
        page: 1,
      });
      wx.stopPullDownRefresh()
    });
  },
  //滑动到底时，加载下一页的数据
  onReachBottom: function () {
      var that = this;
      var pagenum = this.data.page + 1; //获取当前页数并+1
      let url = 'activity/list/' + pagenum + '/'+this.data.page_size;
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
  },
})
