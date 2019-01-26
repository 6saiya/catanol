var Match = (function (_super) {
    function Match() {
        Match.super(this);
        this.choice = 0;
        this.site = 0
        this.init();
    }
    Laya.class(Match, "Match", _super);

    var _proto = Match.prototype;

    //初始化
    _proto.init = function () {
        for (let i = 0; i < 4; i++) {
            this.getChildByName('item0').getChildByName('player' + i).on(Laya.Event.CLICK, this, this.inroom, [0, i])
            this.getChildByName('item1').getChildByName('player' + i).on(Laya.Event.CLICK, this, this.inroom, [1, i])
        }
        socket.on('startGame', function (msg) {
            LayaSample.Game = new Game(this.myroom,LayaSample.Match.site)
            
            Laya.stage.addChild(LayaSample.Game)
            LayaSample.Match.removeSelf();
        })
        this.show()
    }

    // 显示玩家
    _proto.show = function () {
        socket.send({title:'getRoomMsg'});
        socket.on('roomMsg', function (msg) {
            console.log(msg)
            if (LayaSample.Match) {
                for (let i = 0; i < 4; i++) {
                    LayaSample.Match.getChildByName('item0').getChildByName('player' + i).getChildByName('head').visible = !(msg[0][i].head < 0)
                    LayaSample.Match.getChildByName('item0').getChildByName('player' + i).getChildByName('head').index = msg[0][i].head
                    LayaSample.Match.getChildByName('item1').getChildByName('player' + i).getChildByName('head').visible = !(msg[1][i].head < 0)
                    LayaSample.Match.getChildByName('item1').getChildByName('player' + i).getChildByName('head').index = msg[1][i].head
                }
            }
        })
    }

    // 选择按钮
    _proto.inroom = function (room, site) {
        console.log(room + ' & ' + site)
        this.site = site
        this.myroom = room
        socket.emit('join', [user.nickName, user.head ,room, site])
    }


    return Match;
})(ui.main.MatchUI);