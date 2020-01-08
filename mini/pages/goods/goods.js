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
  ContentApi
} from "../../apis/content.api.js";
import {
  GoodsApi
} from "../../apis/goods.api.js";
var WxParse = require('../../wxParse/wxParse');

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    options.id = 5;
    super.onLoad(options);
    this.Base.setMyData({
      photolist: [],
      attrlist: [],
      info: {},
      photocurrent: 0,
      pricerange: "",
      showModalStatus: false,
      showpopup: false
    });
  }
  onMyShow() {
    var that = this;

    var goodsapi = new GoodsApi();
    goodsapi.info({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        info
      });
    });
    goodsapi.photolist({
      goods_id: this.Base.options.id
    }, (photolist) => {
      this.Base.setMyData({
        photolist
      });
    });
    goodsapi.attrlist({
      goods_id: this.Base.options.id
    }, (attrlist) => {
      var max = 0;
      var min = 999999999;
      for (var i = 0; i < attrlist.length; i++) {
        var attr = attrlist[i];
        attr.price = Number(attr.price);
        console.log("attrlist", attr.price);
        if (attr.price > max) {
          max = attr.price;
        }
        if (attr.price < min) {
          min = attr.price;
        }
      }
      if (max == min) {
        this.Base.setMyData({
          pricerange: max
        })
      } else {
        this.Base.setMyData({
          pricerange: min + "-" + max
        })
      }
      this.Base.setMyData({
        attrlist
      });
    });
  }

  photochange(e) {
    console.log(e);
    this.Base.setMyData({
      photocurrent: e.detail.current
    });
  }
  onShareAppMessage() {
    var data = this.Base.getMyData();
    var shareObj = {
      title: data.info.name,
      imageUrl: data.uploadpath + "goods/" + data.info.photo
    };
    return shareObj;
  }
  togglePopup() {
    var showpopup = this.Base.getMyData().showpopup;
    this.Base.setMyData({
      showpopup: !showpopup
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.photochange = content.photochange;
body.togglePopup = content.togglePopup;
Page(body)