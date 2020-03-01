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
    console.log("kaishile");



  }
  shouhuodizhi() {

    wx.navigateTo({
      url: '/pages/addresslist/addresslist',
    })

  }
  gerenxinxi() {
    wx.navigateTo({
      url: '/pages/xinxi/xinxi',
    })
  }
  getUserInfo() {
    console.log(123);
    var appbase = new AppBase();
    this.onShow();
    appbase.onMyShow();
    this.onMyShow();







  }
  myorder(e) {

    var can = e.currentTarget.id;



    if (can == undefined) {
      wx.navigateTo({
        url: '/pages/myorder/myorder',
      })
    }
    else {

      wx.navigateTo({
        url: '/pages/myorder/myorder?id=' + can,
      })

    }



  }
  guanyuwomen() {

    wx.navigateTo({
      url: '/pages/guanyuwomen/guanyuwomen',
    })

  }
  yijianfankui() {


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
  yinhanka() {
  console.log(123123);

    wx.navigateTo({
      url: '/pages/mybank/mybank',
    })

  }
  tuiguanma(){
    wx.navigateTo({
      url: '/pages/tuiguanma/tuiguanma',
    })

  }
  myyonjin(){
    wx.navigateTo({
      url: '/pages/yonjinguanli/yonjinguanli',
    })
  }
  youhuijuan(){

    wx.navigateTo({
      url: '/pages/youhuijuan/youhuijuan',
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
body.lianxi = content.lianxi;
body.yinhanka = content.yinhanka;
body.tuiguanma = content.tuiguanma;
body.myyonjin = content.myyonjin;
body.youhuijuan = content.youhuijuan;
Page(body)