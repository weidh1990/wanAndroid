// pages/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectCid:0,
    index:0,
    projectList:[],
    hasMore:true,
    projectBlogList:[],
    pageIndex:0,
    pageSize:15
  },

  bindPickerChange:function(e){
    // console.log("select",e);
    var selectedIndex = e.detail.value;
    var newprojectId = this.data.projectList[selectedIndex].id;
    console.log("selectedIndex===", selectedIndex);
    console.log("newprojectId===", newprojectId);
    this.setData({
      index: selectedIndex,
      hasMore: true,
      projectBlogList: [],
      pageIndex: 0,
      projectCid: newprojectId
    });
    this.loadMore();
  },

  loadMore:function(){
    if(!this.data.hasMore){
      return;
    }
    ++this.data.pageIndex;
    console.log("index", this.data.pageIndex);
    console.log("projectCid", this.data.projectCid);
    wx.request({
      url: 'http://www.wanandroid.com/project/list/' + this.data.pageIndex+'/json',
      data:{
        cid: this.data.projectCid
      },
      success:(res)=>{
        var newList = this.data.projectBlogList.concat(res.data.data.datas);
        var length = res.data.data.total;
        var flag = this.data.pageIndex * this.data.pageSize < length;
        this.setData({
          projectBlogList: newList,
          hasMore: flag
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://www.wanandroid.com/project/tree/json',
      success:(res)=>{
        // console.log(res);
        this.setData({
          projectCid: res.data.data[0].id,
          projectList: res.data.data
        });
        this.loadMore();
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
    this.setData({
      hasMore:true,
      projectBlogList: [],
      pageIndex: 0
    })
    this.loadMore();
    wx.stopPullDownRefresh();
  
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