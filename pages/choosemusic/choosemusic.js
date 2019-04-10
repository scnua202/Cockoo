// pages/choosemusic/choosemusic.js
const util = require('../../utils/util.js')
const RequestTools = require("../../utils/qqMusicTools.js")
Page({

  /**
   * 页面的初始数据 12346789
   */
  data: {
    name:'未知音频',
    author:'未知作者',
    poster:'',
    src:'',
    showHotSearch: true,
    showSearchResult: false,
    songSearchResult: [],

    //临时数据
    hotkey: [],
    special: '',
    searchKeyword: '',
    searchSongList: [],
    zhida: {},
    searchPageNum: 1,
    searchLoading: false,
    isFromSearch: true,
    searchLoadingComplete: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;

    //搜索频道
    util.getHotSearch(function (data) {
      that.setData({
        hotkey: data.data.hotkey,
        special: data.data.special_key
      })
    });
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
    wx.setNavigationBarTitle({
      title: '音乐搜索'
    })
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

  // 音乐搜索
  searchHandle: function (event) {
    let that = this;
    that.setData({
      showHotSearch:false,
      showSearchResult:true
      })
    var message = that.data.searchKeyword;
    console.log(message)
    const bgAudioManager = wx.getBackgroundAudioManager();
    RequestTools.searchMusic(1, 20, message).then(function(res) {
      console.log(res)
      if (res.data.song.list["0"].pay.payplay==1)
      {
        wx.showToast({
          title: '这歌要VIP啊!',
        })
      }

      RequestTools.getMusicImg(res.data.song.list["0"].albumid).then(function (url)
      {
        console.log(url)
        that.setData(
          {
            poster:url
          }
        )
      })

      that.setData({
        name: res.data.song.list["0"].songname,
        author: res.data.song.list["0"].singer["0"].name,
      })
      console.log(that.data.songname)
      //保存歌曲信息
      // that.data.songSearchResult = res.data.song.list
      that.setData({
        songSearchResult: res.data.song.list
      })

      console.log(that.data.songer)
      console.log(that.data.songname)

      RequestTools.playMusic(res.data.song.list["0"].songmid).then(function (res) {
        console.log(res)
        that.setData({
          src: res
        })
      })
    })
  },

  //热门搜索
  musicname:function(e)
  {
    this.setData({ searchKeyword:e.detail.value})
  },

  hotkeyTap: function (e) {
    let word = e.currentTarget.dataset.text;
    this.setData({
      searchKeyword: e.currentTarget.dataset.text
    });
    // this.fetchSearchList();
  },

  // fetchSearchList: function () {
  //   let that = this;
  //   let searchKeyword = that.data.searchKeyword,
  //     searchPageNum = that.data.searchPageNum;
    // util.getSearchMusic(searchKeyword, searchPageNum, function (data) {
    //   console.log(data)
    //   if (data.data.song.curnum != 0) {
    //     let searchList = [];
    //     that.data.isFromSearch ? searchList = data.data.song.list : searchList = that.data.searchSongList.concat(data.data.song.list)
    //     that.setData({
    //       searchSongList: searchList,
    //       zhida: data.data.zhida,
    //       searchLoading: true
    //     });
    //   } else {
    //     that.setData({
    //       searchLoadingComplete: true,
    //       searchLoading: false
    //     });
    //   }
    // })
  // },
})