var Home = (function (_super) {
    function Home() {
        Home.super(this);
        this.init();
        this.show();
        this.getChildByName('btn_pvp').on(Laya.Event.CLICK, this, this.btn_pvp);
        this.getChildByName('btn_qiandao').on(Laya.Event.CLICK, this, this.btn_qiandao);
        this.getChildByName('btn_money').on(Laya.Event.CLICK, this, this.btn_money);
        this.getChildByName('head').on(Laya.Event.CLICK, this, this.head);
        // Laya.timer.loop(1000,this,this.bgChaese);
    }
    Laya.class(Home, "Home", _super);

    var _proto = Home.prototype;
    //初始化
    _proto.init = function () {
        this.getChildByName('nickName').text  = user.nickName;
        this.getChildByName('nickName').color = '#ffffff';
        this.getChildByName('money').text     = user.money;
        this.getChildByName('tili').text      = user.tili;
        if (user.tongbi > 10000) {
            if (user.tongbi > 100000000) {
                this.getChildByName('tongB').text = Math.floor(user.tongbi / 10000000) + '亿';
            } else {
                this.getChildByName('tongB').text = Math.floor(user.tongbi / 10000) + '万';
            }
        } else {
            this.getChildByName('tongB').text = user.tongbi;
        }
        this.getChildByName('head').index         = user.head % 16;
        this.getChildByName('chanceHead').visible = false;
    }

    //bg变化
    _proto.bgChaese = function () {
        var                 myDate  = new Date();
        var                 bgX     = myDate.getMinutes();  //获取当前分钟数(0-59)
        var                 bgY     = myDate.getSeconds();  //获取当前秒数(0-59)
        this.getChildByName('bg').x = -768 * bgX / 60;
        this.getChildByName('bg').y = -1328 * bgY / 60;
    }

    //显示
    _proto.show = function () {
        this.visible = true;
    }
    //隐藏
    _proto.hide = function () {
        this.visible = false;
    }

    //PVP按钮
    _proto.btn_pvp = function () {
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

    //选择头像
    _proto.head = function () {
        // console.log(this.getChildByName('chanceHead'));
        var                 headArr               = [10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
        this.getChildByName('chanceHead').visible = true;
                            this.headpage         = 0;
                            this.newHead          = user.head;
        for (var i = 0; i < 5; i++) {
            this.getChildByName('chanceHead').getChildByName('item' + i).getChildByName('border').visible = false;
            this.getChildByName('chanceHead').getChildByName('item' + i).getChildByName('head').skin      = "headPortrait/" + headArr[this.headpage * 5 + (i - 0)] + ".png";
        }
        this.getChildByName('chanceHead').getChildByName('btn_right').on(Laya.Event.CLICK, this, function () {
            this.headpage++;
            if (this.headpage > 5) this.headpage = 0;
            for (var i = 0; i < 5; i++) {
                this.getChildByName('chanceHead').getChildByName('item' + i).getChildByName('border').visible = false;
                this.getChildByName('chanceHead').getChildByName('item' + i).getChildByName('head').skin      = "headPortrait/" + headArr[this.headpage * 5 + (i - 0)] + ".png";
            }
        });
        this.getChildByName('chanceHead').getChildByName('btn_left').on(Laya.Event.CLICK, this, function () {
            this.headpage--;
            if (this.headpage < 0) this.headpage = 5;
            for (var i = 0; i < 5; i++) {
                this.getChildByName('chanceHead').getChildByName('item' + i).getChildByName('border').visible = false;
                this.getChildByName('chanceHead').getChildByName('item' + i).getChildByName('head').skin      = "headPortrait/" + headArr[this.headpage * 5 + (i - 0)] + ".png";
            }
        });
        for (var i = 0; i < 5; i++) {
            this.getChildByName('chanceHead').getChildByName('item' + i).on(Laya.Event.CLICK, this, this.chanceHead, [i])
        }
        this.getChildByName('chanceHead').getChildByName('btn_yes').on(Laya.Event.CLICK, this, this.sureHead);
    }

    _proto.sureHead = function () {
        //差一个提交服务器
    }

    _proto.chanceHead = function (num) {
        var headArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
        for (var i = 0; i < 5; i++) {
            this.getChildByName('chanceHead').getChildByName('item' + i).getChildByName('border').visible = false;
            this.getChildByName('chanceHead').getChildByName('item' + i).getChildByName('head').skin      = "headPortrait/" + headArr[this.headpage * 5 + (i - 0)] + ".png";
        }
        this.getChildByName('chanceHead').getChildByName('item' + num).getChildByName('border').visible = true;
                            this.newHead                                                                = headArr[this.headpage * 5 + num];
    }


    return Home;
})(ui.main.HomeUI);