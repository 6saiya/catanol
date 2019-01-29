var mysql = require('mysql');
var $conf = require('../confige/db');
var $util = require('../util/util');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    login: function (msg, socket, next) {
        var userName = msg[0]
        var passWord = msg[1]
        console.log(msg)
   
        pool.getConnection(function (err, connection) {
            var sqlQuery = 'select * from user where userName = "' + userName + '"and passWord = "' + passWord + '"';
            connection.query(sqlQuery, function (err, result) {
                if (result.length) {
                    socket.emit('login',result[0])
                } else {
                    socket.to(socket.id).emit('login','账号密码错误')
                }
                connection.release();
            });
        });
    },
    logup: function () {
        
    },
}

