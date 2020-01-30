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
  MemberApi
} from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      options
    })
  }
  onMyShow() {
    var that = this;

    var memberapi = new MemberApi();
    memberapi.addressinfo({
      id: this.Base.options.id
    }, (address) => {
      this.Base.setMyData({
        address
      });
    });

  }
  save(e) {
    var json = e.detail.value;
    if (this.Base.options.id != undefined) {
      json.primary_id = this.Base.options.id;
    }
    if (json.name.trim() == "") {
      this.Base.info("请输入收件人姓名");
      return;
    }
    if (json.mobile.trim() == "") {
      this.Base.info("请输入收件人电话");
      return;
    }
    if (json.address.trim() == "") {
      this.Base.info("请输入收件详细地址");
      return;
    }
    json.isdefault = json.isdefault ? "Y" : "N";
    wx.showModal({
      title: '提示',
      content: '确认保存？',
      success: (con) => {
        console.log(con);
        if (con.confirm) {
          console.log(e);
          var memberapi = new MemberApi();
          memberapi.updateaddress(json, (ret) => {
            if (ret.code == 0) {
              wx.showToast({
                title: "保存成功",
                icon: 'warn',
                duration: 2000
              })
              this.Base.backPage();
            } else {
              wx.showToast({
                title: ret.result,
                icon: 'warn',
                duration: 2000
              })
            }
          });
        }
      }
    })
  }
  deleteaddress() {
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: (con) => {
        console.log(con);
        if (con.confirm) {
          var memberapi = new MemberApi();
          memberapi.deleteaddress({
            idlist: this.Base.getMyData().options.id
          }, (ret) => {
            if (ret.code == 0) {
              wx.showToast({
                title: "删除成功",
                icon: 'warn',
                duration: 2000
              })
              this.Base.backPage();
            }
          });
        }
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.save = content.save;
body.deleteaddress = content.deleteaddress;
Page(body)