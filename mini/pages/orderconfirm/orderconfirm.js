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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    options.goods_id = 5;
    options.attr_id = 1;
    options.expresstime_id = 1;
    options.expresstype = "A";
    options.buycount = 1;
    options.expressdate = "2020-01-30";
    super.onLoad(options);
    this.Base.setMyData({
      goodsinfo: null,
      attrinfo: null,
      expresstime: null,
      expressarea: null,
      buycount: this.Base.options.buycount,
      expresstype: this.Base.options.expresstype,
      expressdate: this.Base.options.expressdate,
      shop_id: 0,
      shop: null,
      address_id: 0,
      address: null
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    instapi.expresstime({
      id: this.Base.options.expresstime_id
    }, (expresstime) => {
      this.Base.setMyData({
        expresstime
      });
    });
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
    if (address_id > 0) {

      instapi.addressinfo({
        id: address_id
      }, (address) => {
        this.Base.setMyData({
          address
        });
      });
    }
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
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeexpresstype = content.changeexpresstype;
body.selectshop = content.selectshop;
Page(body)