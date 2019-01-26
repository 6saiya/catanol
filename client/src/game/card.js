var Card = (function () {
    function Card(card) {

        this.card = card
        this.init();
        // this.thismap.on(Laya.Event.CLICK, this, this.attack);
    }
    var _proto = Card.prototype;

    // 初始化
    _proto.init = function () {
        console.log('here')
    }
    // 刷新
    _proto.resit = function () {
        
    }
    // 显示
    _proto.show = function () {

    }
    // 点击事件
    _proto.attack = function () {

    }
    return Card;
})();