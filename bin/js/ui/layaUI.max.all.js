var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var BackGroundUI = /** @class */ (function (_super) {
        __extends(BackGroundUI, _super);
        function BackGroundUI() {
            return _super.call(this) || this;
        }
        BackGroundUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.BackGroundUI.uiView);
        };
        BackGroundUI.uiView = { "type": "View", "props": { "width": 480, "height": 852 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "war/background.png" } }] };
        return BackGroundUI;
    }(View));
    ui.BackGroundUI = BackGroundUI;
})(ui || (ui = {}));
(function (ui) {
    var GameInfoUI = /** @class */ (function (_super) {
        __extends(GameInfoUI, _super);
        function GameInfoUI() {
            return _super.call(this) || this;
        }
        GameInfoUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameInfoUI.uiView);
        };
        GameInfoUI.uiView = { "type": "View", "props": { "width": 480, "height": 852 }, "child": [{ "type": "Label", "props": { "y": 17, "x": 24, "var": "hpLabel", "text": "HP:5", "fontSize": 24, "color": "#9caf12", "bgColor": "#f3e11d", "align": "center" } }, { "type": "Label", "props": { "y": 17, "x": 133, "var": "levelLabel", "text": "Level:0", "fontSize": 24, "color": "#85c821", "bgColor": "#1ceab9", "align": "center" } }, { "type": "Label", "props": { "y": 17, "x": 266, "var": "scoreLabel", "text": "Sore:0", "fontSize": 24, "color": "#93d10f", "bgColor": "#a5c095", "align": "center" } }, { "type": "Button", "props": { "y": 17, "x": 392, "var": "pauseBtn", "stateNum": 2, "skin": "war/btn_pause.png" } }, { "type": "Label", "props": { "y": 441, "x": 111, "wordWrap": true, "width": 257, "var": "infoLabel", "text": "游戏结束", "height": 60, "fontSize": 30, "color": "#9fb215", "align": "center" } }] };
        return GameInfoUI;
    }(View));
    ui.GameInfoUI = GameInfoUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map