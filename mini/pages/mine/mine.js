// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  
 
 

  }
  onMyShow() {
    var that = this;
   

   

  }
  shouhuodizhi(){

 wx.navigateTo({
   url: '/pages/addresslist/addresslist',
 })

  }
  gerenxinxi(){
    wx.navigateTo({
      url: '/pages/xinxi/xinxi',
    })
  }
  getUserInfo() {

    var appbase = new AppBase();

 this.onMyShow();

    AppBase.UserInfo.openid = undefined;


   


  }
  myorder(e){
  
    var can = e.currentTarget.id;


  
   if(can==undefined)
   {
     wx.navigateTo({
       url: '/pages/myorder/myorder',
     })
   }
   else{

     wx.navigateTo({
       url: '/pages/myorder/myorder?id=' +can,
     })

   }

 

  }
  guanyuwomen(){

 wx.navigateTo({
   url: '/pages/guanyuwomen/guanyuwomen',
 })

  }
  yijianfankui(){


    wx.navigateTo({
      url: '/pages/yijianfankui/yijianfankui',
    })

  }
  lianxi() {

    var instinfo = this.Base.getMyData().instinfo;
    console.log(instinfo);
    wx.showActionSheet({
      itemList: ["拨打电话"],
      success(e) {
        if (e.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: instinfo.customerservicemobile
          })
        }
      }
    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.shouhuodizhi = content.shouhuodizhi;
body.gerenxinxi = content.gerenxinxi;
body.getUserInfo = content.getUserInfo;
body.myorder = content.myorder;
body.guanyuwomen = content.guanyuwomen;
body.yijianfankui = content.yijianfankui;
body.lianxi=content.lianxi;
Page(body)