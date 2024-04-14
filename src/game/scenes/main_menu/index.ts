export class MainMenu extends Phaser.Scene {
    constructor() {
        super("main-menu");
    }

    preload() {
        this.load.image("play-button", "assets/play.png");
        this.load.image("high-scores-button", "assets/star.png");
        this.load.image("menu-background", "assets/bg.png");
    }

    create() {
        this.createBackground();
        this.createMainMenuTitle();
        this.createPlayButton();
        this.createHighScoresButton();
    }

    createBackground() {
        const bg = this.add.image(
            this.game.scale.width / 2,
            this.game.scale.height / 2,
            "menu-background",
        );
        bg.setScale(2);
    }

    createMainMenuTitle() {
        const title = this.add.text(
            this.game.scale.width / 2,
            40,
            "Main Menu",
            {
                fontSize: 40,
                fontFamily: "arial",
            },
        );

        title.setOrigin(0.5);
    }

    createPlayButton() {
        const playButton = this.add.sprite(
            this.game.scale.width / 2,
            170,
            "play-button",
        );
        playButton.setOrigin(0.5);
        playButton.setInteractive();
        playButton.on("pointerdown", () => this.scene.start("level-1-scene"));
    }

    createHighScoresButton() {
        const highScoresButton = this.add.sprite(
            this.game.scale.width / 2,
            240,
            "high-scores-button",
        );
        highScoresButton.setOrigin(0.5);
        highScoresButton.setInteractive();
        // Add your logic for high scores here or show the high scores pop up when clicked.
        highScoresButton.on("pointerdown", () =>
            this.scene.start("high-scores"),
        );
    }
}
