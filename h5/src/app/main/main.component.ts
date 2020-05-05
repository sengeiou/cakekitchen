import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { GoodsApi } from 'src/providers/goods.api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [InstApi, MemberApi, GoodsApi]
})
export class MainComponent extends AppBase {
  static Instance: MainComponent = null;
  instinfo = null;
  toggle = false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public goodsApi: GoodsApi
  ) {
    super(router, activeRoute, instApi, memberApi);
    this.instinfo = {};
    this.instApi.info({ unicode: "talentSaaS" }).then((instinfo) => {
      this.instinfo = instinfo;
    });
    MainComponent.Instance = this;
  }

  selectedIndex = 1;

  indexbanner = [{ img: "642b89f33dd4e13c9189c5dfa295aa06_200504172239_163260411.webp" }];

  catlist = [];
  indexcat = [];

  curcat_id = 0;

  onMyLoad() {
    this.instApi.indexbanner({}).then((list: []) => {
      this.indexbanner = list;
    });
    this.goodsApi.catlist({}).then((list: [{ id, icon, text, name }]) => {
      for (var i = 0; i < list.length; i++) {
        list[i].icon = this.uploadpath + "goodscategory/" + list[i].icon;
        list[i].text = list[i].name;
      }
      list.push({
        id: -1,
        name: "", text: "全部",
        icon: this.uploadpath + "resource/d2bf5efc9dcaac99f941452f475ebac2_200504192555_62218611.webp"
      });
      this.curcat_id = list[0].id;
      this.catlist = list;

    });
    this.goodsApi.indexcat({}).then((indexcat: []) => {

      this.indexcat = indexcat;

    });
  }


  onMyShow() {
  }


  tabbarStyle = {
    height: "100vh"
  };
  tabBarTabOnPress(pressParam: any) {
    console.log('onPress Params: ', pressParam);
    this.selectedIndex = pressParam.index;
  }

  gotocat(e) {
    console.log(e);
    this.selectedIndex=1;
    if(e.data.id>0){
      this.selectcat(e.data.id);
    }
    
  }
  inscolling=false;
  selectcat(cat_id) {
    this.inscolling=true;
    this.curcat_id = cat_id;
    var ele = document.querySelector("#cat_" + cat_id);
    ele.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(()=>{
      this.inscolling=false;
    },1000);
  }
  scrollk(e) {
    if(this.inscolling==true){
      return;
    }
    var scrollTop=e.target.scrollTop;
    var scrollcat=0;
    for(var i=0;i<this.catlist.length;i++){
      var ele=null;
      ele = document.querySelector("#cat_" + this.catlist[i].id);
      if(ele!=null){
        if(scrollTop>ele.offsetTop){
         scrollcat=this.catlist[i].id;
        }
      }
    }
    if(scrollcat>0&&scrollcat!=this.curcat_id){
      this.curcat_id=scrollcat;
    }
  }
}
