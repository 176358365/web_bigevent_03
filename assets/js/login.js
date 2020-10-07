$(function () {
    // 登录注册页面切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })



    //表单验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 检验注册时两次密码是否相同
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次输入密码不一致！"
            }
        }
    })

    var layer = layui.layer;
    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#form_reg [name = username]').val(),
                password: $('#form_reg [name = password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功，请登录！');
                $('#link_login').click();
            }
        })
    })


    //监听登录表单提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单内容
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})