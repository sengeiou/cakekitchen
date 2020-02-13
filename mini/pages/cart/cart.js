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
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ attrlist: [], amount:0,unselectattr:[]})
  }
  onMyShow() {
    var that = this;

    var attrs = AppBase.ATTRS;
  

    var goodsapi = new GoodsApi();

    goodsapi.attrinfo({
      attrs
    }, (attrlist) => {
      this.Base.setattrlist(attrlist);
    });
  }

  setattrlist(attrlist){
    var newattrlist=[];
    var amount = 0;
    for (var i = 0; i < attrlist.length; i++) {
      if (Number(attrlist[i]["buycount"])>0){

        amount += attrlist[i]["price"] * attrlist[i]["buycount"];
        newattrlist.push(attrlist[i]);
      }
    }
    this.setMyData({
      attrlist: newattrlist,
      amount
    });
    this.setTab();
  }

  jia(e){
    var attr_id=e.currentTarget.id;
    var attrlist=this.Base.getMyData().attrlist;
    for(var i=0;i<attrlist.length;i++){
      if(attr_id==attrlist[i].id){
        attrlist[i].buycount++;
        if (attrlist[i].buycount>99){
          attrlist[i].buycount=99;
        }
        this.Base.setcart(attrlist[i].id, attrlist[i].buycount);
        this.Base.setattrlist(attrlist);

        break;
      }
    }
  }


  jian(e) {
    var attr_id = e.currentTarget.id;
    var attrlist = this.Base.getMyData().attrlist;
    for (var i = 0; i < attrlist.length; i++) {
      if (attr_id == attrlist[i].id) {
        attrlist[i].buycount--;
        if (attrlist[i].buycount < 2) {
          return
          wx.showModal({
            title: '提示',
            content: '确认删除商品？',
            success: (con) => {
              console.log(con);
              if(con.confirm){
                console.log(attrlist[i].id);
                return
                this.Base.removecart(attrlist[i].id);
                this.Base.setattrlist(attrlist);
              }
            }
          });
        }
        break;
      }
    }
  }
  shanchu(e)
  {
    console.log(e);
    var attrlist = this.Base.getMyData().attrlist;

  
    wx.showModal({
      title: '提示',
      content: '确认删除商品？',
      success: (con) => {
        console.log(con);
        if (con.confirm) {
          attrlist[e.currentTarget.dataset.index].buycount--;
     
          this.Base.removecart(e.currentTarget.dataset.id);
          this.Base.setattrlist(attrlist);
        }
      }
    });
  }
  confirm(){
    wx.showModal({
      title: '提示',
      content: '确认提交订单？',
      success: (con) => {
        console.log(con);
        if (con.confirm) {
            wx.navigateTo({
              url: '/pages/orderconfirm/orderconfirm?from=cart&attrs='+AppBase.ATTRS,
            })
        }
      }
    });
  }
  gohome(){

wx.switchTab({
  url: '/pages/home/home',
})

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.jia = content.jia; 
body.jian = content.jian;
body.setattrlist = content.setattrlist;
body.confirm = content.confirm;
body.gohome = content.gohome;
body.shanchu=content.shanchu;
Page(body)