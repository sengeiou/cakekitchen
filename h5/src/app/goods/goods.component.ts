import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { GoodsApi } from 'src/providers/goods.api';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
  providers: [GoodsApi]
})
export class GoodsComponent extends AppBase {
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public goodsApi: GoodsApi
  ) {
    super(router, activeRoute, instApi, memberApi);

  }
  info = null;
  photolist = [];
  commentlist = [];
  rankA = 0;
  rankB = 0;
  rankC = 0;
  pricerange = "";
  attrlist = [];
  purchaselist = [];
  recommlist = [];
  expresstimelist = [];

  currentattr=null;
  addresslist=[];
  currentaddress=null;
  buycount=1;

  onMyLoad() {
    var that = this;
    var goodsapi = this.goodsApi;
    goodsapi.info({
      id: this.params.id
    }).then((info: any) => {

      info.content = this.util.HtmlDecode(info.content);
      this.info = info;
    });
    goodsapi.photolist({
      goods_id: this.params.id
    }).then((photolist: []) => {
      this.photolist = photolist;
    });
    goodsapi.commentlist({
      goods_id: this.params.id
    }).then((ret: any) => {
      this.commentlist = ret.commentlist;
      this.rankA = ret.rankA;
      this.rankB = ret.rankB;
      this.rankC = ret.rankC;
    });
    goodsapi.attrlist({
      goods_id: this.params.id
    }).then((attrlist: [{ price }]) => {
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
        this.pricerange = max.toFixed(2);
      } else {
        this.pricerange = min.toFixed(2) + "-" + max.toFixed(2)

      }
      this.attrlist = attrlist;
    });
    goodsapi.purchaselist({
      goods_id: this.params.id
    }).then((purchaselist: []) => {
      this.purchaselist = purchaselist;
    });
    goodsapi.recommlist({}).then((recommlist: [{ id }]) => {
      var vk = [];
      vk = recommlist.filter((item) => {
        return item.id != that.params.id
      })
      this.recommlist = vk;
    });

    var instapi = this.instApi;
    instapi.expresstimelist({}).then((expresstimelist: []) => {
      this.expresstimelist = expresstimelist;
    });
  }

  isfav = false;
  onMyShow() {
    this.memberApi.isfav({ goods_id: this.params.id }).then((isfav: boolean) => {
      this.isfav = isfav;
    });

    this.memberApi.addresslist({}).then( (addresslist:[]) => {
      this.addresslist=addresslist;
    });
  }

  fav() {
    this.isfav = !this.isfav;
    this.memberApi.fav({ goods_id: this.params.id });
  }

  banneridx = 0;

  bannerChange(e) {
    console.log(e);
    this.banneridx = e;
  }

  showattrblock=false;
  toggleattrblock(){
    this.showattrblock=!this.showattrblock;
  }
  showaddressblock=false;
  toggleaddressblock(){
    this.showaddressblock=!this.showaddressblock;
  }

  jia() {
    if (this.buycount >= 99) {
      return;
    }
    this.buycount++;
  }
  jian() {

    if (this.buycount <= 1) {
      return;
    }
    this.buycount--;
  }

  goGoods(goods){
    
  }

  windowwidth=document.body.clientWidth;
  scrollTop=0;
  inscolling=false;
  scrollk(e){
    //console.log(e);
    //console.log(document.body.clientWidth,e.target.scrollTop);
    this.scrollTop=e.target.scrollTop;
    if(this.inscolling==true){
      return;
    }
    var scrollTop=e.target.scrollTop;
    var t=0;
    var i=1;
    for(i=1;i<=4;i++){
      var ele=null;
      ele = document.querySelector("#t" + i);
      if(ele!=null){
        if(scrollTop>ele.offsetTop){
         t=i;
        }
      }
    }
    if(t>0&&t!=this.t){
      this.t=t;
    }
  }

  t=1;

  goto(t){
    var ele = document.querySelector("#t" + t);
    ele.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(()=>{
      this.inscolling=false;
    },1000);
  } 

}
