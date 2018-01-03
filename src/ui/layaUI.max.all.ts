
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class BackGroundUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":480,"height":852},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"war/background.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.BackGroundUI.uiView);

        }

    }
}

module ui {
    export class GameInfoUI extends View {
		public hpLabel:Laya.Label;
		public levelLabel:Laya.Label;
		public scoreLabel:Laya.Label;
		public pauseBtn:Laya.Button;
		public infoLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":480,"height":852},"child":[{"type":"Label","props":{"y":108,"x":24,"var":"hpLabel","text":"HP:5","fontSize":24,"color":"#9caf12","align":"center"}},{"type":"Label","props":{"y":108,"x":133,"var":"levelLabel","text":"Level:0","fontSize":24,"color":"#85c821","align":"center"}},{"type":"Label","props":{"y":108,"x":266,"var":"scoreLabel","text":"Sore:0","fontSize":24,"color":"#93d10f","align":"center"}},{"type":"Button","props":{"y":108,"x":392,"var":"pauseBtn","stateNum":2,"skin":"war/btn_pause.png"}},{"type":"Label","props":{"y":441,"x":170,"var":"infoLabel","text":"游戏结束","fontSize":30,"color":"#9fb215","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameInfoUI.uiView);

        }

    }
}
