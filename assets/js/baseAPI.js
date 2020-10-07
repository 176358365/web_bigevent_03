//项目的请求根路径
var userURL = 'http://ajax.frontend.itheima.net';

//每次发送ajax请求前触发
//控制ajax请求中 的参数
$.ajaxPrefilter(function (options) {
    options.url = userURL + options.url;
})