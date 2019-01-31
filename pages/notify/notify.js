//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["报名中", "进行中","已结束"],
    currentNavtab: "0"
  },
  onLoad: function () {

  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})
