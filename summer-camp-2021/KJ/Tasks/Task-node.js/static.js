'use strict'
/*const http = require('http');
const fs = require('fs');
const path = require('path');
const common = require('./common');

http.createServer(
    function(req, res) {
        let pathname = req.url;
        let extname = path.extname(pathname);
        let mime = common.getMime(extname);
        fs.readFile('./catchme' + pathname, function(err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': '' + mime + ';charset=utf-8' });
                res.end("404 页面不存在");
            } else {
                res.writeHead(200, { 'Content-Type': '' + mime + ';charset=utf-8' });
                res.end(data);
            }
        });
    }
).listen(3002);
console.log("Listening...");*/

//导入所依赖的库
const http = require("http");
const url = require("url");
const path = require("path");
const mime = require("mime");
const fs = require("fs");
const urlencode = require('urlencode');

//服务器框架
http.createServer(function(req, res) {
    //获取路径名
    var pathname = url.parse(req.url).pathname;
    //URL解码，防止乱码
    pathname = urlencode.decode(pathname, 'utf-8');
    //排错
    if (pathname == "/favicon.ico") return;
    //获取根路径
    var finalpath = __dirname + pathname;
    //如果文件存在：
    fs.exists(finalpath, function(exists) {
        if (exists) {
            //如果是文件夹
            if (fs.statSync(finalpath).isDirectory()) {
                //获取文件夹的文件结构
                fs.readdir(finalpath, function(err, files) {
                    //排错
                    if (err) {
                        res.writeHead(200, { "Content-Type": 'text/plain' });
                        res.end("<h1>404 page cannot be found</h1>");
                    }
                    //将文件结构写入页面
                    else {
                        var html = "<head><meta charset='utf-8'></head>";
                        var files = fs.readdirSync(finalpath);
                        //创建超链接打开文件
                        for (var i in files) {
                            var filename = files[i];
                            html += "<div><p>|-<a href='http://127.0.0.1:9999" +
                                pathname + '/' + filename + "'>" + filename + "</a></p></div>";
                        }
                        res.writeHead(200, { 'content-type': 'text/html' });
                        res.end(html);
                    }
                })
            }
            //如果是文件
            else if (fs.statSync(finalpath).isFile()) {
                //打开文件
                fs.readFile(finalpath, function(err, data) {
                    if (err) res.end("cannot read file!");
                    else {
                        res.writeHead(200, { "Content-Type": mime.getType(path.basename) });
                        res.end(data);
                    }
                })
            } else {
                res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                res.end("<h1>404 page cannot be found!</h1>");
            }
        }
    })
}).listen(9999); //设置监听端口
console.log("Listening...");