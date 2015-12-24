/**
 * Created by zhangruofan on 2015/12/23.
 */
var $=require('../lib/jquery.min.js');
var cookie=require('../lib/cookie.js');
$(document).ready(function () {
    var wait = 60, url = "http://121.41.92.56:8002/";
    $('form').submit(function () {
        var mobile = $('#mobile').val();
        var code = $('#code').val();
        if (!isMobile(mobile)) {
            $('#mobileErr').text('非法手机号码！').fadeOut(5000);
            return false;
        }
        if (code.length != 6) {
            $('#codeErr').text('验证码错误！').fadeOut(5000);
        }
        $.getJSON(url + 'User/Put/Login/', {
            mobile: mobile,
            verifycode: code
        }).done(function (data) {
            if (data.code !== 0) {
                $('#loginErr').text(data.msg === "" ? "登录失败，请重新尝试！" : data.msg)
                    .fadeOut(5000);
                return false;
            }
            if (data.token !== '' && data.key !== '') {
                var end = (new Date()).getDate() + 7;
                cookie.setCookie('key', data.key, end);
                cookie.setCookie('token', data.token, end);
                window.location.href = '/';
            }
        }).fail(function () {
            $('#loginErr').text("请求超时！").fadeOut(5000);
        });
        return false;
    });
    $('#codeGet').on('click', function () {
        var mobile=$('#mobile').val();
        if (!isMobile(mobile)) {
            $('#mobileErr').text('非法手机号码！').fadeOut(5000);
            return false;
        }
        setTime($(this));
        getCode(mobile);
    });
    function isMobile(mobile){
        if(mobile.length === 11 && /^(((13)|(15)|(17)|(18))+\d{9})$/.test(mobile))
            return true;
        return false;
    }
    function getCode(mobile) {
        $.getJSON(url + '/Captcha/Add', {
            mobile:mobile
        }).done(function(data){
            if (data.code !== 0) {
                $('#codeErr').text(data.msg === "" ? "获取验证码失败，请重新尝试！" : data.msg)
                    .fadeOut(5000);
                return false;
            }
            $('#code').val(data.verifycode);
        }).fail(function () {
            $('#codeErr').text("请求超时！").fadeOut(5000);
        });
    }

    function setTime(object) {
        if (wait === 0) {
            object.removeAttr('disabled');
            object.text("点击获取验证码");
            wait = 60;
        } else {
            object.attr('disabled', true);
            object.text("重新发送(" + wait + ")");
            wait--;
            setTimeout(function () {
                setTime(object);
            }, 1000);
        }
    }
});