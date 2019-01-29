var LogGame = (function (_super) {
    function LogGame() {
        LogGame.super(this);
        this.getChildByName('login').visible = true;
        this.getChildByName('logup').visible = false;
        this.getChildByName('login').getChildByName('login').on(Laya.Event.CLICK, this, this.login);
        this.getChildByName('login').getChildByName('logup').on(Laya.Event.CLICK, this, this.logup);
        this.getChildByName('login').getChildByName('username').on(Laya.Event.CLICK, this, function () {
            this.getChildByName('login').getChildByName('username').test = '';
        });
        this.getChildByName('login').getChildByName('password').on(Laya.Event.CLICK, this, function () {
            this.getChildByName('login').getChildByName('password').test = '';
        });
    }
    Laya.class(LogGame, "LogGame", _super);

    var _proto = LogGame.prototype;


    //登陆按钮
    _proto.login = function () {
        user.username = this.getChildByName('login').getChildByName('username').text;
        user.password = this.getChildByName('login').getChildByName('password').text;
        socket.emit('login', [user.username, user.password])
        socket.on('login',function (msg) {
            user = msg
            if (msg != '账号密码错误') {
                LayaSample.home = new Home();
                Laya.stage.addChild(LayaSample.home);
                LayaSample.logGame.removeSelf();
            }else{
                
            }
        })
    }

    //注册按钮
    _proto.logup = function () {

    }

    return LogGame;
})(ui.main.logonUI);