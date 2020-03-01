// pages/coupon/coupon.js
// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
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
    var api = new MemberApi();
    api.getyouhuijuan({}, (youhuijuan) => {
      this.Base.setMyData({ youhuijuan })


    })
  }
  yinhanka() {
    console.log(123123);

    wx.navigateTo({
      url: '/pages/mybank/mybank',
    })

  }
  tuiguanma() {
    wx.navigateTo({
      url: '/pages/tuiguanma/tuiguanma',
    })

  }
  myyonjin() {
    wx.navigateTo({
      url: '/pages/myyonjin/myyonjin',
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.yinhanka = content.yinhanka;
body.tuiguanma = content.tuiguanma;
body.myyonjin = content.myyonjin;
Page(body)