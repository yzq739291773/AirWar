class Role extends Laya.Sprite {
    private body:Laya.Animation;

     // 角色类型
    public type :string;
    // 阵营
    public camp :number;
    // 血量
    public hp :number;
    // 速度
    public speed:number;
    // 被击半径
    public hitRadius:number;
    
    constructor(){
        super();
        this.init();
    }
    init():void{
            //缓存飞行动画
            Laya.Animation.createFrames(["war/hero_fly1.png","war/hero_fly2.png"],"hero_fly");
            //缓存击中爆炸效果
            Laya.Animation.createFrames(["war/hero_down1.png","war/hero_down2.png"
            ,"war/hero_down3.png","war/hero_down4.png"],"hero_down");

            //缓存敌机1飞行动画
            Laya.Animation.createFrames(["war/enemy1_fly1.png"],"enemy1_fly");
            //缓存敌机1爆炸动作
            Laya.Animation.createFrames(["war/enemy1_down1.png","war/enemy1_down2.png","war/enemy1_down3.png",
            "war/enemy1_down4.png"],"enemy1_down");

            //缓存敌机2飞行动画
            Laya.Animation.createFrames(["war/enemy2_fly1.png"],"enemy2_fly");
            //缓存敌机2爆炸动作
            Laya.Animation.createFrames(["war/enemy2_down1.png","war/enemy2_down2.png","war/enemy2_down3.png",
            "war/enemy2_down4.png"],"enemy2_down");
            //缓存敌机2碰撞动作
            Laya.Animation.createFrames(["war/enemy2_hit.png"],"enemy2_hit");

            //缓存敌机3飞行动画
            Laya.Animation.createFrames(["war/enemy3_fly1.png","war/enemy3_fly2.png"],"enemy3_fly");
            //缓存敌机3爆炸动作
            Laya.Animation.createFrames(["war/enemy3_down1.png","war/enemy3_down2.png","war/enemy3_down3.png",
            "war/enemy3_down4.png","war/enemy3_down5.png","war/enemy3_down6.png"],"enemy3_down");
            //缓存敌机3碰撞动作
            Laya.Animation.createFrames(["war/enemy3_hit.png"],"enemy3_hit");

            //缓存子弹动画
            Laya.Animation.createFrames(["war/bullet1.png"],"bullet1_fly");

            //缓存强化包
            Laya.Animation.createFrames(["war/ufo1.png"],"ufo1_fly");
            //缓存医疗包
            Laya.Animation.createFrames(["war/ufo2.png"],"ufo2_fly");

            // 创建body作为动画的载体
            this.body = new Laya.Animation();
            this.addChild(this.body);
            this.playAction("hero_fly");
    }
    playAction(action):void{
        this.body.play(0,true,action);
        var bound:Laya.Rectangle = this.body.getBounds();
        this.body.pos(-bound.width/2,-bound.height/2);
    }
    

}