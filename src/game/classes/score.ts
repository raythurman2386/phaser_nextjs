import { SCORE_OPERATIONS } from "../utils/constants";
import { Text } from "./text";

export class Score extends Text {
    private scoreValue: number;
    constructor(scene: Phaser.Scene, x: number, y: number, initScore = 0) {
        super(scene, x, y, `Score: ${initScore}`);
        scene.add.existing(this);
        this.scoreValue = initScore;
    }

    public changeValue(operation: SCORE_OPERATIONS, value: number): void {
        switch (operation) {
            case SCORE_OPERATIONS.INCREASE:
                this.scoreValue += value;
                break;
            case SCORE_OPERATIONS.DECREASE:
                this.scoreValue -= value;
                break;
            case SCORE_OPERATIONS.SET_VALUE:
                this.scoreValue = value;
                break;
            default:
                break;
        }
        this.setText(`Score: ${this.scoreValue}`);
    }

    public getValue(): number {
        return this.scoreValue;
    }
}
