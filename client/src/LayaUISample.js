(function () {
    (function (LayaSample) {
        //初始化引擎
        Laya.init(1280, 720);
        Laya.Stat.show(0, 0);
        Laya.stage.scaleMode  = Laya.Stage.SCALE_NOSCALE;
        Laya.stage.alignH     = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV     = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.stage.scaleMode  = "showall";
        Laya.stage.screenMode = "horizontal";
        //设置stage颜色   
        Laya.stage.bgColor = "#ffffff";

        //加载资源
        Laya.loader.load("res/atlas/logon.atlas",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS)
        // test();

    })();

    function onLoaded() {
        LayaSample.logGame = new LogGame();
        Laya.stage.addChild(LayaSample.logGame);
        Laya.loader.load(["res/atlas/btn.atlas", "res/atlas/img.atlas", 
        "res/atlas/home.atlas", "res/atlas/game.atlas", "res/atlas/public.atlas"
        ], null, null, Laya.Loader.ATLAS);
    }

    function test() {
        Laya.loader.load(["res/atlas/btn.atlas", "res/atlas/img.atlas", 
        "res/atlas/home.atlas", "res/atlas/game.atlas", "res/atlas/public.atlas"
        ], Laya.Handler.create(this, function () {
            LayaSample.Game = new Game();
            Laya.stage.addChild(LayaSample.Game);
            // LayaSample.Match = new Match();
            // Laya.stage.addChild(LayaSample.Match);
        }), null, Laya.Loader.ATLAS)
    }
})(window.LayaSample || (window.LayaSample = {}));