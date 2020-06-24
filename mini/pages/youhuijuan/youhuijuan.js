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

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "wsy") {
      this.Base.setMyData({
        show: "wsy"
      })
    }
    if (type == "ysy") {
      this.Base.setMyData({
        show: "ysy"
      })
    }
    if (type == "ysq") {
      this.Base.setMyData({
        show: "ysq"
      })
    }
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gotohome=content.gotohome;
body.bindshow = content.bindshow;
Page(body)