import { Scene } from "phaser";
import { Score, ScoreOperations } from "../../classes/score";
import { EVENTS_NAME, GAME_STATUS } from "@/game/utils/constants";
import { Text } from "@/game/classes/text";
import { gameConfig } from "@/game/main";

export class UIScene extends Scene {
    private score!: Score;
    private chestLootHandler: () => void;
    private gameEndPhrase!: Text;
    private gameEndHandler: (status: GAME_STATUS) => void;

    constructor() {
        super("ui-scene");

        // Loot handler
        this.chestLootHandler = () => {
            this.score.changeValue(ScoreOperations.INCREASE, 10);
            if (this.score.getValue() === gameConfig.winScore) {
                this.game.events.emit(EVENTS_NAME.gameEnd, "WIN");
            }
        };

        // End Game Handler
        this.gameEndHandler = (status) => {
            this.cameras.main.setBackgroundColor("rgba(0,0,0,0.6)");
            this.game.scene.pause("level-1-scene");
            this.gameEndPhrase = new Text(
                this,
                this.game.scale.width / 2,
                this.game.scale.height * 0.4,
                status === GAME_STATUS.LOSE
                    ? `WASTED\NCLICK TO RESTART`
                    : `YOU ROCK!\NCLICK TO RESTART`,
            )
                .setAlign("center")
                .setColor(status === GAME_STATUS.LOSE ? "#ff0000" : "#ffffff");
            this.gameEndPhrase.setPosition(
                this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
                this.game.scale.height * 0.4,
            );

            this.input.on("pointerdown", () => {
                this.game.events.off(
                    EVENTS_NAME.chestLoot,
                    this.chestLootHandler,
                );
                this.game.events.off(EVENTS_NAME.gameEnd, this.gameEndHandler);
                this.scene.get("level-1-scene").scene.restart();
                this.scene.restart();
            });
        };
    }

    create(): void {
        this.score = new Score(this, 20, 20, 0);
        this.initListeners();
    }

    private initListeners(): void {
        this.game.events.on(EVENTS_NAME.chestLoot, this.chestLootHandler, this);
        this.game.events.on(EVENTS_NAME.gameEnd, this.gameEndHandler, this);
    }
}
