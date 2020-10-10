//项目的请求根路径
var userURL = 'http://ajax.frontend.itheima.net';

//每次发送ajax请求前触发
//控制ajax请求中 的参数
$.ajaxPrefilter(function (options) {
    options.url = userURL + options.url;
    //获取有权限得 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    // 权限控制，登录之后才能进去主页面
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})