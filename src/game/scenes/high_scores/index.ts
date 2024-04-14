export class HighScores extends Phaser.Scene {
    private highScores: any;
    constructor() {
        super("high-scores");
    }

    preload() {
        this.load.image("high-scores-background", "assets/bg.png");
        this.load.image("close-button", "assets/star.png");
        const highScores = localStorage.getItem("highScores");
        if (highScores) {
            this.highScores = JSON.parse(highScores);
        } else {
            this.highScores = [
                { name: "Player 1", score: 1000 },
                { name: "Player 2", score: 800 },
                { name: "Player 3", score: 700 },
                // Add more test data as needed
            ];
        }
    }

    create() {
        this.createBackground();
        this.createHighScoresText();
        this.createCloseButton();
    }

    createBackground() {
        const bg = this.add.image(
            this.game.scale.width / 2,
            this.game.scale.height / 2,
            "high-scores-background",
        );
        bg.setScale(2);
    }

    createHighScoresText() {
        const title = this.add.text(
            this.game.scale.width / 2,
            40,
            "High Scores",
            {
                fontSize: 40,
                fontFamily: "arial",
                padding: {
                    top: 20,
                    bottom: 40,
                },
            },
        );

        title.setOrigin(0.5);

        const scoresText = this.add.text(this.game.scale.width / 2, 100, "", {
            fontSize: 24,
            fontFamily: "arial",
            padding: {
                top: 20,
                bottom: 20,
            },
        });

        scoresText.setOrigin(0.5);

        this.highScores.sort(
            (a: { score: number }, b: { score: number }) => b.score - a.score,
        );
        let text = "";
        for (let i = 0; i < this.highScores.length; i++) {
            text += `${i + 1}. ${this.highScores[i].name} - ${this.highScores[i].score}\n`;
        }
        scoresText.text = text;
    }

    createCloseButton() {
        const closeButton = this.add.sprite(
            this.game.scale.width / 2,
            this.game.scale.height - 50,
            "close-button",
        );
        closeButton.setOrigin(0.5);
        closeButton.setInteractive();
        closeButton.on("pointerdown", () => this.scene.start("main-menu"));
    }
}
