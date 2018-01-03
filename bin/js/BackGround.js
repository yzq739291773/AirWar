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
var BackGround = /** @class */ (function (_super) {
    __extends(BackGround, _super);
    function BackGround() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    BackGround.prototype.init = function () {
        this.bg1 = new Laya.Sprite();
        this.bg2 = new Laya.Sprite();
        // 加载并显示背景图
        this.bg1.loadImage("war/background.png");
        this.bg2.loadImage("war/background.png");
        // 把背景图显示在容器内
        this.addChild(this.bg1);
        this.addChild(this.bg2);
        //背景2放在背景1的上面
        this.bg2.pos(0, -852);
        // 在定时器里面实现背景滚动
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    BackGround.prototype.onLoop = function () {
        this.y += 1;
        if (this.bg1.y + this.y >= 852) {
            this.bg1.y -= 852 * 2;
        }
        if (this.bg2.y + this.y >= 852) {
            this.bg2.y -= 852 * 2;
        }
    };
    return BackGround;
}(Laya.Sprite));
//# sourceMappingURL=BackGround.js.map