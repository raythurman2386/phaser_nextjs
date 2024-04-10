import { GameObjects, Scene } from "phaser";

export class LoadingScene extends Scene {
    constructor() {
        super("loading-scene");
    }

    preload(): void {
        this.load.baseURL = "assets/";

        // Dungeon LEVEL 1 SCENE SETUP
        this.load.spritesheet(
            "dungeon_tiles_spr",
            "./tilemaps/tiles/dungeon.png",
            {
                frameWidth: 16,
                frameHeight: 16,
            },
        );
        this.load.image({
            key: "tiles",
            url: "./tilemaps/tiles/dungeon.png",
        });
        this.load.tilemapTiledJSON("dungeon", "./tilemaps/json/dungeon.json");

        // Field LEVEL 2 SCENE SETUP
        // Tileset 1
        this.load.spritesheet(
            "field_tileset_1",
            "./tilemaps/tiles/Tileset-1.png",
            {
                frameWidth: 16,
                frameHeight: 16,
            },
        );
        this.load.image({
            key: "Tileset-1",
            url: "./tilemaps/tiles/Tileset-1.png",
        });
        // Tileset 2
        this.load.spritesheet(
            "field_tileset_2",
            "./tilemaps/tiles/Tileset-2.png",
            {
                frameWidth: 16,
                frameHeight: 16,
            },
        );
        this.load.image({
            key: "Tileset-2",
            url: "./tilemaps/tiles/Tileset-2.png",
        });
        // Tileset 3
        this.load.spritesheet(
            "field_tileset_3",
            "./tilemaps/tiles/Tileset-3.png",
            {
                frameWidth: 16,
                frameHeight: 16,
            },
        );
        this.load.image({
            key: "Tileset-3",
            url: "./tilemaps/tiles/Tileset-3.png",
        });
        this.load.tilemapTiledJSON("field", "./tilemaps/json/field.json");

        // KING SPRITE SETUP
        this.load.image("king", "./sprites/king.png");
        this.load.atlas(
            "a-king",
            "./spritesheets/a-king.png",
            "spritesheets/a-king_atlas.json",
        );
    }

    create(): void {
        console.log("Loading scene was created");
        this.scene.start("level-1-scene");
        this.scene.start("ui-scene");
    }
}
