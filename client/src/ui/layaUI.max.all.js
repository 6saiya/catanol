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

		gameUI.uiView={"type":"View","props":{"width":1280,"height":720}};
		return gameUI;
	})(View);
var homeUI=(function(_super){
		function homeUI(){
			

			homeUI.__super.call(this);
		}

		CLASS$(homeUI,'ui.main.homeUI',_super);
		var __proto__=homeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(homeUI.uiView);

		}

		homeUI.uiView={"type":"View","props":{"width":1280,"height":720}};
		return homeUI;
	})(View);
var logonUI=(function(_super){
		function logonUI(){
			

			logonUI.__super.call(this);
		}

		CLASS$(logonUI,'ui.main.logonUI',_super);
		var __proto__=logonUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(logonUI.uiView);

		}

		logonUI.uiView={"type":"View","props":{"width":1280,"height":720}};
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

		matchUI.uiView={"type":"View","props":{"width":1280,"height":720}};
		return matchUI;
	})(View);