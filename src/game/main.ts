import { Game, Types } from "phaser";
import { LoadingScene, Level1, UIScene } from "./scenes";

const gameConfig: Types.Core.GameConfig = {
    title: "Kingdom Knight",
    type: Phaser.WEBGL,
    parent: "game",
    backgroundColor: "#351f1b",
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
