module.exports = {
    playerInit: function () {
        return {
            status: 'wite', //['wite','ready','playing','none']
            nickname: '',
            point: 0,
            resources: [0, 0, 0, 0, 0, 0],
            head: -1,
            road: [],
            village: [],
            city: [],
            card: []
        }
    },
    initMap: function (type) {
        let resourceStrArr = ['desert', 'mountain', 'brick', 'grass', 'farm', 'forest'],
            mapBGData = shuffle([0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]),
            roteBGData = shuffle([2, 3, 3, 4, 4, 5, 5, 6, 6, 0, 8, 8, 9, 9, 10, 10, 11, 11, 12])
        let indexOfDesert = mapBGData.indexOf(0),
            t = roteBGData.indexOf(0)
        // roteBGData[t] = roteBGData[indexOfDesert]
        // console.log(indexOfDesert)
        let mapbgdata = ['none', resourceStrArr[mapBGData[0]], resourceStrArr[mapBGData[1]], resourceStrArr[mapBGData[2]], 'none', resourceStrArr[mapBGData[3]], resourceStrArr[mapBGData[4]], resourceStrArr[mapBGData[5]], resourceStrArr[mapBGData[6]], 'none', resourceStrArr[mapBGData[7]], resourceStrArr[mapBGData[8]], resourceStrArr[mapBGData[9]], resourceStrArr[mapBGData[10]], resourceStrArr[mapBGData[11]], resourceStrArr[mapBGData[12]], resourceStrArr[mapBGData[13]], resourceStrArr[mapBGData[14]], resourceStrArr[mapBGData[15]], 'none', 'none', resourceStrArr[mapBGData[16]], resourceStrArr[mapBGData[17]], resourceStrArr[mapBGData[18]], 'none', ]
        mapPointData = [0, roteBGData[0], roteBGData[1], roteBGData[2], 0, roteBGData[3], roteBGData[4], roteBGData[5], roteBGData[6], 0, roteBGData[7], roteBGData[8], roteBGData[9], roteBGData[10], roteBGData[11], roteBGData[12], roteBGData[13], roteBGData[14], roteBGData[15], 0, 0, roteBGData[16], roteBGData[17], roteBGData[18], 0, ]
        return [mapbgdata, mapPointData]
    },
    role: function (type) {
        type = type || 0
        switch (type) {
            case 0:
                return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]
            case 1:
                return Math.floor(Math.random() * 12)
            default:
                break;
        }
    },
    distribut: function (rolePoint, roomInfo) {
        if (rolePoint == 7) return
        let mapIndex = []
        for (let i = 0; i < roomInfo[4][1].length; i++) {
            if (roomInfo[4][1][i] == rolePoint) mapIndex.push(i)
        }
        let cityArr = [
            [0, 6, 7, 12, 13, 18],
            [1, 7, 8, 13, 14, 19],
            [2, 8, 9, 14, 15, 20],
            [3, 9, 10, 15, 16, 21],
            [4, 10, 11, 16, 17, 22],

            [13, 18, 19, 24, 25, 31],
            [14, 19, 20, 25, 26, 32],
            [15, 20, 21, 26, 27, 33],
            [16, 21, 22, 27, 28, 34],
            [17, 22, 23, 28, 29, 35],

            [24, 30, 31, 36, 37, 42],
            [25, 31, 32, 37, 38, 43],
            [26, 32, 33, 38, 39, 44],
            [27, 33, 34, 39, 40, 45],
            [28, 34, 35, 40, 41, 46],

            [37, 42, 43, 48, 49, 55],
            [38, 43, 44, 49, 50, 56],
            [39, 44, 45, 50, 51, 57],
            [40, 45, 46, 51, 52, 58],
            [41, 46, 47, 52, 53, 59],

            [48, 54, 55, 60, 61, 66],
            [49, 55, 56, 61, 62, 67],
            [50, 56, 57, 62, 63, 68],
            [51, 57, 58, 63, 64, 69],
            [52, 58, 59, 64, 65, 70]
        ]
        for (let i = 0; i < mapIndex.length; i++) {
            for (let j = 0; j < cityArr[mapIndex[i]].length; j++) {
                for (let k = 0; k < 4; k++) {
                    if (roomInfo[k].farm.length)
                        for (let l = 0; l < roomInfo[k].farm.length; l++) {
                            let isget = 0
                            if (roomInfo[k].farm[l] == cityArr[mapIndex[i]][j]) isget = 1
                            if (roomInfo[k].city[l] == cityArr[mapIndex[i]][j]) isget = 2
                            if (isget > 0) {
                                let s = ['brick', 'farm', 'mountain', 'grass', 'forest'],
                                    a = s.indexOf(roomInfo[4][0][mapIndex[i]])
                                roomInfo[k].card[a] += isget
                                console.log(`玩家${k}获得${isget}个${roomInfo[4][0][mapIndex[i]]}`)
                            }
                        }
                }
            }
        }
    }
}

function shuffle(a) {
    let len = a.length;
    for (let i = 0; i < len; i++) {
        let end = len - 1;
        let index = (Math.random() * (end + 1)) >> 0;
        let t = a[end];
        a[end] = a[index];
        a[index] = t;
    }
    return a;
};