// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init() {
        // Initialize scene
    }

    preload() {
        this.load.image('background', './assets/images/background.jpg');
        this.load.image('basket', './assets/images/basket.png');
        this.load.atlas('candy', 'assets/spritesheets/candy_spritesheet.png', 'assets/spritesheets/candy_spritesheet.json');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.basket = this.physics.add.image(this.scale.width / 2, 630, 'basket');
        this.basket.body.setAllowGravity(false).setCollideWorldBounds(true);
        this.basketGlow = this.basket.postFX.addGlow(0xFFFFFF, 3, 0);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.candyFrames = this.textures.get('candy').getFrameNames();
        this.candyGroup = this.physics.add.group([]);
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.spawnRandomCandy,
            callbackScope: this,
        });
    }

    update() {
        if (this.cursorKeys.left.isDown) {
            this.basket.setAccelerationX(-350);
        } else if (this.cursorKeys.right.isDown) {
            this.basket.setAccelerationX(350);
        } else {
            this.basket.setAccelerationX(0);
        }

        this.candyGroup.getChildren().forEach((child) => {
            if (!child.active) {
                return;
            }
            if (child.y > this.scale.height + 10) {
                child.setActive(false).setVisible(false);
            }
        })
    }

    spawnRandomCandy() {
        const candy = this.candyGroup.getFirstDead(true, Phaser.Math.RND.between(50, this.scale.width - 50), -20, 'candy');
        candy.setScale(0.5).setActive(true).setVisible(true).setVelocity(0).setFrame(Phaser.Utils.Array.GetRandom(this.candyFrames));
    }
}