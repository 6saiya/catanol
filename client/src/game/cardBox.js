var CardBox = (function (_s) {
    function CardBox() {
        CardBox.__super.call(this);
        this.name = 'cardbox'
        this.x = 1100
        this.init()
        // this.thismap.on(Laya.Event.CLICK, this, this.attack);
    }
    Laya.class(CardBox, 'CardBox', _s)
    var _proto = CardBox.prototype;

    // 初始化
    _proto.init = function () {
        this.loadImage("country/country6_min.png", 0, 0);
    }
    // 刷新
    _proto.refresh = function () {
        console.log('imhere')

    }
    // 显示
    _proto.show = function () {

    }
    // 点击事件
    _proto.attack = function () {

    }
    return CardBox;
})(Laya.Box);
