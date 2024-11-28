class AnimationManager {
    constructor(playerElement) {
        this.player = playerElement;
        this.currentAnimation = 'idle';
        this.animations = {
            idle: [0, 1, 2, 3],
            walk: [4, 5, 6, 7],
            interact: [8, 9, 10, 11]
        };
    }

    play(animationName) {
        if (this.currentAnimation === animationName) return;
        this.currentAnimation = animationName;
        this.updateSprite();
    }

    updateSprite() {
        const frames = this.animations[this.currentAnimation];
        // Implementar lógica de animação do sprite
    }
}


