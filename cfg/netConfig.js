/**
 * Created ximena on 2017/4/19.
 */

const serverGate =  {
    host: "127.0.0.1",
    port: 8080
};

//用户数据库
const usrDb = {
    host:'120.27.94.221',
    port:'3306',
    user:'root',
    password:'123456',
    database:'ttt_accounts'
};

//定义路由
const postRouter = [
    'register',
    'login'
];

const errCode = {
    method_not_exist:0x01,//方法不存在
    params_err:0x02,//参数错误
    db_connect_err:0x03//数据库连接错误
};

module.exports = {
    serverGate : serverGate,
    usrDB : usrDb,
    postRouter : postRouter,
    errCode : errCode
};