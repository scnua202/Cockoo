// pages/choosemusic/choosemusic.js
const util = require('../../utils/util.js')
const RequestTools = require("../../utils/qqMusicTools.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'未知音频',
    author:'未知作者',
    poster:'',
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  searchHandle: function (event) {
    var message = this.data.name;
    const bgAudioManager = wx.getBackgroundAudioManager();
    RequestTools.searchMusic(1, 10, message).then(function(res) {
      console.log(res)
    })
  },

  musicname:function(e)
  {
    this.setData({name:e.detail.value})
  }
})