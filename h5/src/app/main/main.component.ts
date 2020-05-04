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

  selectedIndex = 0;

  indexbanner = [{ img: "642b89f33dd4e13c9189c5dfa295aa06_200504172239_163260411.webp" }];

  catlist = [];
  indexcat = [];

  onMyLoad() {
    this.instApi.indexbanner({}).then((list: []) => {
      this.indexbanner = list;
    });
    this.goodsApi.catlist({}).then((list: [{ icon, text, name }]) => {
      for (var i = 0; i < list.length; i++) {
        list[i].icon = this.uploadpath + "goodscategory/" + list[i].icon;
        list[i].text = list[i].name;
      }
      list.push({
        name: "", text: "全部",
        icon: this.uploadpath + "resource/d2bf5efc9dcaac99f941452f475ebac2_200504192555_62218611.webp"
      });
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

  }
}
