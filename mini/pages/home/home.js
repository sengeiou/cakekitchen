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
  GoodsApi
} from "../../apis/goods.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      indexbanner: [],
      catlist: [],
      hotgoods:[],
      indexcat:[]
    });


  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });
    var goodsapi = new GoodsApi(); 
    goodsapi.catlist({}, (catlist) => {
      this.Base.setMyData({
        catlist
      });
    });
    goodsapi.hotgoods({}, (hotgoods) => {
      this.Base.setMyData({
        hotgoods
      });
    });
    goodsapi.indexcat({}, (indexcat) => {
      this.Base.setMyData({
        indexcat
      });
    });
  }
  bannerclick(e) {
    console.log(e);
    wx.navigateTo({
      url: e.currentTarget.dataset.path,
    })
  }
  gosearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
  tocat(e){
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var json = { id: id ,name:name};
    wx.setStorageSync('c', json)
    wx.switchTab({
     
      url: '/pages/goodslist/goodslist'
    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.bannerclick = content.bannerclick;
body.gosearch = content.gosearch;
body.tocat = content.tocat;
Page(body)