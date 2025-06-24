export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.score = data.score;
    }

    create() {

        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.image(400, 300, 'background').setAlpha(0.5);

        this.add.text(400, 300, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(400, 400, "Your score: " + this.score, {
            fontSize: 32, color: "#000000",
        }).setOrigin(0.5);

        this.add.text(400, 100, "Press space to restart").setOrigin(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        if (this.cursors.space.isDown) {
            this.scene.start("Game");
        }
    }
}
