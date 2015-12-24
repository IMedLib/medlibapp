/**
 * Created by zhangruofan on 2015/12/21.
 */
var router = require('koa-router')();

module.exports=function(){
    var userController = require('../controllers/user.js');
    router.get('/user',userController.get);
    router.get('/login',userController.login);
    router.get('/register',userController.register);

    var indexController = require('../controllers/index.js');
    router.get('/index',indexController.index);
    router.get('/',indexController.index);

    return router.middleware();
};