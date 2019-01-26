var Game = (function (_super) {
	function Game(myroom,mysite) {
		Game.super(this)
		this.myroom = myroom
		this.mysite = mysite
		this.playerArr = []
		this.roundtime = 60
		this.want = 'no' // no road farm city
		this.init()
	}
	Laya.class(Game, "Game", _super);

	var _proto = Game.prototype;
	//初始化
	_proto.init = function () {
		// 初始化地图
		socket.send({title:'initMap'})
		socket.on('map', function (msg) {
			let mapbgdata = msg[0],
				mapPointData = msg[1]
			for (let i = 0; i < mapData.resource.length; i++) {
				mapData.resource[i].type = mapbgdata[i]
				mapData.resource[i].point = mapPointData[i]
				LayaSample.Game.getChildByName('map').getChildByName('item' + i).visible = mapData.resource[i].type != 'none'
				LayaSample.Game.getChildByName('point').getChildByName('item' + i).visible = (mapData.resource[i].point > 0)
				LayaSample.Game.getChildByName('point').getChildByName('item' + i).text = mapData.resource[i].point
				if (mapData.resource[i].type != 'none')
					LayaSample.Game.getChildByName('map').getChildByName('item' + i).skin = 'game/' + mapData.resource[i].type + '.png'
			}
		})
		roadBox.init(this.getChildByName('rount'),this.mysite)
		cityBox.init(this.getChildByName('city'),this.mysite)
		// 初始化交易框
		this.dealBox = new DealBox(this.getChildByName('deal'))
		for (let i = 0; i < 4; i++) {
			let playerbox = new PlayerBox(this.getChildByName('item' + i), i);
			this.playerArr.push(playerbox)
		}

		this.getChildByName('operationBox').getChildByName('end').on(Laya.Event.CLICK, this, this.rountEnd)
		this.getChildByName('operationBox').getChildByName('round').on(Laya.Event.CLICK, this, ()=>{this.want = 'road';console.log(this.want)})
		this.getChildByName('operationBox').getChildByName('farm').on(Laya.Event.CLICK, this, ()=>{this.want = 'farm';console.log(this.want)})
		this.getChildByName('operationBox').getChildByName('city').on(Laya.Event.CLICK, this, ()=>{this.want = 'city';console.log(this.want)})
		socket.on('role', function (msg) {
			console.log(msg)
			LayaSample.Game.getChildByName('role0').index = msg[0] - 1
			LayaSample.Game.getChildByName('role1').index = msg[1] - 1
			// Laya.timer.loop(1000,LayaSample.Game,LayaSample.Game.role);role点特效啥的，懒的写
		})
		// 刷新信息
		socket.on('myRoomMsg', function (msg) {
			playerData = msg
			console.log(playerData)
			LayaSample.Game.resit()
		})
		socket.send({title:'getMyRoomMsg'})
		this.resitTime()
	}

	_proto.resit = function () {
		// 刷新玩家状态
		for (let i = 0; i < 4; i++) {
			this.playerArr[i].resit()
		}
		this.getChildByName('operationBox').visible = (playerData[5][0] == this.mysite)
		// 刷新道路状态
		roadBox.resit(this.getChildByName('rount'))
		// 刷新城市状态
		cityBox.resit(this.getChildByName('city'))
	}

	_proto.rountEnd = function () {
		this.want = 'no'
		this.roundtime = 60
		socket.send({title:'rountEnd'})
	}

	_proto.resitTime = function () {
		Laya.timer.loop(1000, this, () => {
			// if (this.roundtime < 0 && nowplayer==this.mysite) {
			// 	this.rountEnd()
			// } else {
				this.roundtime--
				if (this.roundtime > 9) {
					this.getChildByName('time0').visible = true
					this.getChildByName('time0').index = parseInt(this.roundtime/10)
				}else{
					this.getChildByName('time0').visible = false
				}
				this.getChildByName('time1').index =this.roundtime%10
			// }
		})
	}

	return Game;
})(ui.game.GameUI);