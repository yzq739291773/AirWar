var Game = /** @class */ (function () {
    function Game() {
        // 敌机的配置选项
        // 敌机血量
        this.hps = [1, 2, 10];
        // 敌机速度
        this.speeds = [3, 2, 1];
        // 敌机被击半径
        this.radius = [15, 30, 70];
        // 子弹发射的偏移位置
        this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        // 关卡等级
        this.level = 0;
        // 积分成绩
        this.score = 0;
        // 升级等级所需成绩数量
        this.levelUpScore = 0;
        // 子弹级别
        this.bulletLevel = 0;
        Laya.init(480, 852, Laya.WebGL);
        // 预加载图集资源
        var resArray = [
            { url: "res/atlas/war.atlas", type: Laya.Loader.ATLAS },
            { url: "war/background.png", type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onloaded), null);
    }
    Game.prototype.onloaded = function () {
        var bg = new BackGround();
        Laya.stage.addChild(bg);
        //实例化角色容器
        this.roleBox = new Laya.Sprite();
        //添加到舞台上
        Laya.stage.addChild(this.roleBox);
        //创建游戏UI界面
        this.gameInfo = new GameInfo();
        //添加到舞台上
        Laya.stage.addChild(this.gameInfo);
        this.hero = new Role();
        this.hero.init("hero", 0, 1, 0, 30);
        this.hero.shootType = 1;
        this.hero.pos(200, 500);
        this.roleBox.addChild(this.hero);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        //  this.creatEnemey(10);
        // 手动创建敌人改为定时创建敌人
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Game.prototype.onLoop = function () {
        // 遍历舞台上所有的飞机，更改飞机的状态
        // for(var i:number = Laya.stage.numChildren-1; i>0; i--){
        // 容器改为roleBox ,不像舞台一样有底图，所以I>-1
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            var role = this.roleBox.getChildAt(i);
            // 敌机移动
            if (role && role.speed) {
                // 根据飞机的速度改变位置
                role.y += role.speed;
                // 如果敌机移动到显示区域外则移除
                if (role.y > 1000 || !role.visible || (role.isBullet && role.y < -20)) {
                    // 从舞台移除
                    role.removeSelf();
                    role.isBullet = false;
                    role.visible = true;
                    // 回收到对象池
                    Laya.Pool.recover("role", role);
                }
            }
            // 处理子弹发射逻辑
            if (role.shootType > 0) {
                var time = Laya.Browser.now();
                if (time > role.shootTime) {
                    role.shootTime = time + role.shootInterval;
                    // 根据不同子弹类型，设置不同的数量及位置
                    var pos = this.bulletPos[role.shootType - 1];
                    for (var index = 0; index < pos.length; index++) {
                        var bullet = Laya.Pool.getItemByClass("role", Role);
                        bullet.init("bullet1", role.camp, 1, -4 - role.shootType - Math.floor(this.level / 15), 1, 1);
                        // console.log(role.camp);  这里的role.camp估计是默认为0，因为是数值类型
                        // bullet.isBullet = true;
                        bullet.pos(role.x + pos[index], role.y - role.hitRadius - 10);
                        this.roleBox.addChild(bullet);
                    }
                }
            }
        }
        // 检测碰撞
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            var role1 = this.roleBox.getChildAt(i);
            if (role1.hp < 1)
                continue;
            for (var j = i - 1; j > 0; j--) {
                if (!role.visible)
                    continue;
                var role2 = this.roleBox.getChildAt(j);
                if (role2.hp > 0 && role1.camp != role2.camp) {
                    var hitRadius = role1.hitRadius + role2.hitRadius;
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);
                        // 没掉一滴血 积分+1
                        this.score++;
                        // 积分大于升级积分，则升级
                        if (this.score > this.levelUpScore) {
                            // 关卡升级
                            this.level++;
                            // 提高下一级的升级难度
                            this.levelUpScore += this.level * 5;
                        }
                    }
                }
            }
        }
        // 如果主角死亡，则停止游戏循环
        if (this.hero.hp < 1) {
            Laya.timer.clear(this, this.onLoop);
        }
        // 每隔30帧创建新的敌机
        // if(Laya.timer.currFrame % 60 ===0){
        //     this.creatEnemey(2);
        // }
        // 关卡 创建低级的间隔越短
        var cutTime = this.level < 30 ? this.level * 2 : 60;
        // 关卡越高，敌机飞行速度越快
        var speedUp = Math.floor(this.level / 6);
        // 关卡越高，敌机血量越高
        var hpUp = Math.floor(this.level / 8);
        // 关卡越高，敌机数量越多
        var numUp = Math.floor(this.level / 10);
        // 创建小飞机
        if (Laya.timer.currFrame % (80 - cutTime) === 0) {
            this.creatEnemey(0, 2 + numUp, 3 + speedUp, 1);
        }
        // 创建小飞机
        if (Laya.timer.currFrame % (150 - cutTime) === 0) {
            this.creatEnemey(1, 1 + numUp, 2 + speedUp, 2 + hpUp * 2);
        }
        // 创建小飞机
        if (Laya.timer.currFrame % (900 - cutTime) === 0) {
            this.creatEnemey(2, 1, 1 + speedUp, 10 + hpUp * 6);
        }
    };
    Game.prototype.lostHp = function (role, lostHp) {
        role.hp -= lostHp;
        if (role.heroType === 2) {
            //每次吃一个子弹升级道具，子弹升级+1
            this.bulletLevel++;
            //子弹每升2级，子弹数量增加1，最大数量是4
            this.hero.shootType = Math.min(Math.floor(this.bulletLevel / 2) + 1, 4);
            //子弹级别越高，发射频率越快
            this.hero.shootInterval = 500 - 20 * (this.bulletLevel > 20 ? 20 : this.bulletLevel);
            //隐藏道具
            role.visible = false;
            //播放获得道具声音
            // Laya.SoundManager.playSound("res/sound/achievement.mp3");
        }
        else if (role.heroType === 3) {
            //每吃一个血瓶，血量增加1
            this.hero.hp++;
            //设置主角血量
            // this.gameInfo.hp(this.hero.hp);
            //设置最大血量不超过10
            if (this.hero.hp > 10)
                this.hero.hp = 10;
            //隐藏道具
            role.visible = false;
            //播放获得道具声音
            // Laya.SoundManager.playSound("res/sound/achievement.mp3");
        }
        else if (role.hp > 0) {
            role.playAction("hit");
        }
        else {
            if (role.isBullet) {
                role.visible = false;
            }
            else {
                role.playAction("down");
                // 几种boss的时候掉落血瓶和道具
                if (role.type === "enemy3") {
                    // 随机子弹或者升级道具
                    var type = Math.random() < 0.7 ? 2 : 3;
                    var item = Laya.Pool.getItemByClass("role", Role);
                    item.init("ufo" + (type - 1), role.camp, 1, 1, 15, type);
                    item.pos(role.x, role.y);
                    this.roleBox.addChild(item);
                }
            }
        }
    };
    // 恢复
    Game.prototype.resume = function () {
        //创建游戏主循环
        Laya.timer.frameLoop(1, this, this.onLoop);
        //监听舞台的鼠标移动事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    // 暂停
    Game.prototype.pause = function () {
        //停止游戏主循环
        Laya.timer.clear(this, this.onLoop);
        //移除舞台的鼠标移动事件
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    Game.prototype.onMouseMove = function () {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    Game.prototype.creatEnemey = function (type, num, speed, hp) {
        for (var i = 0; i < num; i++) {
            // 随机出现敌人数
            // var r = Math.random();
            // 根据随机数，随机敌人 type：0 小飞机  1 中型飞机  2 大型飞机
            // var type:number = r< 0.7 ? 0 : r< 0.95 ? 1 : 2;
            // 创建敌人
            // var enemy :Role = new Role();
            // 从对象池里面创建对象，性能更好
            // 参数1：标识符  参数2：类型
            var enemy = Laya.Pool.getItemByClass("role", Role);
            // 初始化角色
            enemy.init("enemy" + (type + 1), 1, hp, speed, this.radius[type]);
            // 随机位置
            enemy.pos(Math.random() * 400 + 40, Math.random() * 200);
            // 添加到舞台上
            this.roleBox.addChild(enemy);
        }
    };
    return Game;
}());
var gameInstance = new Game();
//# sourceMappingURL=Game.js.map