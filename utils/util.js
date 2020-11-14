// 附带的时间戳
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 处理时间戳的方法
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 获取图片的宽高与屏幕的宽高比，获取缩放后的图片高度
function imageutil(images,userinfo){
  var imageSize={}
  wx.getImageInfo({
    src: 'https://cdn.juesedao.cn/gxw/banner1.jpg',
    success:res=>{
      console.log(res);
      // 图片原始宽高
      var originalWidth = res.width;
      var originalHeight= res.height*1.2;
      // 图片宽高比
      var originalScale = originalHeight/originalWidth;
      // 屏幕的宽高
      wx.getSystemInfo({
        success:function(res){
          var windowWidth = res.windowWidth*0.85;
          var windowHeight = res.windowHeight*0.8;
          var windowscale = windowHeight/windowWidth;
          if(originalScale < windowscale){//图片高宽比小于屏幕高宽比
            //图片缩放后的宽为屏幕宽
             imageSize.imageWidth = windowWidth;
             imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
          }else{//图片高宽比大于屏幕高宽比
            //图片缩放后的高为屏幕高
             imageSize.imageHeight = windowHeight;
             imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
          }
          console.log('缩放后的宽: ' + imageSize.imageWidth);
          console.log('缩放后的高: ' + imageSize.imageHeight);
          // 将缩放后的宽高和页面的封面图传递给到生成海报方法,
          getAvaterInfo(images,imageSize,userinfo);
        }
      })
    }
  })
}

