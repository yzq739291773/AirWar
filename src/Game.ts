class Game{
    private hero : Role;

    // 敌机的配置选项
    // 敌机血量
    private hps:Array<any> = [1, 2,10];
    // 敌机速度
    private speeds :Array<any> = [3, 2, 1];
    // 敌机被击半径
    private radius: Array<any> = [15,30,70];

     // 子弹发射的偏移位置
    private bulletPos : Array<Array<number>> = [[0],[-15,15],[-30,0,30],[-45,-15,15,45]];
    // 关卡等级
    private level:number = 0;
    // 积分成绩
    private score:number = 0;
    // 升级等级所需成绩数量
    private levelUpScore:number = 0;
    // 子弹级别
    private bulletLevel:number = 0;

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
         this.hero.shootType = 1;
         this.hero.pos(200,500);
         Laya.stage.addChild(this.hero);
         Laya.stage.on(Laya.Event.MOUSE_MOVE,this, this.onMouseMove);
        //  this.creatEnemey(10);
        // 手动创建敌人改为定时创建敌人
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    onLoop():void{
         // 遍历舞台上所有的飞机，更改飞机的状态
        for(var i:number = Laya.stage.numChildren-1; i>0; i--){
            var role :Role = Laya.stage.getChildAt(i) as Role;
            // 敌机移动
            if(role && role.speed){
                // 根据飞机的速度改变位置
                role.y += role.speed;
                // 如果敌机移动到显示区域外则移除
                if(role.y>1000 || !role.visible || (role.isBullet && role.y<-20)){
                    // 从舞台移除
                    role.removeSelf();
                    role.isBullet = false;
                    role.visible = true;
                    // 回收到对象池
                    Laya.Pool.recover("role", role);
                }

            }

            // 处理子弹发射逻辑
            if(role.shootType > 0){
                var time:number = Laya.Browser.now();
                if(time>role.shootTime){
                    role.shootTime = time + role.shootInterval;

                    // 根据不同子弹类型，设置不同的数量及位置
                    var pos:Array<number> = this.bulletPos[role.shootType -1];
                    for(var index:number =0; index < pos.length; index++){
                        var bullet:Role = Laya.Pool.getItemByClass("role", Role);
                        bullet.init("bullet1", role.camp, 1, -4-role.shootType- Math.floor(this.level/15),1, 1);
                        // console.log(role.camp);  这里的role.camp估计是默认为0，因为是数值类型
                        // bullet.isBullet = true;
                        bullet.pos(role.x + pos[index], role.y-role.hitRadius-10);
                        Laya.stage.addChild(bullet);
                    }
                    
                }
            }
            
        }
        // 检测碰撞
        for(var i:number = Laya.stage.numChildren-1; i>0; i--){
            var role1:Role = Laya.stage.getChildAt(i) as Role;
            if(role1.hp<1)continue;
            for(var j:number = i-1; j>0; j--){
                if(!role.visible)continue;
                var role2 :Role = Laya.stage.getChildAt(j) as Role;
                if(role2.hp>0 && role1.camp != role2.camp){
                    var hitRadius:number = role1.hitRadius + role2.hitRadius;
                    if(Math.abs(role1.x -role2.x)<hitRadius && Math.abs(role1.y -role2.y)<hitRadius){
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);
                        // 没掉一滴血 积分+1
                        this.score ++;
                        // 积分大于升级积分，则升级
                        if(this.score > this.levelUpScore){
                            // 关卡升级
                            this.level ++;
                            // 提高下一级的升级难度
                            this.levelUpScore += this.level*5;
                        }
                    }
                }
            }
        }
        // 如果主角死亡，则停止游戏循环
        if(this.hero.hp<1){
            Laya.timer.clear(this, this.onLoop);
        }
        // 每隔30帧创建新的敌机
        if(Laya.timer.currFrame % 60 ===0){
            this.creatEnemey(2);
        }
    }
    lostHp(role:Role, lostHp:number):void{
        role.hp -= lostHp;
        if(role.heroType === 2){
            //每次吃一个子弹升级道具，子弹升级+1
            this.bulletLevel++;
            //子弹每升2级，子弹数量增加1，最大数量是4
            this.hero.shootType = Math.min(Math.floor(this.bulletLevel / 2) + 1,4);
            //子弹级别越高，发射频率越快
            this.hero.shootInterval = 500 - 20 * (this.bulletLevel > 20 ? 20 : this.bulletLevel);
            //隐藏道具
            role.visible = false;
            //播放获得道具声音
            // Laya.SoundManager.playSound("res/sound/achievement.mp3");
        }
        else if(role.heroType === 3){
            //每吃一个血瓶，血量增加1
            this.hero.hp++;
            //设置主角血量
            // this.gameInfo.hp(this.hero.hp);
            //设置最大血量不超过10
            if(this.hero.hp > 10) this.hero.hp = 10;
            //隐藏道具
            role.visible = false;
            //播放获得道具声音
            // Laya.SoundManager.playSound("res/sound/achievement.mp3");
        }
        else if(role.hp>0){
            role.playAction("hit");
        }else{
            if(role.isBullet){
                role.visible = false;
            }else{
                role.playAction("down");
                // 几种boss的时候掉落血瓶和道具
                if(role.type === "enemy3"){
                    // 随机子弹或者升级道具
                    var type:number = Math.random() < 0.7 ? 2:3;
                    var item:Role = Laya.Pool.getItemByClass("role",Role);
                    item.init("ufo"+(type-1), role.camp, 1, 1, 15, type);
                    item.pos(role.x, role.y);
                    Laya.stage.addChild(item);
                }
            }
        }
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
            // var enemy :Role = new Role();
            // 从对象池里面创建对象，性能更好
            // 参数1：标识符  参数2：类型
            var enemy:Role = Laya.Pool.getItemByClass("role",Role);
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