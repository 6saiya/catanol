var IO = require('socket.io')
var public = require('./public')
var game = require('./game')
// 房间用户名单
var roomInfo = [];
for (let i = 0; i < 3; i++) {
    // 0-3 playerMsg 4 map 5 [nowplayer]
    roomInfo.push([game.playerInit(), game.playerInit(), game.playerInit(), game.playerInit(), game.initMap(0), [0]])
}
module.exports = {
    socketOn: function (server) {
        // 创建socket服务
        var socketIO = IO(server);
        socketIO.on('connection', function (socket) {
            let user = '',
                head = -1,
                roomID = 0,
                site = 0,
                player = 0
            socket.on('join', function (msg) {
                console.log(msg);
                user = msg[0];
                head = msg[1];
                roomID = msg[2];
                site = msg[3]
                socket.join(roomID); // 加入房间
                // 通知房间内人员
                if (roomInfo[roomID][site].nickName == '') {
                    roomInfo[roomID][site].nickName = user
                    roomInfo[roomID][site].head = head
                } else {
                    console.log('join error')
                }
                let isStart = true
                for (let i = 0; i < 4; i++) {
                    if (roomInfo[roomID][i].nickName == '') {
                        isStart = false
                    }
                }
                if (isStart) {
                    socketIO.to(roomID).emit('startGame')
                    console.log('startGame')
                } else {
                    socketIO.emit('roomMsg', roomInfo)
                }
            });

            socket.on('leave', function () {
                socket.emit('disconnect');
            });

            socket.on('disconnect', function () {
                // 从房间名单中移除
                for (let i = 0; i < 4; i++) 
                    if (roomInfo[roomID][i].nickName == user) 
                        roomInfo[roomID][i] = game.playerInit
                socket.leave(roomID); // 退出房间
                console.log(user + '退出了' + roomID);
            });

            // 接收用户消息,发送相应的房间
            socket.on('message', function (msg) {
                console.log(msg.title)
                /**
                 * 匹配的时候的接口
                 */
                if (msg.title == 'getRoomMsg') {
                    socketIO.emit('roomMsg', roomInfo)
                }
                if (msg.title == 'getMyRoomMsg') {
                    socketIO.to(roomID).emit('myRoomMsg', roomInfo[roomID])
                }
                /**
                 * 游戏时的接口
                 */
                // 初始化地图
                if (msg.title == 'initMap') {
                    socketIO.to(roomID).emit('map', roomInfo[roomID][4])
                }
                // 回合结束和开始的逻辑
                if (msg.title == 'rountEnd') {
                    let role = game.role(0)
                    socketIO.to(roomID).emit('role', role)
                    game.distribut(role[0]+role[1],roomInfo[roomID])
                    let t = roomInfo[roomID][5][0]
                    roomInfo[roomID][5][0] = (t+1)%4 
                    socketIO.to(roomID).emit('myRoomMsg', roomInfo[roomID])
                }
                // 操作完后更新数据
                if (msg.title == 'operation') {
                    let sbpoint = 0,
                        winMsg = 'sb'
                    for (let i = 0; i < 4; i++) {
                        roomInfo[roomID][i] = msg.data[i]
                        sbpoint = msg.data[i].point > sbpoint ? msg.data[i].point : sbpoint
                        winMsg = msg.data[i].point > sbpoint ? msg.data[i].nickName : winMsg
                    }
                    if (sbpoint > 9) {
                        socketIO.to(roomID).emit('gameOver', winMsg)
                    } else {
                        socketIO.to(roomID).emit('myRoomMsg', roomInfo[roomID])
                    }
                }
                // 申请交易
                if (msg.title == 'postDeal') {
                    socketIO.to(roomID).emit('getDeal', msg)
                }
                // 回应交易
                if (msg.title == 'respond') {
                    if (msg.respond == 'agree') {
                        let poster = -1,
                            arm = -1
                        for (let i = 0; i < 4; i++) {
                            if (roomInfo[roomID][i].nickName == msg.poster) poster = i
                            if (roomInfo[roomID][i].nickName == msg.arm) arm = i
                        }
                        if ((poster > -1) && (arm > -1)) {
                            for (let i = 0; i < 6; i++) {
                                roomInfo[roomID][poster].card[i] += msg.use[i]
                                roomInfo[roomID][poster].card[i] -= msg.want[i]
                                roomInfo[roomID][arm].card[i] -= msg.want[i]
                                roomInfo[roomID][arm].card[i] += msg.use[i]
                            }
                        }else{
                            console.log(poster + '&' + arm)
                        }
                        // 应该写个请求成功
                        // socketIO.to(roomID).emit('myRoomMsg', 'dealed')
                        socketIO.to(roomID).emit('myRoomMsg', roomInfo[roomID])
                    } else {
                        // 应该写个请求失败
                        // socketIO.to(roomID).emit('myRoomMsg', 'nodeal')
                        socketIO.to(roomID).emit('myRoomMsg', roomInfo[roomID])
                    }
                }
            });

            // 登录相关接口
            socket.on('login', function (msg) {
                public.login(msg, socket)
            });

        });
    },

}