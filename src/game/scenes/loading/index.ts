import { GameObjects, Scene } from "phaser";

export class LoadingScene extends Scene {
    constructor() {
        super("loading-scene");
    }

    preload(): void {
        this.load.baseURL = "assets/";
        this.load.spritesheet(
            "dungeon_tiles_spr",
            "./tilemaps/tiles/dungeon.png",
            {
                frameWidth: 16,
                frameHeight: 16,
            }
        );
        this.load.image({
            key: "tiles",
            url: "./tilemaps/tiles/dungeon.png",
        });
        this.load.tilemapTiledJSON("dungeon", "./tilemaps/json/dungeon.json");
        this.load.image("king", "./sprites/king.png");
        this.load.atlas(
            "a-king",
            "./spritesheets/a-king.png",
            "spritesheets/a-king_atlas.json"
        );
    }

    create(): void {
        console.log("Loading scene was created");
        this.scene.start("level-1-scene");
    }
}
