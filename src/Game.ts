class Game{
    constructor(){
        Laya.init(480, 852, Laya.WebGL);
        var bg:BackGround = new BackGround();
        Laya.stage.addChild(bg);
        // 预加载图集资源
        var resArray:Array<any> = [
            {url:"res/atlas/war.atlas", type:Laya.Loader.ATLAS},
            {url:"war/background.png", type:Laya.Loader.IMAGE}
        ]

        Laya.loader.load(resArray,Laya.Handler.create(this, this.onloaded),null);
    }

    onloaded():void{
         var hero :Role = new Role();
         hero.pos(200,500);
         Laya.stage.addChild(hero);
    }
}

new Game();