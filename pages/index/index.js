Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliderList:[],
    sliderSize:0,
    sliderIndex:1,
    pageIndex: -1,
    hasMore:true,
    blogList:[],
    pageSize:20
  },

  swiperChange:function(e){
    // console.log(e.detail.current);
    var newIndex = parseInt(e.detail.current)+1;
    this.setData({
      sliderIndex: newIndex
    })
  },

  loadMore:function(){
    if(!this.data.hasMore){
      return;
    }
    ++this.data.pageIndex;
    console.log(this.data.pageIndex);
    wx.request({
      url: 'http://www.wanandroid.com/article/list/' + this.data.pageIndex+'/json',
      success:(res)=>{
        console.log(res);
        var newList = this.data.blogList.concat(res.data.data.datas);
        var length = (this.data.pageIndex+1) * this.data.pageSize;
        console.log("blog size ==", length);
        var flag = length < res.data.data.total;
        this.setData({
          blogList: newList,
          hasMore:flag
        })
      }
    })
  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://www.wanandroid.com/banner/json',
      success:(res)=>{
        console.log(res);
        var size = res.data.data.length;
        this.setData({
          sliderList: res.data.data,
          sliderSize: size
        })
      }
    });
    this.loadMore();
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})