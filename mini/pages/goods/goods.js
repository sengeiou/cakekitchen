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
    //options.id = 5;
    super.onLoad(options);

    var now = new Date();
    now = new Date(now.getTime() + 1 * 24 * 3600 * 1000);
    var startdate = ApiUtil.FormatDate(ApiUtil.FormatDateTime(now));
    now = new Date(now.getTime() + 7 * 24 * 3600 * 1000);
    var enddate = ApiUtil.FormatDate(ApiUtil.FormatDateTime(now));

    this.Base.setMyData({
      photolist: [],
      attrlist: [],
      expresstimelist: [],
      currentattr: null,
      currentexpresstime: null,
      expresstype: "",
      commentlist: [],
      purchaselist: [],
      recommlist: [],
      rankA: 0,
      rankB: 0,
      rankC: 0,
      info: {},
      photocurrent: 0,
      pricerange: "",
      showModalStatus: false,
      showpopup: false,
      intab: 0,
      buycount: 1,
      startdate,
      enddate,
      expressdate: ""
    });
  }
  onMyShow() {
    var that = this;

    var goodsapi = new GoodsApi();
    goodsapi.info({
      id: this.Base.options.id
    }, (info) => {

      var content = ApiUtil.HtmlDecode(info.content);
      WxParse.wxParse('content', 'html', content, that, 10);
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
    goodsapi.commentlist({
      goods_id: this.Base.options.id
    }, (ret) => {
      this.Base.setMyData({
        commentlist: ret.commentlist,
        rankA: ret.rankA,
        rankB: ret.rankB,
        rankC: ret.rankC
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
          pricerange: max.toFixed(2)
        })
      } else {
        this.Base.setMyData({
          pricerange: min.toFixed(2) + "-" + max.toFixed(2)
        })
      }
      this.Base.setMyData({
        attrlist
      });
    });
    goodsapi.purchaselist({
      goods_id: this.Base.options.id
    }, (purchaselist) => {
      this.Base.setMyData({
        purchaselist
      });
    });
    goodsapi.recommlist({}, (recommlist) => {

      recommlist=  recommlist.filter((item)=>{
       
        return item.id!=this.Base.options.id

      })


      this.Base.setMyData({
        recommlist
      });
    });

    var instapi = new InstApi();
    instapi.expresstimelist({}, (expresstimelist) => {
      this.Base.setMyData({
        expresstimelist
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
  changetab(e) {
    var tab = e.currentTarget.dataset.tab;
    this.Base.setMyData({
      intab: tab
    });
  }
  selectattr(e) {
    var attrid = e.currentTarget.dataset.attrid;
    var attrlist = this.Base.getMyData().attrlist;
    for (var i = 0; i < attrlist.length; i++) {
      if (attrlist[i].id == attrid) {
        this.Base.setMyData({
          currentattr: attrlist[i]
        });
        break;
      }
    }
  }
  selectexpresstime(e) {
    var attrid = e.currentTarget.dataset.attrid;
    var expresstimelist = this.Base.getMyData().expresstimelist;
    for (var i = 0; i < expresstimelist.length; i++) {
      if (expresstimelist[i].id == attrid) {
        this.Base.setMyData({
          currentexpresstime: expresstimelist[i]
        });
        break;
      }
    }
  }
  jia() {
    var buycount = this.Base.getMyData().buycount;
    if (buycount >= 99) {
      return;
    }
    buycount++;
    this.Base.setMyData({
      buycount
    });
  }
  jian() {

    var buycount = this.Base.getMyData().buycount;
    if (buycount <= 1) {
      return;
    }
    buycount--;
    this.Base.setMyData({
      buycount
    });
  }
  selectdate(e) {
    console.log(e);

    this.Base.setMyData({
      expressdate: e.detail.value
    });
  }
  confirm() {
    var info = this.Base.getMyData().info;
    var currentattr = this.Base.getMyData().currentattr;
    var currentexpresstime = this.Base.getMyData().currentexpresstime;
    var buycount = this.Base.getMyData().buycount;
    var expresstype = this.Base.getMyData().expresstype;
    var expressdate = this.Base.getMyData().expressdate;

    if (currentattr == null) {
      this.Base.info("请选择规格");
      return;
    }
    if (expressdate == "") {
      this.Base.info("请选择配送日期");
      return;
    }
    if (currentexpresstime == null) {
      this.Base.info("请选择配送时间");
      return;
    }
    if (expresstype == "") {
      this.Base.info("请选择配送方式");
      return;
    }

    this.togglePopup();
    wx.navigateTo({
      url: '/pages/orderconfirm/orderconfirm?goods_id=' + info.id +
        "&attrs=" + currentattr.id+"*"+buycount +
        "&expresstime_id=" + currentexpresstime.id +
        "&expresstype=" + expresstype +
        "&expressdate=" + expressdate,
    })

  }

  selectexpresstype(e) {
    var type = e.currentTarget.dataset.type;
    this.Base.setMyData({
      expresstype: type
    })
  }
  tocart(){

    var currentattr = this.Base.getMyData().currentattr;
    var buycount = this.Base.getMyData().buycount;
    if (currentattr == null) {
      this.Base.info("请选择规格");
      return;
    }
    this.Base.addtocart(currentattr.id,buycount);
    this.togglePopup();
    wx.showToast({
      title: '已加入购物车',
    })
  }
gotop(){
  wx.pageScrollTo({
    scrollTop: 0
  })
}
  gotop1(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.photochange = content.photochange;
body.togglePopup = content.togglePopup;
body.changetab = content.changetab;
body.selectattr = content.selectattr;
body.selectexpresstime = content.selectexpresstime;
body.jia = content.jia;
body.jian = content.jian;
body.selectdate = content.selectdate;
body.confirm = content.confirm;
body.selectexpresstype = content.selectexpresstype;
body.tocart = content.tocart;
body.gotop = content.gotop;
body.gotop1 = content.gotop1;
Page(body)