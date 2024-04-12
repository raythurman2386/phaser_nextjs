class AnimationManager {
    private animations: Record<string, any>;

    constructor() {
        this.animations = {};
    }

    addAnimation(key: string, animation: any) {
        this.animations[key] = animation;
    }

    getAnimation(key: string): Animation | null {
        if (this.animations.hasOwnProperty(key)) {
            return this.animations[key];
        }
        return null;
    }

    playAnimation(key: string, sprite: any) {
        const animation = this.getAnimation(key);
        if (animation) {
            sprite.anims.play(animation, true);
        }
    }
}

export default AnimationManager;
