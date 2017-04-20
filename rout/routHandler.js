/**
 * Created by ximena on 2017/4/19.
 */
const  AccountMgr = require('./../account/AccountMgr');
const  cfg = require('./../cfg/netConfig');
const routHandler = {
    //处理post请求
    postHandler:(params,resp)=>{
        if(checkParams(params,resp)){
            let method = params.method;
            if(method == 'register'){
                registerByAccount(params,resp);
            }else if(method == 'login'){
                loginByAccount(params,resp);
            }
        }
    },
    //处理get请求
    getHandler:(params,res)=>{

    }
};


const checkParams = function (params,resp) {
    if(typeof params === 'object' && params.method){
        const routers = require('./../cfg/netConfig').postRouter;
        if(routers.filter(function (e) {
                return e == params.method;
            }).length){
           return true;
        }
    }
    send404(resp);
    return false;
};

//方法错误
const send404 = function (resp) {
    resp.send({code:cfg.errCode.method_not_exist,msg:'方法错误...'});
};

//参数错误
const sendParamsError = function (resp) {
    resp.send({code:cfg.errCode.params_err,msg:'参数错误...'});
};

const registerByAccount = function (params,resp) {
    if(params.account){
        AccountMgr.register(params.account,function (code) {
            resp.send(code);
        });
    }else{
        sendParamsError(resp);
    }
};

const  loginByAccount = function (params,resp) {
    if(params.account&&params.password){
        AccountMgr.login(params.account,params.password,function (code) {
            console.log(typeof code);
            resp.send(code);
        });
    }else{
        sendParamsError(resp);
    }
};

module.exports = routHandler;