// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      addresslist: []
    })
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();
    memberapi.addresslist({}, (addresslist) => {
      this.Base.setMyData({
        addresslist
      });
    });
  }
  addaddress(e){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  }
  edit(e){
    var id=e.currentTarget.id;

    wx.navigateTo({
      url: '/pages/address/address?id='+id,
    })
  }
  select(e){

    var address_id = e.currentTarget.id;

    var pages = getCurrentPages(); //定义上页面

    var currPage = null; //当前页面

    var prevPage = null; //上一个页面

    if (pages.length >= 2) {

      currPage = pages[pages.length - 1]; //当前页面

      prevPage = pages[pages.length - 2]; //上一个页面

      if (prevPage) {

        //上一页存在则给上一个data赋值。则把title传过去

        prevPage.setData({

          address_id

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
body.addaddress = content.addaddress;
body.edit = content.edit;
Page(body)