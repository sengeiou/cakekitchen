// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  ApiUtil
} from "../../apis/apiutil";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  OrderApi
} from "../../apis/order.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
import {
  GoodsApi
} from "../../apis/goods.api.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.attrs = "1*5,2*1";

    var now = new Date();
    now = new Date(now.getTime() + 1 * 24 * 3600 * 1000);
    var startdate = ApiUtil.FormatDate(ApiUtil.FormatDateTime(now));
    var expressdate = startdate;
    now = new Date(now.getTime() + 7 * 24 * 3600 * 1000);
    var enddate = ApiUtil.FormatDate(ApiUtil.FormatDateTime(now));


    super.onLoad(options);
    this.Base.setMyData({
      attrlist: null,
      expresstime: null,
      expressarea: null,
      buycount: this.Base.options.buycount,
      expresstype: this.Base.options.expresstype == "B" ? "B" : "A",
      expressdate: this.Base.options.expressdate == undefined ? expressdate : this.Base.options.expressdate,
      shop_id: 0,
      shop: null,
      address_id: 0,
      address: null,
      startdate,
      enddate,
      amount: 0,
      contactmobile: "",
      remarks: ""
    });

    var instapi = new InstApi();
    
  }
  onMyShow() {
    var attrs = this.Base.options.attrs;
    var that = this;
   
   
    // return;
    var instapi = new InstApi();
 var api=new OrderApi();
 api.info({id:this.options.id},(orderinfo)=>{
   
    this.Base.setMyData({orderinfo});
   var shop_id = orderinfo.shop_id;
   instapi.shopinfo({
     id: shop_id
   }, (shop) => {
     this.Base.setMyData({
       shop, shop_id
     });
   });


   instapi.expresstimelist({}, (expresstimelist) => {
     var expresstime = null;
     for (var i = 0; i < expresstimelist.length; i++) {
       if (expresstimelist[i].id == orderinfo.expresstime_id) {
         expresstime = expresstimelist[i];
         break;
       }
     }
     this.Base.setMyData({
       expresstimelist,
       expresstime,
       expresstype: orderinfo.expresstype
     });
   });
 })

  }
  changeexpresstype(e) {
    var type = e.currentTarget.dataset.type;
    this.Base.setMyData({
      expresstype: type
    })
  }
  selectshop() {
    wx.navigateTo({
      url: '/pages/shoplist/shoplist?type=s',
    })
  }
  selectaddress() {

    wx.navigateTo({
      url: '/pages/addresslist/addresslist?type=s',
    })
  }

  submit() {
    var data = this.Base.getMyData();
    var expresstype = data.expresstype;
    var shop_id = data.shop_id;
    if (expresstype == 'A') {
      if (shop_id == 0) {
        this.Base.info("请选择门店");
        return;
      }
    } 
    var wechatapi = new WechatApi();
    wechatapi.prepay({ id: this.options.id }, (payparams) => {

      payparams.success = (res) => {
        console.log("payment success", res);
        this.Base.options.attrs = "";
        wx.navigateTo({
          url: '/pages/success/success?id=' + this.options.id,
        })
      };
      payparams.fail = (res) => {
        console.log("payment fail", res);
        wx.navigateTo({
          url: '/pages/order/order?id=' + this.options.id,
        })
      };
      wx.requestPayment(payparams);
    });

  }

  selectdate(e) {
    console.log(e);
    this.Base.setMyData({
      expressdate: e.detail.value
    });
  }
  selecttime(e) {
    console.log(e);
    var seq = e.detail.value;
    var expresstimelist = this.Base.getMyData().expresstimelist;
    this.Base.setMyData({
      expresstime: expresstimelist[seq]
    });
  }
  changecontactmobile(e) {
    console.log(e);
    this.Base.setMyData({
      contactmobile: e.detail.value
    });
  }
  getmobile(e) {
    this.Base.getPhoneNo(e);
  }
  phonenoCallback(mobile, e) {
    console.log(e);

    this.setMyData({
      contactmobile: mobile
    });
  }
  changeremarks(e) {

    console.log(e);
    this.Base.setMyData({
      remarks: e.detail.value
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeexpresstype = content.changeexpresstype;
body.selectshop = content.selectshop;
body.selectaddress = content.selectaddress;
body.submit = content.submit;
body.selectdate = content.selectdate;
body.selecttime = content.selecttime;
body.changecontactmobile = content.changecontactmobile;
body.changeremarks = content.changeremarks;
body.getmobile = content.getmobile;
Page(body)