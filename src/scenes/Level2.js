import { Player } from "../gameObjects/Player.js";
import { score } from "./Game.js";

export class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
    }

    create() {
        this.add.image(400, 300, "sky");

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

        this.platforms.create(200, 400, "ground");
        this.platforms.create(740, 250, "ground");
        this.platforms.create(100, 180, "ground");

        this.player = new Player(this, 100, 450);

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70}
        });

        this.stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        })

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.score = score;
        this.scoreText = this.add.text(16, 16, "Score: " + this.score, { fontSize: "32px", fill: "#000" });

        this. bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.moveLeft();
        }
        else if (this.cursors.right.isDown) {
            this.player.moveRight();
        }
        else {
            this.player.idle();
        }

        if (this.cursors.up.isDown) {
            this.player.jump();
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText("Score: " + this.score);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            this.releaseBomb();
        }
    }

    hitBomb(player, bomb){
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play("turn");

        this.time.delayedCall(2000, () => {
            this.scene.start("GameOver", { score: this.score});
        });
    }

    releaseBomb() {
        let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb = this.bombs.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}