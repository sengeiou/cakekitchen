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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    options.goods_id = 5;
    options.attrs = "1*5";

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
      amount:0
    });

    var instapi = new InstApi();
    instapi.expresstimelist({}, (expresstimelist) => {
      var expresstime = null;
      for (var i = 0; i < expresstimelist.length; i++) {
        if (expresstimelist[i].id == this.Base.options.expresstime_id) {
          expresstime = expresstimelist[i];
          break;
        }
      }
      this.Base.setMyData({
        expresstimelist,
        expresstime
      });
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var shop_id = this.Base.getMyData().shop_id;
    if (shop_id > 0) {
      instapi.shopinfo({
        id: shop_id
      }, (shop) => {
        this.Base.setMyData({
          shop
        });
      });
    }
    var address_id = this.Base.getMyData().address_id;
    var memberapi = new MemberApi();
    var memberinfo = this.Base.getMyData().memberinfo;
    if (address_id == 0) {
      address_id = memberinfo.defaultaddress;
      this.Base.setMyData({
        address_id
      });
    }
    if (address_id > 0) {

      memberapi.addressinfo({
        id: address_id
      }, (address) => {
        this.Base.setMyData({
          address
        });
      });
    }

    var goodsapi = new GoodsApi();
    
    goodsapi.attrinfo({
      attrs: this.Base.options.attrs
    }, (attrlist) => {
      var amount=0;
      for(var i=0;i<attrlist.length;i++){
        amount += attrlist[i]["price"] * attrlist[i]["buycount"];
      }
      this.Base.setMyData({
        attrlist: attrlist
        , amount
      })
    });

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
    var address_id = data.address_id;
    if (expresstype == 'A') {
      if (shop_id == 0) {
        this.Base.info("请选择自提门店");
        return;
      }
    } else {
      if (address_id == 0) {
        this.Base.info("请选择配送地址");
        return;
      }
    }
    var expresstime=data.expresstime;
    if(expresstime==null){
      this.Base.info("请选择时间");
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认提交订单？',
      success: (con) => {
        console.log(con);
        if (con.confirm) {
          var orderapi=new OrderApi();
          var json={};
          json.attrs=this.Base.options.attrs;
          json.expresstype=data.expresstype;
          var address=data.address;
          if(expresstype=='A'){
            json.shop_id=shop_id;
          }else{
            json.address_name = address.name;
            json.address_mobile = address.mobile;
            json.address = address.address;
          }
          json.expressdate=data.expressdate;
          json.expresstime_id=data.expresstime.id;
          orderapi.create(json,(ret)=>{
            if(ret.code==0){
              this.Base.info("成功");
            }else{

              this.Base.info(ret.return);
            }
          });
        }
      }
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
Page(body)