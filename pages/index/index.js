//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    width:null,
    height:null,
    userInfo:null,
  },
  onLoad: function () {
  },
  // 订阅信息
  getMessage(e){
    wx.requestSubscribeMessage({
      tmplIds: ['d60vCD8pLr_NrTqD9KfsSPkOrhPa5RX744Yz4U7EpoU'],
      success (res) {
        console.log(res);
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  // 生成海报
  getAvaterInfo:function(){
    // app.globalData.util.getAvaterInfo(images);
    wx.getSystemInfo({
      success: (result) => {
      let  width = result.windowWidth;
      let height = result.windowHeight
      this.setData({
        width:width*0.85,
        height:height
      })
      }
      })
  },
  // getuser
  getuser:function(e){
    const userInfo=e.detail.userInfo;
    let images = 'https://cdn.juesedao.cn/gxw/banner1.jpg';
    let image = app.globalData.util.imageutil(images,userInfo);
  },
  // getimages
  getimages:function(){},

  // 下载视频
  xiaz:function(){
    console.log('下载');
    let src = 'https://cdn.juesedao.cn/gxw/gxwxuanchuan%7E1.mp4';
    let fileName = new Date().valueOf();
    wx.downloadFile({
      url: src,
      filePath:wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
      success:function(res){
        console.log(res);
        console.log(res.filePath);
        wx.saveVideoToPhotosAlbum({
          filePath: res.filePath,
          success:function(res){
            console.log(res)
          }
        })
      }
    })
  }
})
