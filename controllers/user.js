/**
 * Created by zhangruofan on 2015/12/21.
 */
module.exports={
    get:function *(){
        yield this.render('user/index',{
            pageName:'test',
            array:[1,2,3,4,5]
        });
    },
    login:function *(){
        yield this.render('login');
    },
    register:function *(){
        yield this.render('register');
    }
};