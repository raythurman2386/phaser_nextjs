// @ts-nocheck
import { Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
import { gameObjectsToObjectPoints } from "@/game/utils/gameobject-to-object-point";
import { EVENTS_NAME } from "@/game/utils/constants";
import { Enemy } from "@/game/classes/enemy";

export class Level2 extends Scene {
    private map!: Tilemaps.Tilemap;
    private tileset_1!: Tilemaps.Tileset;
    private tileset_2!: Tilemaps.Tileset;
    private tileset_3!: Tilemaps.Tileset;
    private waterLayer!: Tilemaps.LayerData;
    private groundLayer!: Tilemaps.LayerData;
    private bridgeLayer!: Tilemaps.LayerData;
    private treesLayer!: Tilemaps.LayerData;
    private player!: Player;
    private chests!: Phaser.GameObjects.Sprite[];
    private enemies!: Enemy[];

    constructor() {
        super("level-2-scene");
    }

    private initCamera(): void {
        this.cameras.main.setSize(
            this.game.scale.width,
            this.game.scale.height,
        );
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.cameras.main.setZoom(2);
    }

    private initMap(): void {
        this.map = this.make.tilemap({
            key: "field",
            tileWidth: 16,
            tileHeight: 16,
        });
        this.map = this.make.tilemap({ key: "field" });
        this.tileset_1 = this.map.addTilesetImage("Tileset-1");
        this.tileset_2 = this.map.addTilesetImage("Tileset-2");
        this.tileset_3 = this.map.addTilesetImage("Tileset-3");
        this.groundLayer = this.map.createLayer(
            "Ground",
            [this.tileset_3],
            0,
            0,
        );
        this.waterLayer = this.map.createLayer("Water", [this.tileset_3], 0, 0);
        this.bridgeLayer = this.map.createLayer(
            "Bridges",
            [this.tileset_1],
            0,
            0,
        );
        this.treesLayer = this.map.createLayer("Trees", [this.tileset_2], 0, 0);
        this.waterLayer.setCollisionByProperty({ collides: true });
        this.bridgeLayer.setCollisionByProperty({ collides: false });
        this.treesLayer.setCollisionByProperty({ collides: true });

        this.physics.world.setBounds(
            0,
            0,
            this.waterLayer.width,
            this.waterLayer.height,
        );
        this.physics.world.setBounds(
            0,
            0,
            this.bridgeLayer.width,
            this.bridgeLayer.height,
        );
        this.physics.world.setBounds(
            0,
            0,
            this.treesLayer.width,
            this.treesLayer.height,
        );
    }

    private initChests(): void {
        const chestPoints = gameObjectsToObjectPoints(
            this.map.filterObjects(
                "Chests",
                (obj) => obj.name === "ChestPoint",
            ),
        );
        this.chests = chestPoints.map((chestPoint) =>
            this.physics.add
                .sprite(chestPoint.x, chestPoint.y, "field_tileset_1", 0)
                .setScale(1.5),
        );
        this.chests.forEach((chest) => {
            this.physics.add.overlap(this.player, chest, (_player, chest) => {
                this.game.events.emit(EVENTS_NAME.chestLoot);
                chest.destroy();
                this.cameras.main.flash();
            });
        });
    }

    private initEnemies(): void {
        const enemiesPoints = gameObjectsToObjectPoints(
            this.map.filterObjects(
                "Enemies",
                (obj) => obj.name === "EnemyPoint",
            ),
        );

        this.enemies = enemiesPoints.map((enemyPoint) =>
            new Enemy(
                this,
                enemyPoint.x,
                enemyPoint.y,
                "dungeon_tiles_spr",
                this.player,
                503,
            )
                .setName(enemyPoint.id.toString())
                .setScale(1.5),
        );

        this.physics.add.collider(this.enemies, this.waterLayer);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(
            this.player,
            this.enemies,
            (player, enemy) => {
                (player as Player).getDamage(1);
            },
        );
    }

    create(): void {
        this.initMap();
        this.player = new Player(this, 80, 100);
        this.initCamera();
        this.initChests();
        this.initEnemies();
        this.physics.add.collider(this.player, this.waterLayer);
        this.physics.add.collider(this.player, this.treesLayer);
    }

    update(): void {
        this.player.update();
    }
}
