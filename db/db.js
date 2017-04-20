/**
 * Created by ximena on 2017/4/19.
 */

"use strict";

const mysql = require("mysql");
//const crypto = require('crypto');
const format = require('string-format');
let pool = null;

function nop(a,b,c,d,e,f,g){

}

function query(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

exports.init = function(config){
    pool = mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port,
    });
};

exports.is_account_exist = function(account,callback){
    callback = callback == null? nop:callback;
    if(account == null){
        callback(false);
        return;
    }
    let sql = 'SELECT * FROM t_accounts WHERE account = "' + account + '"';
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(false);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(true);
            }
            else{
                callback(false);
            }
        }
    });
};

exports.create_account = function(account,password,callback){
    callback = callback == null? nop:callback;
    if(account == null || password == null){
        callback(false);
        return;
    }

    //var psw = crypto.md5(password);
    let psw = password;
    let sql = 'INSERT INTO t_accounts(account,password) VALUES("' + account + '","' + psw + '")';
    query(sql, function(err, rows, fields) {
        if (err) {
            if(err.code == 'ER_DUP_ENTRY'){
                callback(false);
                return;
            }
            callback(false);
            throw err;
        }
        else{
            callback(true);
        }
    });
};

exports.get_account_info = function(account,password,callback){
    callback = callback == null? nop:callback;
    if(account == null){
        callback(null);
        return;
    }

    let sql = "SELECT * FROM t_accounts WHERE account = '{0}' AND password = '{1}'";
    sql = format(sql,account,password);
    console.log(sql);
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }

        if(rows.length === 0){
            callback(null);
            return;
        }
        callback(rows[0]);
    });
};


exports.query = query;