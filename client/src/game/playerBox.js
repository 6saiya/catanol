var PlayerBox = (function () {
    function PlayerBox(box, playerIndex) {
        this.playerIndex = playerIndex
        this.box = box
        this.init();
        this.box.getChildByName('deal').on(Laya.Event.CLICK, this, this.deal);
    }
    var _proto = PlayerBox.prototype;

    // 初始化
    _proto.init = function () {
        this.resit()
    }
    // 刷新
    _proto.resit = function () {
        this.box.getChildByName('head').index = playerData[this.playerIndex].head
        this.box.getChildByName('nickName').text = playerData[this.playerIndex].nickName
        this.box.visible = (playerData[this.playerIndex].status != 'none')
        for (let i = 0; i < 6; i++) {
            this.box.getChildByName('item' + (i * 2 + 1)).index = playerData[this.playerIndex].card[i] % 10
            this.box.getChildByName('item' + i * 2).visible = (playerData[this.playerIndex].card[i] > 9)
            this.box._graphics._one[6] = gameRount == this.playerIndex ? 16 : 0
        }
        this.box.getChildByName('point').index = playerData[this.playerIndex].point
    }
    // 显示
    _proto.show = function () {

    }
    // 点击事件
    _proto.deal = function () {
        LayaSample.Game.dealBox.DealBox.visible = true
        LayaSample.Game.dealBox.data.player.head = playerData[this.playerIndex].head
        LayaSample.Game.dealBox.data.player.nickName = playerData[this.playerIndex].nickName
        LayaSample.Game.dealBox.resit()
        // console.log(this.playerIndex)
    }
    return PlayerBox;
})();