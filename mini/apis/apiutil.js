import { ApiConfig } from 'apiconfig.js';

export class ApiUtil {

  static HtmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(new RegExp("\"/alucard263096/cakekitchen/upload/", "gm"), "\"" + "https://cmsdev.app-link.org/alucard263096/cakekitchen/upload/");
    console.log(s);
    return s;
  }

  static Toast(toastCtrl, msg) {
    let toast = toastCtrl.create({
      message: msg
    });
    toast.present();
  }

  static FormatDateTime(date) {
    console.log("FormatDateTime" + date);
    var year = ApiUtil.ten2(date.getFullYear());
    var month = ApiUtil.ten2(date.getMonth() + 1);
    var datec = ApiUtil.ten2(date.getDate());
    var hour = ApiUtil.ten2(date.getHours());
    var minute = ApiUtil.ten2(date.getMinutes());
    var second = ApiUtil.ten2(date.getSeconds());

    var v = year + "-" + month + "-" + datec + " " + hour + ":" + minute + ":" + second;

    //console.log("FormatDateTime=" + v);
    return v;
  }

  static IsMobileNo(str) {

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return myreg.test(str);
  }
  static FormatPercent(val) {
    val = val * 100.0;
    return val.toFixed(2) + '%';
  }
  static FormatPrice(val) {
    val = val * 1.0;
    return val.toFixed(2);
  }
  static FormatNumber(val, digits) {
    val = val * 1.0;
    return val.toFixed(digits);
  }
  static FormatDate(val) {
    return val.substr(0, 10);
  }
  static Storage = null;
  
  static ten2(i) {
    i = parseInt(i);
    if (i > 9) {
      return i.toString();
    } else {
      return "0" + i.toString();
    }
  }

  static Rad(d) {
    return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
  }
  
  static GetDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = ApiUtil.Rad(lat1);
    var radLat2 = ApiUtil.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = ApiUtil.Rad(lng1) - ApiUtil.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // 地球半径，千米;
    s = Math.round(s * 10000) / 10000; //输出为公里
    s = Math.round(s * 1000) / 1; //单位修改为米,取整
    //s=s.toFixed(4);
    return s;
  }

  static GetMileTxt(mile) {
    console.log(mile);
    if (mile > 100000) {
      return "";
    }
    if (mile > 1000) {
      return + (mile / 1000.0).toFixed(0) + "km";
    } else if (mile < 100) {
      return "100米内";
    } else {
      return "" + (mile).toString() + "m";
    }
  }
}