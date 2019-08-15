const w = 1280;
const h = 800;

const gameStart = {
    key: 'gameStart',
    preload: function(){
        //載入資源
        this.load.image('bg1','images/bg1.jpg');
        this.load.image('wave1','images/wave.png');
        // this.load.image('wave2','images/wave2.png');
        this.load.image('rock1','images/rock1.png');
        this.load.image('obj1','images/obj1.png');
        this.load.image('obj2','images/obj2.png');
        this.load.image('obj3','images/obj3.png');
        this.load.image('obj4','images/obj4.png');
        // this.load.image('rock2','../images/rock2.png');

        this.load.spritesheet('turtle','../images/turtle.png', {frameWidth: 223, frameHeight: 323});
    },
    create: function(){
        //資源載入完成，加入遊戲物件及相關設定
        this.bg1 = this.add.tileSprite( w/2 , h/2 , w , h , 'bg1');
        this.rock1 = this.add.tileSprite( w/2 , h/2 , 1721 , 1083 , 'rock1');
        
        this.turtle = this.physics.add.sprite( w/2 , h*4/5 , 'turtle',);

        this.wave1 = this.add.tileSprite( w/2 , h/2 , 1741 , 962 , 'wave1');

        this.obj1 = this.add.tileSprite( w/2-100 , h/2 , 159 , 834 , 'obj1');
        this.obj2 = this.add.tileSprite( w/4 , h/2 , 159 , 834 , 'obj2');
        this.obj3 = this.add.tileSprite( w*4/5 , h/2 , 159 , 1245 , 'obj3');
        this.obj4 = this.add.tileSprite( w*3/4 , h/2 , 159 , 1245 , 'obj4');
        // this.rock2 = this.add.tileSprite( w/2 , h/2 , 1422 , 1262 , 'rock2');

        // this.turtle.setScale(1.5);  //設定縮放
        this.turtle.setSize(150,-110)
        this.turtle.setCollideWorldBounds(true);

        this.anims.create({ //設定物件影格播放
            key: 'swim',
            frames: this.anims.generateFrameNumbers('turtle', { start: 0, end: 3}),
            frameRate: 3,
            repeat: -1
        })
        this.anims.create({ //設定物件影格播放
            key: 'right',
            frames: this.anims.generateFrameNumbers('turtle', { start: 8, end: 11}),
            frameRate: 4,
            repeat: -1
        })

        this.turtle.anims.play('swim', true); //調用動畫影格

        // this.wave2 = this.add.tileSprite( w/2 , h/2 , 1557 , 876 , 'wave2');

    },
    update: function(){
        //遊戲狀態更新
        this.wave1.tilePositionY -=0.5;   
        // this.wave2.tilePositionY -=1;
        this.obj1.tilePositionY -=2;
        this.obj2.tilePositionY -=2.5;
        this.obj3.tilePositionY -=1.5;
        this.obj4.tilePositionY -=3.5;
        // this.rock1.tilePositionY -=0.2;
        // this.rock2.tilePositionY -=0.4;

        const keyboard =  this.input.keyboard.createCursorKeys();
        if(keyboard.right.isDown){
            this.turtle.anims.play('right', true);
            this.turtle.flipX = false;
            this.turtle.setVelocityX(100);
        }else if(keyboard.left.isDown){
            this.turtle.anims.play('right', true);
            this.turtle.flipX = true;  //可直接反轉影像，就不用左右方向各做一組圖像
            this.turtle.setVelocityX(-100);
        }else if(keyboard.up.isDown){
            this.turtle.setVelocityY(-100);
        }else if(keyboard.down.isDown){
            this.turtle.setVelocityY(140);
        }
        else{
            this.turtle.anims.play('swim', true);
            this.turtle.flipX = false;
            this.turtle.setVelocityX(0);
            this.turtle.setVelocityY(20);
        }
    }
}
const config = {
    type: Phaser.Auto,
    width: w,
    height: h,
    parent: 'app',
    physics: {
        default: 'arcade',
        // arcade: {
        //     // gravity: {
        //     //     y: 1000
        //     // },
        //     debug: true
        // }
    },
    scene: [ gameStart ]
}
const game = new Phaser.Game(config)
