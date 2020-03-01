// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
var WxParse = require('../../wxParse/wxParse');
import { ApiUtil } from "../../apis/apiutil.js";
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
    this.getinfo();

  }
  getinfo() {
    var api = new InstApi;
    var that = this;
    api.aboutuslist({ id: 1 }, (list) => {
      console.log(list)
      for (let item of list) {
        console.log(item.content)

        item.content = ApiUtil.HtmlDecode(item.content)
        // item.content = that.Base.util.HtmlDecode(item.content);
        WxParse.wxParse('content', 'html', item.content, that, 10);
      }

      that.Base.setMyData({
        list: list
      })
    })
  }
  boda(){
    var instinfo = this.Base.getMyData().instinfo;
    wx.makePhoneCall({
      phoneNumber: instinfo.customerservicemobile
    })
  }
  fuzhi(){
    var instinfo = this.Base.getMyData().instinfo;
    wx.setClipboardData({
      data: instinfo.weixin,
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.fuzhi = content.fuzhi;
body.boda=content.boda;
body.getinfo = content.getinfo;

Page(body)