var Home = (function (_super) {
    function Home() {
        Home.super(this);
        this.init();
        this.getChildByName('match').on(Laya.Event.CLICK, this, this.match);
        // this.getChildByName('btn_qiandao').on(Laya.Event.CLICK, this, this.btn_qiandao);
        // this.getChildByName('btn_money').on(Laya.Event.CLICK, this, this.btn_money);
    }
    Laya.class(Home, "Home", _super);

    var _proto = Home.prototype;
    //初始化
    _proto.init = function () {
        this.getChildByName('nickname').text = user.nickname;
        this.getChildByName('money').text    = user.money;
        this.getChildByName('head').index    = user.head
    }

    //PVP按钮
    _proto.match = function () {
        LayaSample.Match = new Match();
        Laya.stage.addChild(LayaSample.Match);
    }

    //签到按钮
    _proto.btn_qiandao = function () {
        if (LayaSample.qiandaoPage) {
            LayaSample.qiandaoPage.show();
        } else {
            LayaSample.qiandaoPage = new QiandaoPage();
            Laya.stage.addChild(LayaSample.qiandaoPage);
        }
    }

    //rank按钮
    _proto.btn_rank = function () {
        if (LayaSample.rankPage) {
            LayaSample.rankPage.show();
        } else {
            LayaSample.rankPage = new RankPage();
            Laya.stage.addChild(LayaSample.rankPage);
        }
    }

    //充值按钮
    _proto.btn_money = function () {
        if (LayaSample.moneyPage) {
            LayaSample.moneyPage.show();
        } else {
            LayaSample.moneyPage = new MoneyPage();
            Laya.stage.addChild(LayaSample.moneyPage);
        }
    }

    //商店按钮
    _proto.btn_shop = function () {
        if (LayaSample.shopPage) {
            LayaSample.shopPage.show(function () {});
        } else {
            LayaSample.shopPage = new ShopPage();
            Laya.stage.addChild(LayaSample.shopPage);
        }
    }

    return Home;
})(ui.main.homeUI);