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
      memberinfo: {
        nickName: '',
        sex: '',
        sex_name:'',
        date: '',
        region: '',
        weixinhao: '',
        mobile:'',
        shengri:'',
        diqu:'',
        avatarUrl:'',
        name:''
      }
      })
  }
  onMyShow() {

    var that = this;
    console.log(123123);
    console.log(this.Base.getMyData().memberinfo);
    var api = new MemberApi;
    api.info({
      id: this.Base.getMyData().memberinfo.ids
    }, (info) => {
      // info.avatarUrl = AppBase.UserInfo.avatarUrl;
      this.Base.setMyData({
        memberinfo: info
      })
    })
    this.Base.setMyData({
      addresslist: [],
      region: this.Base.getMyData().memberinfo.diqu,
      date: this.Base.getMyData().memberinfo.shengri,
      picker: ['男', '女', '保密'],
      index: this.Base.getMyData().memberinfo.sex,
      shouji: this.Base.getMyData().memberinfo.mobile,
    })
  }
  bindpic(e) {
    var memberinfo = this.Base.getMyData().memberinfo;
    var that = this;
    this.Base.uploadOneImage("member", (ret) => {
      memberinfo.avatarUrl=ret;
      that.Base.setMyData({
        memberinfo,
        avatarUrl: ret,
        xiala: false
      });
      var memberapi = new MemberApi();
      memberapi.updatetouxiang({
        id: memberinfo.id,
        avatarUrl: memberinfo.avatarUrl
      }, (updatetouxiang) => {
        // this.Base.setMyData({
        //   updatetouxiang
        // });
        this.onMyShow();
        wx.showToast({
          title: '修改完成',
          icon: 'none'
        })

      });

    }, undefined, ['album', 'camera']);

  }
  RegionChange(e) {
    var memberinfo = this.Base.getMyData().memberinfo;
    memberinfo.diqu=e.detail.value
    this.setData({
      memberinfo
    })
  }
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  }
  DateChange(e) {
    var memberinfo = this.Base.getMyData().memberinfo;
    memberinfo.shengri = e.detail.value
    this.setData({
      memberinfo
    })
  }
  weixinhao(e) {
    var memberinfo = this.Base.getMyData().memberinfo;
    memberinfo.weixinhao = e.detail.value
    this.Base.setMyData({
      memberinfo
    })
  }
  name(e) {
    var memberinfo = this.Base.getMyData().memberinfo;
    memberinfo.name = e.detail.value
    this.Base.setMyData({
      memberinfo
    })
  }
  tijiao() {
    var name = this.Base.getMyData().name;
    var xinbie = this.Base.getMyData().index;
    var shenri = this.Base.getMyData().date;
    var diqu = this.Base.getMyData().region;
    // diqu = diqu[0] + diqu[1] + diqu[2];
    var weixinhao = this.Base.getMyData().weixinhao;
    var memberinfo =this.Base.getMyData().memberinfo;
    memberinfo.sex = xinbie;
    var json = {
      id: this.Base.getMyData().memberinfo.id,
      name: name,
      sex: xinbie,
      shengri: shenri,
      diqu: diqu,
      weixinhao: weixinhao
    }

    var api = new MemberApi;
    api.xiugai(memberinfo, (ret) => {
      console.log(ret)
      if (ret.code = "0") {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
        })
        setTimeout(() => {
          wx.navigateBack({
            
          })
        }, 2000)

      }
    })

  }
  getPhoneNumber(e){

    this.Base.getPhoneNo(e);

  }
  phonenoCallback(mobile, e) {
    console.log(e);
    var that=this;
   console.log("哈哈哈哈");
    var memberapi = new MemberApi();
  var memberinfo = this.Base.setMyData().memberinfo;
    memberapi.updateshouji({
    
      avatarUrl: mobile
    }, (updatetouxiang) => {
      memberinfo.mobile = mobile;
      
      that.setMyData({
        memberinfo
      });
      wx.showToast({
        title: '修改完成',
        icon: 'none'
      })

    });


  
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.addaddress = content.addaddress;
body.edit = content.edit;
body.bindpic = content.bindpic;
body.RegionChange = content.RegionChange;
body.DateChange = content.DateChange;
body.PickerChange = content.PickerChange;
body.name = content.name;
body.weixinhao = content.weixinhao;
body.tijiao = content.tijiao;
body.getPhoneNumber = content.getPhoneNumber;
Page(body)