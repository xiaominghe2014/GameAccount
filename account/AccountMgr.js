/**
 * Created by ximena on 2017/4/19.
 */
//const mysql = require('mysql');
//const cfg = require('./netConfig');
//const connection = mysql.createConnection(cfg.usrDB);
const db = require('./../db/db');
const usrDB = require('./../cfg/netConfig').usrDB;
const AccountMgr = {
    register:function (account,cb) {
        // connection.connect(function (err) {
        //     if(err){
        //         cb(cfg.errCode.db_connect_err);
        //         console.log('数据库连接错误...',err);
        //         return;
        //     }
        //     console.log('数据库连接成功');
        //     connection.query('select * from table where name');
        // });
        db.init(usrDB);
        db.is_account_exist(account,function (code) {
            if(code===true){
                cb('账号已存在...');
                return 0;
            }else {
                db.create_account(account,account,function (code) {
                    cb(code?'创建账号成功...':'创建账号失败...');
                })
            }
        });

    },
    login:function (account,password,cb) {
        db.init(usrDB);
        db.get_account_info(account,password,function (usr) {
            if(usr!==null){
                cb({code:200,data:usr});
            }else {
                cb({code:500,data:null});
            }
        });
    }
};

module.exports = AccountMgr;