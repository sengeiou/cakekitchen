// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=6;
    super.onLoad(options);
    this.Base.setMyData({order:null});
  }
  onMyShow() {
    var that = this;
    var orderapi=new OrderApi();
    orderapi.info({id:this.Base.options.id},(order)=>{
      this.Base.setMyData({ order});
    });
  }
  goorder(){
    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?from=success&id='+this.Base.options.id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.goorder = content.goorder;
Page(body)