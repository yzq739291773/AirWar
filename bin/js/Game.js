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
        var hero = new Role();
        hero.pos(200, 500);
        Laya.stage.addChild(hero);
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map