$(function () {
    getUserInfo()

    // 退出
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // q清空本地存储内容
            localStorage.removeItem('token')
            // 跳转到首页
            location.href = '/login.html';
            layer.close(index);
        });
    })
})



// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            renderAvatar(res.data);
        }
    })
}
// 渲染用户头像和名称
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}