// 生成海报
const getAvaterInfo=(res,imageSize,userinfo)=>{
  console.log('生成海报',res,imageSize,userinfo);                                                               
  wx.showLoading({
    title: '海报生成中....',
    mask:true,
  })
  var that = this;
  if(res){
    // 下载图片到本地
    wx.downloadFile({
      url: res,
      success:function(res){
        console.log(res);
        // 停止蒙版
        wx.hideLoading();
          // 下载成功
          if(res.statusCode === 200){
            var avterSrc = res.tempFilePath;
            console.log('获取到的本地图片地址:',avterSrc);
            // 定义canvas宽高
              var context = wx.createCanvasContext('canvpos');
              // 绘制白色背景
              wx.getSystemInfo({
                success: (result) => {
                  console.log(result);
                  context.setFillStyle('white')
                  context.rect(0, 0,result.windowWidth,result.windowHeight)
                  context.fill()
                },
              })
              context.beginPath();
              context.drawImage(avterSrc,0,0,imageSize.imageWidth,imageSize.imageHeight);
              if(userinfo){
                console.log('用户信息:',userinfo);
                console.log('用户头像路径：',userinfo.avatarUrl);
                wx.downloadFile({
                  url: userinfo.avatarUrl,
                  success:res=>{
                    if(res.statusCode === 200){
                    // 绘制用户头像
                    let avterSrc = res.tempFilePath;
                    // 设置圆的宽高半径及与头部图片的距离
                    // 设置圆的宽高半径及与头部图片的距离
                    // 圆x
                    let roundWidth = (imageSize.imageWidth/12);
                    // 圆Y
                    let roundHeight = imageSize.imageHeight+(imageSize.imageWidth/12)+(imageSize.imageHeight/24);
                    // 图Y
                    let roundimageHeight = imageSize.imageHeight+(imageSize.imageHeight/24);
                    context.arc(roundWidth+imageSize.imageWidth/12,roundHeight,roundWidth, 0, 2 * Math.PI)
                    context.fill()
                    context.save();
                    context.clip();
                    context.drawImage(avterSrc,imageSize.imageWidth/12,roundimageHeight,roundWidth*2,roundWidth*2);
                    context.restore();
                    // 写文字
                    wx.getSystemInfo({
                      success:res=>{
                        console.log(res.fontSizeSetting);
                        context.setFontSize(res.fontSizeSetting-2);
                        context.setFillStyle('black')
                        // 文字X
                        let textWidth = imageSize.imageWidth/12*2.5+imageSize.imageWidth/12;
                        context.fillText(userinfo.nickName,textWidth,roundHeight-(roundWidth/2.5));
                        // 设置文本的换行
                        let text  = '这是一段文字用于文本自按时';
                        // x,y，文本，canvas实例，判断文字宽度的长度，
                        TextList(textWidth,roundHeight+(roundWidth/4),text,context,imageSize.imageWidth-textWidth-32);
                        // 介绍文本
                        context.setFontSize(res.fontSizeSetting);
                        let title = '这是一段介绍的文本，我也不知道他到底有多。'
                        TextList(imageSize.imageWidth/12,roundHeight + roundWidth*2,title,context,imageSize.imageWidth);
                        // context.fillText(title,0,roundHeight + roundWidth*2);
                        context.setFontSize(res.fontSizeSetting-2);
                        context.fillText('广东省佛山市南海区',imageSize.imageWidth/12,roundHeight + roundWidth*2+50);
                        let image = context.measureText('2020.09.01').width;
                        context.setFontSize(res.fontSizeSetting-2);
                        context.fillText('2020.09.01',imageSize.imageWidth-image-imageSize.imageWidth/12,roundHeight + roundWidth*2+50);
                        context.beginPath();
                        context.setLineWidth(1)
                        context.setStrokeStyle('#666')
                        context.moveTo(imageSize.imageWidth/12,roundHeight + roundWidth*2+65)
                        context.lineTo(imageSize.imageWidth-imageSize.imageWidth/12,roundHeight + roundWidth*2+65)
                        context.stroke()

                        // 写小程序码
                        let xcx = "https://cdn.juesedao.cn/gxw/5dd5cf92cc9f45b9aa641ee7886d49f2";
                        wx.downloadFile({
                          url: xcx,
                          success:res=>{
                            if(res.statusCode === 200){
                              let avterSrc = res.tempFilePath;
                              console.log('小程序二维码：',avterSrc);
                              context.beginPath();
                              context.drawImage(avterSrc,imageSize.imageWidth/12,roundHeight+roundWidth*2+(imageSize.imageWidth/8)+40,(imageSize.imageWidth/8)*2,(imageSize.imageWidth/8)*2);
                              context.restore();

                              // 结束文字
                              let foot = '长按识别二维码'
                              let foots = '冠星王陶瓷未来家看文章'
                              context.fillText(foot,((imageSize.imageWidth/8)*2)*1.5,roundHeight+roundWidth*2+(imageSize.imageWidth/8)*1.8+40);
                              context.fillText(foots,((imageSize.imageWidth/8)*2)*1.5,roundHeight+roundWidth*2+(imageSize.imageWidth/8)*2.4+40);
                              context.draw();
                            }
                          }
                        })
                      }
                    })
                    }
                  }
                })
              }else{
                console.log('请授权登录');
              }
          }else{
            wx.showToast({
              title:'图片下载失败',
              icon:'none',
              duration:2000,
              success:function(){
                console.log('触发另一个图片下载')
              }
            })
          }
      }
    })
  }else{
    wx.hideLoading();
    console.log('回调另一个图片下载')
  }

  setTimeout(function(){
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'canvpos',
      success(res) {
        console.log(res.tempFilePath);
      }
    })
  },1000)
}
 // 多行文本换行
  function TextList(x,y,text,context,Width){
    let chr  = text.split("");
    let temp = '';
    let row = []; 
    for(let i=0;i<chr.length;i++){
      // 小于我决定的宽度
      if(context.measureText(temp).width<Width){
        temp+=chr[i];
      }else{
        i--;
        row.push(temp);
        temp='';
      }
    }
    row.push(temp); 
    for(let a = 0;a<row.length;a++){
      //由我觉得的xy定位
      if(a<=1){
        if(a == 1){
          if(context.measureText(row[1]).width>=Width){
            row[1].slice(1,3);
            row[1] = row[1].slice(0,row[1].length-2)+'......';
          }
          context.fillText(row[a],x,y+a*20);
          return false
        }
        if(row.length == 1){
          context.fillText(row[a],x,y+10);
          return false;
        }else{
          context.fillText(row[a],x,y+a*20);
        }
      }else{
      }

    }
  }


module.exports = {
  formatTime: formatTime,
  getAvaterInfo:getAvaterInfo,
  imageutil:imageutil,
  TextList:TextList
}
