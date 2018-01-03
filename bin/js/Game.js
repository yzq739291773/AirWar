var Game = /** @class */ (function () {
    function Game() {
        Laya.init(480, 852, Laya.WebGL);
        var bg = new BackGround();
        Laya.stage.addChild(bg);
    }
    return Game;
}());
new Game();
//# sourceMappingURL=Game.js.map