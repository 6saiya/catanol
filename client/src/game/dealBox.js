var DealBox = (function () {
    function DealBox(DealBox) {
        this.DealBox = DealBox
        this.data = {
            'player': {
                head: 0,
                nickName: ''
            },
            'it': [0, 0, 0, 0, 0],
            'me': [0, 0, 0, 0, 0]
        }
        this.nowOperation = 'no' // 不能操作 no 可以发送请求 canPost 需要回应 respond
        this.init();
    }
    var _proto = DealBox.prototype;

    // 初始化
    _proto.init = function () {
        let it = this.DealBox.getChildByName('it')
        let me = this.DealBox.getChildByName('me')
        for (let i = 0; i < 5; i++) {
            it.getChildByName('up' + i).on(Laya.Event.CLICK, this, this.attack, ['up', i, 'it']);
            it.getChildByName('down' + i).on(Laya.Event.CLICK, this, this.attack, ['down', i, 'it']);
            me.getChildByName('up' + i).on(Laya.Event.CLICK, this, this.attack, ['up', i, 'me']);
            me.getChildByName('down' + i).on(Laya.Event.CLICK, this, this.attack, ['down', i, 'me']);
        }
        me.getChildByName('head').index = user.head
        me.getChildByName('nickName').text = user.nickName
        this.DealBox.getChildByName('quit').on(Laya.Event.CLICK, this, function () {
            this.DealBox.visible = false
        });
        this.DealBox.getChildByName('sure').on(Laya.Event.CLICK, this, this.sendDeal);
        this.DealBox.getChildByName('agree').on(Laya.Event.CLICK, this, this.sendAgree);
        this.DealBox.getChildByName('disagree').on(Laya.Event.CLICK, this, this.disagree);
        this.resit()
        this.DealBox.visible = false
    }
    // 刷新
    _proto.resit = function () {
        let it = this.DealBox.getChildByName('it')
        let me = this.DealBox.getChildByName('me')
        for (let i = 0; i < 5; i++) {
            it.getChildByName('item' + i * 2).visible = (parseInt(this.data.it[i] / 10) > 0)
            it.getChildByName('item' + i * 2).index = parseInt(this.data.it[i] / 10)
            it.getChildByName('item' + (i * 2 + 1)).index = this.data.it[i] % 10
            me.getChildByName('item' + i * 2).visible = (parseInt(this.data.me[i] / 10) > 0)
            me.getChildByName('item' + i * 2).index = parseInt(this.data.me[i] / 10)
            me.getChildByName('item' + (i * 2 + 1)).index = this.data.me[i] % 10
            it.getChildByName('up' + i).visible = true
            it.getChildByName('down' + i).visible = true
            me.getChildByName('up' + i).visible = true
            me.getChildByName('down' + i).visible = true
        }
        it.getChildByName('head').index = this.data.player.head
        it.getChildByName('nickName').text = this.data.player.nickName
        if (this.nowOperation == 'respond') {
            this.DealBox.getChildByName('agree').visible = true
            this.DealBox.getChildByName('disagree').visible = true
            this.DealBox.getChildByName('sure').visible = false
            this.DealBox.getChildByName('quit').visible = false
        } else {
            this.DealBox.getChildByName('agree').visible = false
            this.DealBox.getChildByName('disagree').visible = false
            this.DealBox.getChildByName('sure').visible = true
            this.DealBox.getChildByName('quit').visible = true
        }
    }
    // 交易窗数值变化
    _proto.attack = function (mode, i, player) {
        let v = (player == 'it' ? this.data.it[i] : this.data.me[i])
        // 99 和 0 的范围不对。再细化 
        if (mode == 'up' && v < 99) {
            if (player == 'it') {
                this.data.it[i]++
            } else {
                this.data.me[i]++
            }
        }
        if (mode == 'down' && v > 0) {
            if (player == 'it') {
                this.data.it[i]--
            } else {
                this.data.me[i]--
            }
        }
        this.resit()
    }
    // 发送交易请求
    _proto.sendDeal = function () {
        console.log('sendDeal');
        socket.send({
            title: 'postDeal',
            poster: user.nickName,
            arm: this.data.player.nickName,
            use: this.data.me,
            want: this.data.it
        })
        this.DealBox.visible = false
    }
    // 接到请求
    socket.on('getDeal', function (msg) {
        console.log(msg)
        if (msg.arm == playerData[LayaSample.Game.mysite].nickName) {
            LayaSample.Game.dealBox.DealBox.visible = true
            LayaSample.Game.dealBox.nowOperation = 'respond'
            LayaSample.Game.dealBox.data.player.nickName = msg.poster
            LayaSample.Game.dealBox.data.it = msg.use
            LayaSample.Game.dealBox.data.me = msg.want
            for (let i = 0; i < 4; i++) {
                if (playerData[i].nickName == msg.poster) {
                    LayaSample.Game.dealBox.data.player.head = playerData[i].head
                }
            }
            LayaSample.Game.dealBox.resit()
        }
    })
    // 同意交易请求
    _proto.sendAgree = function () {
        if (this.nowOperation == 'respond') {
            socket.send({
                title: 'respond',
                respond: 'agree',
                poster: user.nickName,
                arm: this.data.player.nickName,
                use: this.data.me,
                want: this.data.it
            })
            this.DealBox.visible = false
            this.nowOperation = 'no'
        }
    }
    // 不同意交易请求
    _proto.disagree = function () {
        if (this.nowOperation == 'respond') {
            console.log('disagree');
            socket.send({
                title: 'respond',
                respond: 'disagree'
            })
            this.DealBox.visible = false
            this.nowOperation = 'no'
        }

    }



    // 收到交易请求
    _proto.getDeal = function (data) {
        /**
         * test
         * 
        this.getDeal({'player': {head: 0,nickName: 'lzy'},'it': [0, 1, 0, 0, 0],'me': [0, 0, 1, 0, 0]})
         */
        console.log('getDeal');
        this.DealBox.visible = true
        let it = this.DealBox.getChildByName('it')
        let me = this.DealBox.getChildByName('me')
        for (let i = 0; i < 5; i++) {
            it.getChildByName('item' + i * 2).index = parseInt(data.it[i] / 10)
            it.getChildByName('item' + (i * 2 + 1)).index = data.it[i] % 10
            me.getChildByName('item' + i * 2).index = parseInt(data.me[i] / 10)
            me.getChildByName('item' + (i * 2 + 1)).index = data.me[i] % 10
            it.getChildByName('up' + i).visible = false
            it.getChildByName('down' + i).visible = false
            me.getChildByName('up' + i).visible = false
            me.getChildByName('down' + i).visible = false
        }
        it.getChildByName('head').index = data.player.head
        it.getChildByName('nickName').index = data.player.nickName
        this.DealBox.getChildByName('agree').visible = true
        this.DealBox.getChildByName('disagree').visible = true
        this.DealBox.getChildByName('sure').visible = false
        this.DealBox.getChildByName('quit').visible = false
    }

    return DealBox;
})();