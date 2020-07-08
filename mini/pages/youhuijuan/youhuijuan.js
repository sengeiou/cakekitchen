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
    this.Base.setMyData({
      usestatus:'A'
    })
  }
  onMyShow() {
    var that = this;
    var api=new MemberApi();
    var td = new Date().getTime();
    var usestatus = this.Base.getMyData().usestatus;
    api.getyouhuijuan({ usestatus: usestatus},(youhuijuan)=>{
      var arr=[];
      for(var i=0;i<youhuijuan.length;i++){
        youhuijuan[i].shijian = new Date(youhuijuan[i].shijian).getTime();
        if (usestatus=='A' && youhuijuan[i].shijian < td){
          youhuijuan[i].usestatus='C';
          api.guoqi({ id: youhuijuan[i].id},()=>{})
        }else {
          arr.push(youhuijuan[i]);
        }
      }
      this.Base.setMyData({youhuijuan:arr})


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
    this.Base.setMyData({
      usestatus:type
    });
    this.onMyShow();
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gotohome=content.gotohome;
body.bindshow = content.bindshow;
Page(body)