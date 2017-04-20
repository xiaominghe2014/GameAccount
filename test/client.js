const http = require('http');
const querystring = require('querystring');
const cfg = require('./../cfg/netConfig');
const client ={
    post: ()=> {
        let postData = querystring.stringify(
            {
                account:"register_2",
                password:"Polo"
            }
        );
        let option ={
            hostname:cfg.serverGate.host,
            port:cfg.serverGate.port,
            path:'/register',
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            },
        };

        let req = http.request(option,(res)=>{
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`主体: ${chunk}`);
            });
            res.on('end', () => {
                console.log('响应中已无数据。');
            });

        });

        req.on('error', (e) => {
            console.log(`请求遇到问题: ${e.message}`);
        });

        // 写入数据到请求主体
        req.write(postData);
        req.end();
    }
};

module.exports = client;