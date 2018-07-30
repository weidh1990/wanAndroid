Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectList:[],
    name:"",
    hasMore:true,
    blogList:[],
    pageIndex:-1,
    pageSize:20,
    blogListId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.catId){
      this.setData({
        blogListId: options.catId
      })
    }

    if (options.title){
      wx.setNavigationBarTitle({
        title: options.title,
      })
    }

    if(options.className){
      this.setData({
        name: options.className
      })
    }

    this.loadMore();
  },

  loadMore:function(){
    if(!this.data.blogListId){
      return;
    }
    if(!this.data.hasMore){
      return ;
    }
    ++this.data.pageIndex;
    wx.request({
      url: 'http://www.wanandroid.com/article/list/' + this.data.pageIndex +'/json',
      data:{
        cid: this.data.blogListId
      },
      success:(res)=>{
        var newList = this.data.blogList.concat(res.data.data.datas);
        var length = res.data.data.total;
        var flag = (this.data.pageIndex + 1) * this.data.pageSize < length;
        this.setData({
          blogList: newList,
          hasMore:flag
        })
      }
    })
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