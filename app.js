/**
 * Created by ximena on 2017/4/20.
 */

const express = require('express');
const queryStr = require('querystring');
const app = express();

const cfg = require('./cfg/netConfig');

const routHandler = require('./rout/routHandler');



app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/',function (req,res) {
    res.send('hello...');
});

app.get('/accounts',function (req,res) {
    res.json({
        account:'10000',
        name:'user_10000'
    });
});

cfg.postRouter.forEach(function (rout) {
    app.post('/'+rout,function (req,res) {
        let content ='';
        req.on('data', (chunk)=> {
            console.log(chunk);
            content +=chunk;
        });

        req.on('end', ()=> {
            console.log(content);
            handlerPost(rout,content,res);
        });
    });
});


const server = app.listen(cfg.serverGate.port,function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log(`express server listen on ${host}:${port}`);
});

const handlerPost = (rout,content,resp) => {
    let params = queryStr.parse(content);
    params.method = rout;
    let routHandler = require('./rout/routHandler');
    routHandler.postHandler(params,resp);
};
