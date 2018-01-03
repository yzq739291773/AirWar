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
    }
}