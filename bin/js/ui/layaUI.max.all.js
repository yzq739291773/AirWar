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
//# sourceMappingURL=layaUI.max.all.js.map