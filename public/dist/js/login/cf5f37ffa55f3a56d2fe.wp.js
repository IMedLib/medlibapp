!function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){var r=o(1);$(document).ready(function(){function e(e){return 11===e.length&&/^(((13)|(15)|(17)|(18))+\d{9})$/.test(e)?!0:!1}function t(e){$.getJSON(i+"/Captcha/Add",{mobile:e}).done(function(e){return 0!==e.code?($("#codeErr").text(""===e.msg?"获取验证码失败，请重新尝试！":e.msg).fadeOut(5e3),!1):void $("#code").val(e.verifycode)}).fail(function(){$("#codeErr").text("请求超时！").fadeOut(5e3)})}function o(e){0===n?(e.removeAttr("disabled"),e.text("点击获取验证码"),n=60):(e.attr("disabled",!0),e.text("重新发送("+n+")"),n--,setTimeout(function(){o(e)},1e3))}var n=60,i="http://121.41.92.56:8002/";$("form").submit(function(){var t=$("#mobile").val(),o=$("#code").val();return e(t)?(6!=o.length&&$("#codeErr").text("验证码错误！").fadeOut(5e3),$.getJSON(i+"User/Put/Login/",{mobile:t,verifycode:o}).done(function(e){if(0!==e.code)return $("#loginErr").text(""===e.msg?"登录失败，请重新尝试！":e.msg).fadeOut(5e3),!1;if(""!==e.token&&""!==e.key){var t=(new Date).getDate()+7;r.setCookie("key",e.key,t),r.setCookie("token",e.token,t),window.location.href="/"}}).fail(function(){$("#loginErr").text("请求超时！").fadeOut(5e3)}),!1):($("#mobileErr").text("非法手机号码！").fadeOut(5e3),!1)}),$("#codeGet").on("click",function(){var r=$("#mobile").val();return e(r)?(o($(this)),void t(r)):($("#mobileErr").text("非法手机号码！").fadeOut(5e3),!1)})})},function(e,t){e.exports={setCookie:function(e,t,o,r,n,i){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var a="";if(o)switch(o.constructor){case Number:a=o===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+o;break;case String:a="; expires="+o;break;case Date:a="; expires="+o.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+a+(n?"; domain="+n:"")+(r?"; path="+r:"")+(i?"; secure":""),!0}}}]);