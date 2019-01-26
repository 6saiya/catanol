/**
 * 游戏基本数据
 */

/**
 * 游戏进行时的数据
 */
// 有空加个资源：鱼，船路 = 木头+鱼 码头 = 木头+鱼+砖+羊毛
// spcard 士兵 *14，两条路*2， 大丰收 *2 ，掠夺*2
// status : ['wite','ready','playing','none']
// card : 砖，小麦，石头，羊毛，木头
playerData = [{
    status: 'ready',
    nickname: 'lzy',
    point: 0,
    resources: [1, 2, 3, 4, 5, 6],
    head: 5,
    road: [],
    village: [],
    city: [],
    card: []
}]

gameRount = 0