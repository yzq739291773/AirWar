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
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Role.prototype.init = function () {
        //缓存飞行动画
        Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
        //缓存击中爆炸效果
        Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png",
            "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
        //缓存敌机1飞行动画
        Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
        //缓存敌机1爆炸动作
        Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png",
            "war/enemy1_down4.png"], "enemy1_down");
        //缓存敌机2飞行动画
        Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
        //缓存敌机2爆炸动作
        Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png",
            "war/enemy2_down4.png"], "enemy2_down");
        //缓存敌机2碰撞动作
        Laya.Animation.createFrames(["war/enemy2_hit.png"], "enemy2_hit");
        //缓存敌机3飞行动画
        Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
        //缓存敌机3爆炸动作
        Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png",
            "war/enemy3_down4.png", "war/enemy3_down5.png", "war/enemy3_down6.png"], "enemy3_down");
        //缓存敌机3碰撞动作
        Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");
        //缓存子弹动画
        Laya.Animation.createFrames(["war/bullet1.png"], "bullet1_fly");
        //缓存强化包
        Laya.Animation.createFrames(["war/ufo1.png"], "ufo1_fly");
        //缓存医疗包
        Laya.Animation.createFrames(["war/ufo2.png"], "ufo2_fly");
        // 创建body作为动画的载体
        this.body = new Laya.Animation();
        this.addChild(this.body);
        this.playAction("hero_fly");
    };
    Role.prototype.playAction = function (action) {
        this.body.play(0, true, action);
        var bound = this.body.getBounds();
        this.body.pos(-bound.width / 2, -bound.height / 2);
    };
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map