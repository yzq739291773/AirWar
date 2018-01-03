
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
