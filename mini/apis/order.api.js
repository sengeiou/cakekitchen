/*******使用方法，下面两句复制到page的js文件的头部

import { ApiConfig } from '../../apis/apiconfig';
import { InstApi } from '../../apis/model.api';

var orderApi=new OrderApi();
*******/
import { ApiConfig } from 'apiconfig';
export class OrderApi {


  create(json, callback, showLoading = true) {

    if (showLoading)
      ApiConfig.ShowLoading();

    var header = ApiConfig.GetHeader();
    console.log(header);
    console.log(json);
    wx.request({
      url: ApiConfig.GetApiUrl() + 'order/create',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
        if (callback != null) {
          callback(res.data);
        }
      },
      fail: function (res) {
        console.log(res);
        callback(false);
      },
      complete: function (res) {
        console.log(res);

        if (showLoading)
          ApiConfig.CloseLoading();
      }
    })
  }

  info(json, callback, showLoading = true) {

    if (showLoading)
      ApiConfig.ShowLoading();

    var header = ApiConfig.GetHeader();
    console.log(header);
    console.log(json);
    wx.request({
      url: ApiConfig.GetApiUrl() + 'order/info',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
        if (callback != null) {
          callback(res.data);
        }
      },
      fail: function (res) {
        console.log(res);
        callback(false);
      },
      complete: function (res) {
        console.log(res);

        if (showLoading)
          ApiConfig.CloseLoading();
      }
    })
  }

  list(json, callback, showLoading = true) {

    if (showLoading)
      ApiConfig.ShowLoading();

    var header = ApiConfig.GetHeader();
    console.log(header);
    console.log(json);
    wx.request({
      url: ApiConfig.GetApiUrl() + 'order/list',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
        if (callback != null) {
          callback(res.data);
        }
      },
      fail: function (res) {
        console.log(res);
        callback(false);
      },
      complete: function (res) {
        console.log(res);

        if (showLoading)
          ApiConfig.CloseLoading();
      }
    })
  }

  itemlist(json, callback, showLoading = true) {

    if (showLoading)
      ApiConfig.ShowLoading();

    var header = ApiConfig.GetHeader();
    console.log(header);
    console.log(json);
    wx.request({
      url: ApiConfig.GetApiUrl() + 'order/itemlist',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
        if (callback != null) {
          callback(res.data);
        }
      },
      fail: function (res) {
        console.log(res);
        callback(false);
      },
      complete: function (res) {
        console.log(res);

        if (showLoading)
          ApiConfig.CloseLoading();
      }
    })
  }
}
