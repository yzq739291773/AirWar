class BackGround extends Laya.Sprite{
    private bg1:Laya.Sprite;
    private bg2:Laya.Sprite;
    constructor(){
        super();
        this.init();
    }

    init():void{
        this.bg1 = new Laya.Sprite();
        this.bg2 = new Laya.Sprite();
        // 加载并显示背景图
        this.bg1.loadImage("war/background.png");
        this.bg2.loadImage("war/background.png");
        // 把背景图显示在容器内
        this.addChild(this.bg1);
        this.addChild(this.bg2);
        //背景2放在背景1的上面
        this.bg2.pos(0,-852);
        // 在定时器里面实现背景滚动
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    onLoop():void{
        this.y += 1;
        if(this.bg1.y + this.y >= 852){
            this.bg1.y -=852*2;
        }
        if(this.bg2.y + this.y >= 852){
            this.bg2.y -=852*2;
        }
    }
}