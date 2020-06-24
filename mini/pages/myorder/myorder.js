// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
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

 if(this.Base.options.id==undefined)
 {
   this.Base.setMyData({ tab: 0 })

   var api = new OrderApi();
   api.myorder({}, (myorder) => {


     this.Base.setMyData({ myorder })


   })

 }
else{
   this.switchtab1(this.Base.options.id);
   

}
   
    this.Base.setMyData({
      indexbanner: [],
      catlist: [],
      hotgoods: [],
      indexcat: []
    });
  }
  onMyShow() {
    var that = this;
  
    var goodsapi = new GoodsApi(); 
    goodsapi.indexcat({}, (indexcat) => {
      this.Base.setMyData({
        indexcat
      });
    });
  }
  switchtab(e) {
    console.log(e);
    this.Base.setMyData({ tab: e.currentTarget.id })
   
    

    if ( e.currentTarget.id ==0)
    {

      var api = new OrderApi();
      api.myorder({}, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }
    if (e.currentTarget.id == 1) {

      var api = new OrderApi();
      api.myorder({ status:'P'}, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }

    if (e.currentTarget.id == 2) {

      var api = new OrderApi();
      api.myorder({ status: 'Q' }, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }
    if (e.currentTarget.id == 4) {

      var api = new OrderApi();
      api.myorder({ status: 'W' }, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }

    if (e.currentTarget.id == 3) {

      var api = new OrderApi();
      api.myorder({ status: 'T' }, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }

  }

  switchtab1(id) {
 
    this.Base.setMyData({ tab: id })

  

    if (id== 0) {

      var api = new OrderApi();
      api.myorder({}, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }
    if (id == 1) {

      var api = new OrderApi();
      api.myorder({ status: 'P' }, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }
    if (id == 4) {

      var api = new OrderApi();
      api.myorder({ status: 'W' }, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }
    if (id == 2) {

      var api = new OrderApi();
      api.myorder({ status: 'Q' }, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }

    if (id == 3) {

      var api = new OrderApi();
      api.myorder({ status: 'T' }, (myorder) => {


        this.Base.setMyData({ myorder })


      })

    }

  }
  orderinfo(e)
  {
    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?id='+e.currentTarget.id,
    })

  }
  gotohome() {

    wx.switchTab({
      url: '/pages/home/home',
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.shouhuodizhi = content.shouhuodizhi;
body.gerenxinxi = content.gerenxinxi;
body.getUserInfo = content.getUserInfo;
body.myorder = content.myorder;
body.switchtab = content.switchtab;
body.orderinfo = content.orderinfo;
body.switchtab1 = content.switchtab1;
body.gotohome=content.gotohome;
Page(body)