var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var gameUI=(function(_super){
		function gameUI(){
			

			gameUI.__super.call(this);
		}

		CLASS$(gameUI,'ui.game.gameUI',_super);
		var __proto__=gameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(gameUI.uiView);

		}

		gameUI.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"game/bg_ocarn.png","name":"bg","height":720}}]};
		return gameUI;
	})(View);
var homeUI=(function(_super){
		function homeUI(){
			

			homeUI.__super.call(this);
		}

		CLASS$(homeUI,'ui.main.homeUI',_super);
		var __proto__=homeUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(homeUI.uiView);

		}

		homeUI.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":321,"x":447,"skin":"home/match.png","name":"match"}},{"type":"Text","props":{"y":53,"x":152,"text":"text","name":"nickname","fontSize":24,"color":"#000000"}},{"type":"Clip","props":{"y":48,"x":56,"skin":"public/clip_head.png","name":"head","clipY":4,"clipX":4}},{"type":"Text","props":{"y":175,"x":717,"text":"text","name":"money","fontSize":12,"color":"#000000"}}]};
		return homeUI;
	})(View);
var logonUI=(function(_super){
		function logonUI(){
			

			logonUI.__super.call(this);
		}

		CLASS$(logonUI,'ui.main.logonUI',_super);
		var __proto__=logonUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(logonUI.uiView);

		}

		logonUI.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"logon/login-bg.png","height":720}},{"type":"Box","props":{"y":337,"x":398,"name":"login","cacheAs":"bitmap"},"child":[{"type":"Image","props":{"skin":"logon/loginframe-bg2.png"}},{"type":"TextInput","props":{"y":59,"x":129,"text":"q","name":"username"}},{"type":"TextInput","props":{"y":111,"x":133,"width":128,"text":"q","name":"password","height":22}},{"type":"Text","props":{"y":109,"x":53,"width":57,"text":"密码","height":35,"fontSize":22,"font":"Microsoft YaHei","color":"#b87175","bold":true}},{"type":"Text","props":{"y":54,"x":49,"width":57,"text":"账号","height":35,"fontSize":22,"font":"Microsoft YaHei","color":"#b87175","bold":true}},{"type":"Text","props":{"y":53,"x":379,"width":57,"text":"注册账号","name":"logup","height":35,"fontSize":13,"font":"Microsoft YaHei","color":"#b87175","bold":true}},{"type":"Text","props":{"y":108,"x":381,"width":57,"text":"找回密码","height":35,"fontSize":13,"font":"Microsoft YaHei","color":"#b87175","bold":true}},{"type":"CheckBox","props":{"y":156,"x":108,"name":"rmbpwd","label":"记住密码"}},{"type":"Box","props":{"y":188,"x":138,"name":"login"},"child":[{"type":"Image","props":{"width":208,"skin":"logon/login-bt.png","height":37}},{"type":"Text","props":{"y":4,"x":55,"width":98,"text":"登   录","height":44,"fontSize":22,"font":"Microsoft YaHei","color":"#DDDAB9","bold":true,"align":"center"}}]}]},{"type":"Box","props":{"y":30,"x":745,"name":"logup","cacheAs":"bitmap"},"child":[{"type":"Image","props":{"skin":"logon/loginframe-bg2.png"}},{"type":"Image","props":{"y":188,"x":138,"width":208,"skin":"logon/login-bt.png","height":37}},{"type":"Text","props":{"y":192,"x":193,"width":98,"text":"登   录","height":44,"fontSize":22,"font":"Microsoft YaHei","color":"#DDDAB9","bold":true,"align":"center"}},{"type":"TextInput","props":{"y":59,"x":129,"text":"TextInput","name":"username"}},{"type":"TextInput","props":{"y":111,"x":133,"width":128,"text":"TextInput","name":"password","height":22}},{"type":"Text","props":{"y":109,"x":53,"width":57,"text":"密码","height":35,"fontSize":22,"font":"Microsoft YaHei","color":"#b87175","bold":true}},{"type":"Text","props":{"y":54,"x":49,"width":57,"text":"账号","height":35,"fontSize":22,"font":"Microsoft YaHei","color":"#b87175","bold":true}},{"type":"Text","props":{"y":53,"x":379,"width":57,"text":"注册账号","height":35,"fontSize":13,"font":"Microsoft YaHei","color":"#b87175","bold":true}},{"type":"Text","props":{"y":108,"x":381,"width":57,"text":"找回密码","height":35,"fontSize":13,"font":"Microsoft YaHei","color":"#b87175","bold":true}},{"type":"CheckBox","props":{"y":156,"x":108,"name":"rmbpwd","label":"记住密码"}}]}]};
		return logonUI;
	})(View);
var matchUI=(function(_super){
		function matchUI(){
			

			matchUI.__super.call(this);
		}

		CLASS$(matchUI,'ui.main.matchUI',_super);
		var __proto__=matchUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(matchUI.uiView);

		}

		matchUI.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Clip","props":{"y":178,"x":481,"skin":"public/clip_head.png","clipY":4,"clipX":4}}]};
		return matchUI;
	})(View);