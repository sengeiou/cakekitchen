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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.type = "s";
    super.onLoad(options);
    this.Base.setMyData({
      shoplist: [],
      type: options.type
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    this.Base.getAddress((res) => {
      console.log("shoplist", res);
      var mylat = 0;
      var mylng = 0;
      if (res.code == 0) {
        mylat = res.address.location.lat;
        mylng = res.address.location.lng;
      }
      instapi.shoplist({
        mylat: mylat,
        mylng: mylng
      }, (shoplist) => {
        for (var i = 0; i < shoplist.length; i++) {
          var mile = ApiUtil.GetDistance(mylat, mylng, shoplist[i].lat, shoplist[i].lng);
          var miletext = ApiUtil.GetMileTxt(mile);
          shoplist[i].miletext = miletext;
        }
        this.Base.setMyData({
          shoplist
        });
      });
    });
  }
  select(e) {

    var shop_id = e.currentTarget.dataset.shop_id;

    var pages = getCurrentPages(); //定义上页面

    var currPage = null; //当前页面

    var prevPage = null; //上一个页面

    if (pages.length >= 2) {

      currPage = pages[pages.length - 1]; //当前页面

      prevPage = pages[pages.length - 2]; //上一个页面

      if (prevPage) {

        //上一页存在则给上一个data赋值。则把title传过去

        prevPage.setData({

          shop_id

        });

      }
    }
    this.Base.backPage();
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.select = content.select;
Page(body)