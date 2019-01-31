var app = getApp()
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  formatTime: formatTime
};

function getData(url){
  return new Promise(function(resolve, reject){
    wx.request({
      url: "http://"+app.globalData.productIp+":"+app.globalData.productPort+"/"+url,
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}
function postData(url,data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: "http://" + app.globalData.productIp + ":" + app.globalData.productPort + "/" + url,
      method: "POST",
      data: data,
      header: {
        //'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

module.exports.getData = getData;
module.exports.postData = postData;




