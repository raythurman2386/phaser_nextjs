// @ts-nocheck
import { Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";

export class Level1 extends Scene {
    private map!: Tilemaps.Tilemap;
    private tileset!: Tilemaps.Tileset;
    private wallsLayer!;
    private groundLayer!;
    private player!: Player;

    constructor() {
        super("level-1-scene");
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

    create(): void {
        this.initMap();
        this.player = new Player(this, 100, 100);
        this.physics.add.collider(this.player, this.wallsLayer);
    }

    update(): void {
        this.player.update();
    }
}
