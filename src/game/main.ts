import { Game, Types } from "phaser";
import { LoadingScene, Level1, UIScene } from "./scenes";

type GameConfigExtended = Types.Core.GameConfig & {
    winScore: number;
};

export const gameConfig: GameConfigExtended = {
    title: "Kingdom Knight",
    type: Phaser.WEBGL,
    parent: "game",
    backgroundColor: "#351f1b",
    winScore: 40,
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    render: {
        antialiasGL: false,
        pixelArt: true,
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    scene: [LoadingScene, Level1, UIScene],
};

const StartGame = (parent: string) => {
    return new Game({ ...gameConfig, parent });
};

export default StartGame;
