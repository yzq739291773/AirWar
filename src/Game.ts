class Game{
    private hero : Role;

    // 敌机的配置选项
    // 敌机血量
    private hps:Array<any> = [1, 2,10];
    // 敌机速度
    private speeds :Array<any> = [3, 2, 1];
    // 敌机被击半径
    private radius: Array<any> = [15,30,70];

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
         this.hero = new Role();
         this.hero.init("hero",0,1,0,30);
         this.hero.pos(200,500);
         Laya.stage.addChild(this.hero);
         Laya.stage.on(Laya.Event.MOUSE_MOVE,this, this.onMouseMove);
         this.creatEnemey(10);
    }
    onMouseMove():void{
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }
    creatEnemey(num:number):void{
        for(var i:number = 0; i<num; i++){
            // 随机出现敌人数
            var r = Math.random();
            // 根据随机数，随机敌人 type：0 小飞机  1 中型飞机  2 大型飞机
            var type:number = r< 0.7 ? 0 : r< 0.95 ? 1 : 2;
            // 创建敌人
            var enemy :Role = new Role();
            // 初始化角色
            enemy.init("enemy"+(type+1),1,this.hps[type], this.speeds[type], this.radius[type]);
            // 随机位置
            enemy.pos(Math.random()*400 +40, Math.random()*200);
            // 添加到舞台上
            Laya.stage.addChild(enemy);
        }
    }
}

new Game();