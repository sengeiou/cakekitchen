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
      cat_id: 0,
      orderby:"",
      displaytype:"square"
    });

    var goodsapi = new GoodsApi();
    goodsapi.catlist({}, (catlist) => {
      var ncatlist=[];
      ncatlist.push({id:0,name:"全部分类"});
      ncatlist=ncatlist.concat(catlist)
      this.Base.setMyData({
        catlist: ncatlist,
        cat:ncatlist[0],
        cat_id: 0
      });
    });
    this.loadgoods();
  }


  loadgoods() {
    var data = this.Base.getMyData();
    var cat_id = data.cat_id;
    var orderby = data.orderby;

    var json={};
    if(cat_id>0){
      json.cat_id=cat_id;
    }
    if(orderby==""){
      json.orderby="r_main.seq";
    }
    if (orderby == "sales") {
      json.orderby = "r_main.salescount desc";
    }
    if (orderby == "price") {
      json.orderby = "r_main.price";
    }

    var goodsapi = new GoodsApi();
    goodsapi.list(json,(list)=>{
      this.Base.setMyData({list});
    });
  }

  onMyShow() {
    var that = this;
  }

  selectcat(e) {
    console.log(e);
    var seq = e.detail.value;
    var catlist = this.Base.getMyData().catlist;
    this.Base.setMyData({
      cat:catlist[seq],
      cat_id: catlist[seq].id
    });
    this.loadgoods();
  }
  ordertypechange(e){
    console.log(e);
    this.Base.setMyData({orderby:e.currentTarget.dataset.orderby});
    this.loadgoods();
  }
  displaytypechange(e){
    this.Base.setMyData({ displaytype: e.currentTarget.dataset.displaytype })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.selectcat = content.selectcat; 
body.ordertypechange = content.ordertypechange;
body.displaytypechange = content.displaytypechange;
body.loadgoods = content.loadgoods;
Page(body)