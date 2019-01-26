let mat = [
    [
        1, 0, 0, 0, 0, //R
        0, 0, 0, 0, 0, //G
        0, 0, 0, 0, 0, //B
        0, 0, 0, 1, 0, //A
    ],
    [
        0, 0, 0, 0, 0, //R
        0, 1, 0, 0, 0, //G
        0, 0, 0, 0, 0, //B
        0, 0, 0, 1, 0, //A
    ],
    [
        0, 0, 0, 0, 0, //R
        0, 0, 0, 0, 0, //G
        0, 0, 1, 0, 0, //B
        0, 0, 0, 1, 0, //A
    ],
    [
        1, 0, 0, 0, 0, //R
        0, 0, 0, 0, 0, //G
        0, 0, 0.5, 0, 0, //B
        0, 0, 0, 1, 0, //A
    ],
]
//创建一个颜色滤镜对象
let Filter = [new Laya.ColorFilter(mat[0]), new Laya.ColorFilter(mat[1]), new Laya.ColorFilter(mat[2]), new Laya.ColorFilter(mat[3])]
let roadBox = {
    init: function (road,site) {
        for (let i = 0; i < 36; i++) {
            road.getChildByName('a' + i).visible = (mapData.road[i].type != 'none')
            road.getChildByName('a' + i).on(Laya.Event.CLICK, this, function (s,site) {
                console.log('road'+i)
                // 没写完 先意思意思，判定下是不是空地可以建造
                if (LayaSample.Game.want == 'road'&&playerData[5][0]==site) {
                    playerData[site].card[0]--
                    playerData[site].card[4]--
                    playerData[site].road.push(s)
                    // 判断下是不是路最长，很复杂!!!，先不写
                    if (playerData[site].road.length > 5)
                        playerData[site].point++
                    socket.send({
                        title: 'operation',
                        data: playerData
                    })
                }
            }, [i,site])
            road.getChildByName('item' + i).visible = (mapData.road[i + 36].type != 'none')
            road.getChildByName('item' + i).on(Laya.Event.CLICK, road, function (s,site) {
                console.log('road'+ (i-0+36))
                // 没写完 先意思意思，判定下是不是空地可以建造
                if (LayaSample.Game.want == 'road') {
                    playerData[site].card[0]--
                    playerData[site].card[4]--
                    playerData[site].road.push(s)
                    // 判断下是不是路最长，很复杂!!!，先不写
                    if (playerData[site].road.length > 5)
                        playerData[site].point++
                    socket.send({
                        title: 'operation',
                        data: playerData
                    })
                }
            }, [i,site])
            road.getChildByName('b' + i).visible = (mapData.road[i + 72].type != 'none')
            road.getChildByName('b' + i).on(Laya.Event.CLICK, road, function (s,site) {
                console.log('road'+ (i-0+72))
                // 没写完 先意思意思，判定下是不是空地可以建造
                if (LayaSample.Game.want == 'road') {
                    playerData[site].card[0]--
                    playerData[site].card[4]--
                    playerData[site].farm.push(s)
                    // 判断下是不是路最长，很复杂!!!，先不写
                    if (playerData[site].road.length > 5)
                        playerData[site].point++
                    socket.send({
                        title: 'operation',
                        data: playerData
                    })
                }
            }, [i,site])
        }
    },
    resit: function (road) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < playerData[i].road.length; j++) {
                mapData.road[playerData[i].road[j]].belong = i
            }            
        }
        for (let i = 0; i < 36; i++) {
            if (mapData.road[i].belong != -1) road.getChildByName('a' + i).filters = [Filter[mapData.road[i].belong]]
            if (mapData.road[i + 36].belong != -1) road.getChildByName('item' + i).filters = [Filter[mapData.road[i + 36].belong]]
            if (mapData.road[i + 72].belong != -1) road.getChildByName('b' + i).filters = [Filter[mapData.road[i + 72].belong]]
        }
    }
}

let cityBox = {
    init: function (city,site) {
        for (let i = 0; i < 72; i++) {
            city.getChildByName('item' + i).visible = (mapData.city[i].type != 'none')
            city.getChildByName('item' + i).on(Laya.Event.CLICK, this, function (s,site) {
                console.log('city' + s)
                // 没写完 先意思意思，要判定下是不是空的可以建造
                if (LayaSample.Game.want == 'farm' && playerData[site].card[0] > 1) {
                    playerData[site].card[0]--
                    playerData[site].card[1]--
                    playerData[site].card[3]--
                    playerData[site].card[4]--
                    playerData[site].farm.push(s)
                    playerData[site].point++
                    socket.send({
                        title: 'operation',
                        data: playerData
                    })
                }
                // 没写完 先意思意思 别忘了判断farm里面有没有
                if (LayaSample.Game.want == 'city' && playerData[site].card[0] > 1) {
                    playerData[site].card[1] -= 2
                    playerData[site].card[2] -= 3
                    // playerData[site].farm.删除(s)
                    playerData[site].city.push(s)
                    playerData[site].point++
                    socket.send({
                        title: 'operation',
                        data: playerData
                    })
                }
            }, [i,site])
        }
    },
    resit: function (city) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < playerData[i].farm.length; j++) {
                mapData.city[playerData[i].farm[j]].type = 'farm'
                mapData.city[playerData[i].farm[j]].belong = i
            }  
            for (let j = 0; j < playerData[i].city.length; j++) {
                mapData.city[playerData[i].city[j]].type = 'city'
                mapData.city[playerData[i].city[j]].belong = i
            }            
        }
        for (let i = 0; i < 72; i++) {
            if (mapData.city[i].type != 'none'){
                let a = mapData.city[i].type == 'farm'? 'country':mapData.city[i].type
                city.getChildByName('item' + i).skin = 'game/' + a + '.png'
            }
            if (mapData.city[i].belong != -1) city.getChildByName('item' + i).filters = [Filter[mapData.city[i].belong]]
        }
    }
}