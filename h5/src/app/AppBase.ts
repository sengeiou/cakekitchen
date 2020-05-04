import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { InstApi } from '../providers/inst.api';
import { MemberApi } from '../providers/member.api';


export class AppBase implements OnInit {

    public right = "ABC";
    public needlogin = false;
    currentpage = "";
    platformname = "";
    isModal = false;

    isLoginPage = false;

    public static StaticMemberInfo = null;

    //public devicename="";

    public static devicename = "";
    public static Lang = null;
    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static Current: AppBase = null;
    public static myapp: AppComponent = null;
    public static UNICODE = "jdmarket";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public localpath: string = ApiConfig.getLocalPath();
    public uploadapi: string = ApiConfig.getFileUploadAPI();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static StaticInstInfo = null;

    public InstInfo = { name: "", tel: '', logo: '' };


    public options = null;
    public params: Params = null;


    public memberinfo = null;

    mySwiperOption = {
        zoom: {
            enabled: false
        }
    }

    position = ''
    bfscrolltop; // 获取软键盘唤起前浏览器滚动部分的高度



    public constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public instApi: InstApi,
        public memberApi: MemberApi,
    ) {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
        this.res = [];
        this.memberinfo = JSON.parse(window.localStorage.getItem("memberinfo"));
    }


    setStatusBar() {
        //  this.statusBar.styleLightContent();
        console.log('123123')
    }
    ngOnInit() {
        console.log('456456')
        this.bfscrolltop = document.body.scrollTop;
        ApiConfig.SetUnicode(AppBase.UNICODE);


        this.CheckPermission();
        this.getResources();
        this.getInstInfo();
        this.onMyLoad();
        this.setStatusBar();

        this.checktime();

    }
    CheckPermission() {
        
    }
    checktime() {
        if (this.isLoginPage == true) {
            let nowtime = (new Date()).getTime();
            let oldtime = window.localStorage.getItem("oldtime");

            if (nowtime > Number(oldtime)) {
                // var al = alert("长时间不操作，请重新登录！")
                // this.navigate('/login');
            }
        }


    }
    countrylist=[];
    humantype=[];
    civilstatuslist=[];
    genderlist=[];
    workstatuslist=[];
    getcountry(){
        
    }
    onMyLoad() {


    }

    lang: any = {};

    langcode = "ch";
    

    getInstInfo() {

        if (AppBase.StaticInstInfo == null) {
            this.instApi.info({}, false).then((instinfo: any) => {
                AppBase.StaticInstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log(instinfo, 'inst');
                this.instLoaded();
            });
        } else {

            this.InstInfo = AppBase.StaticInstInfo;
            this.instLoaded();
        }
        
    }

    instLoaded() {

    }

    getMemberInfo() {

    }
    getResources() {
        if (AppBase.Resources == null) {
            this.instApi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }

    ngAfterViewInit() {

        // if (Instance != null) {
        //     Instance.setModule(this.module, this.module2);
        // }
        if (this.memberinfo != null&&this.memberinfo.usertype!=undefined) {
            //alert(JSON.stringify(this.memberinfo));
            if (this.right.indexOf(this.memberinfo.usertype) < 0) {
                this.navigate("404");
                return;
            }
        }

        this.onMyShow();
    }

    onMyShow() {

    }

    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}) {
        this.router.navigate([pagename], { queryParams: param });
    }
    back() {
        window.history.back();
    }

    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }

    tel(tel) {
        window.location.href = "tel:" + tel;
    }
    logout() {
        this.navigate("/login")
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("token");
    }



    showAlert(content, title = "提示") {


    }

    changedate(page) {
        console.log(page)
        if (page < 1 || page > this.pages) return;
        if(page==2){
            var newpageList = [];
            for (var i = (page - 2); i < ((page + 3) > this.pages ? this.pages : (page + 3)); i++) {
                newpageList.push(i + 1);
            }
            this.pageList = newpageList;
        }
        if (page > 2) {
            var newpageList = [];
            for (var i = (page - 3); i < ((page + 2) > this.pages ? this.pages : (page + 2)); i++) {
                newpageList.push(i + 1);
            }
            this.pageList = newpageList;
        }
        this.selPage = page;
        this.setData();
        this.isActivePage(page);
    }
    isActivePage(page) {
        return this.selPage == page;
    }

    Previous() {
        this.changedate(this.selPage - 1);
    }

    Next() {
        this.changedate(this.selPage + 1);
    }
    pageSize = 10;
    pages = null;
    newPage = null;
    selPage = null;
    data = null;
    pageList = [];
    setData = null;
    pagination(list, length) {

        this.pages = Math.ceil(length / this.pageSize);
        this.newPage = this.pages > 5 ? 5: this.pages;
        this.selPage = 1;

        this.setData = function () {
            this.data = list.slice(this.pageSize * (this.selPage - 1), this.pageSize * this.selPage);
        }
        this.data = list.slice(0, this.pageSize);


        for (var i = 0; i < this.newPage; i++) {
            this.pageList.push(i + 1);
        }
    }

    querySelector(str) {
        return document.querySelector(str);
    }

    checkMailFormat(email) {
        //^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (reg.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    

}
