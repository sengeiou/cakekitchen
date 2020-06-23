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
    var api=new MemberApi();
    api.getyouhuijuan({},(youhuijuan)=>{
 this.Base.setMyData({youhuijuan})


    })
  }

  gotohome() {

    wx.switchTab({
      url: '/pages/home/home',
    })

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gotohome=content.gotohome;
Page(body)