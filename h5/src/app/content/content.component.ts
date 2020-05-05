import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ContentApi } from 'src/providers/content.api';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ContentApi]
})
export class ContentComponent extends AppBase {
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public contentApi: ContentApi
  ) {
    super(router, activeRoute, instApi, memberApi);

  }

  info = null;
  onMyShow() {
    this.contentApi.get({ "keycode": this.params.keycode }).then((info: any) => {
      if (info != null) {
        info.content=this.util.HtmlDecode(info.content);
        this.info = info;
      }
      
    });
  }

}
