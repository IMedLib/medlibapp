/**
 * Created by zhangruofan on 2015/12/21.
 */
var app=require('koa')(),
    views=require('koa-views'),
    config = require('./configs/main.js'),
    router=require('./routers/index.js');

app.name= config.name;
app.keys= config.keys;
app.env= config.env;

if(config.debug){
    var debug = require('debug')('medlibapp');
}
app.use(views('views',{
    map:{
        html:'swig'
    }
}));
app.use(router());
app.use(require('koa-static')(__dirname+'/public'));
app.use(require('koa-favicon')(__dirname+'/public/dist/img/logo/favicon.ico'));

app.use(require('koa-gzip')());
module.exports=app;