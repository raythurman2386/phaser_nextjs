// @ts-nocheck
import { Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
import { gameObjectsToObjectPoints } from "@/game/helpers/gameobject-to-object-point";

export class Level1 extends Scene {
    private map!: Tilemaps.Tilemap;
    private tileset!: Tilemaps.Tileset;
    private wallsLayer!: Tilemaps.LayerData;
    private groundLayer!: Tilemaps.LayerData;
    private player!: Player;
    private chests!: Phaser.GameObjects.Sprite[];

    constructor() {
        super("level-1-scene");
    }

    private initCamera(): void {
        this.cameras.main.setSize(
            this.game.scale.width,
            this.game.scale.height
        );
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.cameras.main.setZoom(2);
    }

    private initMap(): void {
        this.map = this.make.tilemap({
            key: "dungeon",
            tileWidth: 16,
            tileHeight: 16,
        });
        this.tileset = this.map.addTilesetImage("dungeon", "tiles");
        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer("Walls", this.tileset, 0, 0);
        this.wallsLayer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(
            0,
            0,
            this.wallsLayer.width,
            this.wallsLayer.height
        );
    }

    private initChests(): void {
        const chestPoints = gameObjectsToObjectPoints(
            this.map.filterObjects("Chests", (obj) => obj.name === "ChestPoint")
        );
        this.chests = chestPoints.map((chestPoint) =>
            this.physics.add
                .sprite(chestPoint.x, chestPoint.y, "dungeon_tiles_spr", 595)
                .setScale(1.5)
        );
        this.chests.forEach((chest) => {
            this.physics.add.overlap(this.player, chest, (_player, chest) => {
                chest.destroy();
                this.cameras.main.flash();
            });
        });
    }

    create(): void {
        this.initMap();
        this.player = new Player(this, 100, 100);
        this.initCamera();
        this.initChests();
        this.physics.add.collider(this.player, this.wallsLayer);
    }

    update(): void {
        this.player.update();
    }
}
