var Game = /** @class */ (function () {
    function Game() {
        Laya.init(480, 852, Laya.WebGL);
        var bg = new BackGround();
        Laya.stage.addChild(bg);
        // 预加载图集资源
        var resArray = [
            { url: "res/atlas/war.atlas", type: Laya.Loader.ATLAS },
            { url: "war/background.png", type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onloaded), null);
    }
    Game.prototype.onloaded = function () {
        this.hero = new Role();
        this.hero.pos(200, 500);
        Laya.stage.addChild(this.hero);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    Game.prototype.onMouseMove = function () {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map