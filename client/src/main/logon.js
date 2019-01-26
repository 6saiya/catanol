var LogGame = (function (_super) {
    function LogGame() {
        LogGame.super(this);
        this.getChildByName('login').visible = true;
        this.getChildByName('logup').visible = false;
        this.getChildByName('login').getChildByName('login').on(Laya.Event.CLICK, this, this.login);
        this.getChildByName('login').getChildByName('logup').on(Laya.Event.CLICK, this, this.logup);
        this.getChildByName('login').getChildByName('userName').on(Laya.Event.CLICK, this, function () {
            this.getChildByName('login').getChildByName('userName').test = '';
        });
        this.getChildByName('login').getChildByName('password').on(Laya.Event.CLICK, this, function () {
            this.getChildByName('login').getChildByName('password').test = '';
        });
    }
    Laya.class(LogGame, "LogGame", _super);

    var _proto = LogGame.prototype;


    //登陆按钮
    _proto.login = function () {
        user.userName = this.getChildByName('login').getChildByName('userName').text;
        user.passWord = this.getChildByName('login').getChildByName('password').text;
        user.status = 100;
        console.log(user)
        $(function () {
            $.ajax({
                url: gameUrl + "logon/login",
                type: "GET",
                data: {
                    username: user.userName,
                    password: user.passWord
                },
                dataType: "text",
                success: function (res) {
                    if (res != "密码错误！" && res != "密码错误！") {
                        user = eval('(' + res + ')');
                        console.log(res);
                        console.log(user);
                        LayaSample.home = new Home();
                        Laya.stage.addChild(LayaSample.home);
                        LayaSample.logGame.removeSelf();
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        });

    }

    //注册按钮
    _proto.logup = function () {
        this.getChildByName('logup').visible = true;
        this.getChildByName('login').visible = false;

        this.getChildByName('logup').getChildByName('logup').on(Laya.Event.CLICK, this, function () {
            if (this.getChildByName('logup').getChildByName('userName').text == '' || this.getChildByName('logup').getChildByName('userName').text == '请输入账号' ||
                this.getChildByName('logup').getChildByName('password').text == '' || this.getChildByName('logup').getChildByName('password').text == '请输入密码') {
                console.log('logup error');
            } else {
                user.userName = this.getChildByName('logup').getChildByName('userName').text;
                user.passWord = this.getChildByName('logup').getChildByName('password').text;
                user.status = 101;
                console.log(user);
                $(function () {
                    $.ajax({
                        url: gameUrl + "logon/logup",
                        type: "GET",
                        data: {
                            username: user.userName,
                            password: user.passWord
                        },
                        success: function (res) {
                            console.log(res);
                            if (res == "注册成功") {
                                LayaSample.choiceServer = new ChoiceSerchoiceServer();
                                Laya.stage.addChild(LayaSample.choiceServer);
                                LayaSample.logGame.removeSelf();
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                });
            }

        });
        this.getChildByName('logup').getChildByName('back').on(Laya.Event.CLICK, this, function () {
            this.getChildByName('logup').visible = false;
            this.getChildByName('login').visible = true;
        });
    }

    return LogGame;
})(ui.main.LogGameUI);