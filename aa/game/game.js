// config.js
const CONFIG = {
    PLAYER: {
        INITIAL_X: 100,
        SPEED: 5,
        JUMP: {
            HEIGHT: 100,
            MAX_HEIGHT: 300,
            SPEED: 20,
            FALL_SPEED: 15
        },
        GROUND_Y: 100
    },
    WORLD: {
        WIDTH: 2400,
        GROUND_HEIGHT: 100,
        SCROLL_THRESHOLD: 200
    },
    INTERACTION: {
        RANGE: 200
    },
    REPUTATION: {
        MAX: 10,
        MIN: -10
    }
};

// gameState.js
class GameState {
    constructor() {
        this.playerX = CONFIG.PLAYER.INITIAL_X;
        this.worldX = 0;
        this.reputation = 0;
        this.isDialogActive = false;
        this.currentNPC = null;
        this.gameStarted = false;
        this.isJumping = false;
        this.isGrounded = true;
        this.jumpHeight = CONFIG.PLAYER.JUMP.HEIGHT;
        this.keys = {
            left: false,
            right: false,
            top: false,
            interact: false
        };
        
        this.initializeDOM();
    }

    initializeDOM() {
        this.elements = {
            player: document.getElementById('player'),
            dialogBox: document.getElementById('dialog-box'),
            dialogText: document.getElementById('dialog-text'),
            choiceContainer: document.getElementById('choice-container'),
            reputationIndicator: document.getElementById('reputation-indicator'),
            gameWorld: document.getElementById('game-world'),
            viewport: document.getElementById('viewport'),
            gameContainer: document.getElementById('game-container'),
            controlsHint: document.getElementById('controls-hint'),
            startScreen: document.getElementById('start-screen'),
            tutorialOverlay: document.getElementById('tutorial-overlay'),
            tutorialBox: document.getElementById('tutorial-box'),
            narratorContainer: document.getElementById('narrator-container')
        };
    }

    movePlayer(direction) {
        if (this.isDialogActive) return;

        if (direction === 'left') {
            this.playerX = Math.max(50, this.playerX - CONFIG.PLAYER.SPEED);
            this.elements.player.classList.remove('flip');
        } else if (direction === 'right') {
            this.playerX = Math.min(CONFIG.WORLD.WIDTH - 50, this.playerX + CONFIG.PLAYER.SPEED);
            this.elements.player.classList.add('flip');
        }

        this.updatePlayerPosition();
        this.updateWorldScroll();
    }

    updatePlayerPosition() {
        this.elements.player.style.left = `${this.playerX}px`;
    }

    updateWorldScroll() {
        const viewportWidth = this.elements.viewport.clientWidth;
        const halfViewport = viewportWidth / 2;

        if (this.playerX > halfViewport && this.playerX < CONFIG.WORLD.WIDTH - halfViewport) {
            this.worldX = -1 * (this.playerX - halfViewport);
            this.elements.gameWorld.style.left = `${this.worldX}px`;
            this.elements.gameContainer.style.backgroundPosition = `${this.worldX * 0.5}px 0`;
        }
    }

    startJump() {
        if (!this.isGrounded) return;

        this.isJumping = true;
        this.isGrounded = false;
        this.jumpHeight = CONFIG.PLAYER.JUMP.HEIGHT;

        const jumpInterval = setInterval(() => {
            if (this.jumpHeight < CONFIG.PLAYER.JUMP.MAX_HEIGHT && this.isJumping) {
                this.jumpHeight += CONFIG.PLAYER.JUMP.SPEED;
                this.elements.player.style.bottom = `${this.jumpHeight}px`;
            } else {
                this.isJumping = false;
                this.fallDown();
                clearInterval(jumpInterval);
            }
        }, 20);
    }

    fallDown() {
        const fallInterval = setInterval(() => {
            if (this.jumpHeight > CONFIG.PLAYER.JUMP.HEIGHT) {
                this.jumpHeight -= CONFIG.PLAYER.JUMP.FALL_SPEED;
                this.elements.player.style.bottom = `${Math.max(this.jumpHeight, CONFIG.PLAYER.JUMP.HEIGHT)}px`;
            } else {
                this.jumpHeight = CONFIG.PLAYER.JUMP.HEIGHT;
                this.elements.player.style.bottom = `${CONFIG.PLAYER.GROUND_Y}px`;
                this.isGrounded = true;
                clearInterval(fallInterval);
            }
        }, 20);
    }

    updateReputation(value) {
        this.reputation = Math.max(
            CONFIG.REPUTATION.MIN,
            Math.min(CONFIG.REPUTATION.MAX, this.reputation + value)
        );
        this.updateReputationBar();
    }

    updateReputationBar() {
        const percent = ((this.reputation + CONFIG.REPUTATION.MAX) / (2 * CONFIG.REPUTATION.MAX)) * 100;
        this.elements.reputationIndicator.style.width = `${percent}%`;
    }
}

// npcManager.js
class NPCManager {
    constructor() {
        this.npcs = [
            {
                id: 'merchant',
                x: 300,
                type: 'Merchant',
                sprite: 'img/bonecoNPCTeste.png',
                dialogs: {
                    default: {
                        text: "Hello traveler! Would you like to see my wares?",
                        choices: [
                            { text: "Yes, show me what you have", effect: 1 },
                            { text: "No, thanks", effect: -1 }
                        ]
                    }
                }
            },
            {
                id: 'quest_giver',
                x: 800,
                type: 'Villager',
                sprite: 'img/bonecoNPCTeste2.png',
                dialogs: {
                    default: {
                        text: "Our village needs help. Will you assist us?",
                        choices: [
                            { text: "Of course, I'll help!", effect: 2 },
                            { text: "Sorry, I'm busy", effect: -1 }
                        ]
                    }
                }
            }
        ];
    }

    createNPCs(gameWorld) {
        this.npcs.forEach(npc => {
            const npcElement = document.createElement('div');
            npcElement.className = 'npc';
            npcElement.style.left = `${npc.x}px`;
            npcElement.style.backgroundImage = `url('${npc.sprite}')`;
            npcElement.id = npc.id;
            gameWorld.appendChild(npcElement);
        });
    }

    getNPCDialog(npcType) {
        const npc = this.npcs.find(n => n.type === npcType);
        if (!npc) return null;
        return npc.dialogs.default;
    }
}

// dialogManager.js
class DialogManager {
    constructor(gameState) {
        this.gameState = gameState;
    }

    showDialog(dialog) {
        this.gameState.isDialogActive = true;
        this.gameState.elements.dialogBox.style.display = 'block';
        this.gameState.elements.dialogText.textContent = dialog.text;
        
        this.gameState.elements.choiceContainer.innerHTML = '';
        dialog.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.classList.add('choice-button');
            button.onclick = () => this.handleChoice(choice);
            this.gameState.elements.choiceContainer.appendChild(button);
        });
    }

    handleChoice(choice) {
        this.gameState.updateReputation(choice.effect);
        this.gameState.isDialogActive = false;
        this.gameState.elements.dialogBox.style.display = 'none';
        this.gameState.currentNPC = null;
    }
}

// game.js
document.addEventListener('DOMContentLoaded', () => {
    const gameState = new GameState();
    const npcManager = new NPCManager();
    const dialogManager = new DialogManager(gameState);

    // Event Listeners
    document.addEventListener('keydown', (e) => {
        if (gameState.isDialogActive) return;

        switch(e.key) {
            case 'a':
            case 'ArrowLeft':
                gameState.keys.left = true;
                break;
            case 'd':
            case 'ArrowRight':
                gameState.keys.right = true;
                break;
            case ' ':
            case 'ArrowUp':
                if (gameState.isGrounded) gameState.startJump();
                break;
            case 'e':
            case 'Enter':
                checkInteraction();
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch(e.key) {
            case 'a':
            case 'ArrowLeft':
                gameState.keys.left = false;
                break;
            case 'd':
            case 'ArrowRight':
                gameState.keys.right = false;
                break;
        }
    });

    function gameLoop() {
        if (!gameState.isDialogActive) {
            if (gameState.keys.left) gameState.movePlayer('left');
            if (gameState.keys.right) gameState.movePlayer('right');
        }
        requestAnimationFrame(gameLoop);
    }

    function checkInteraction() {
        if (!gameState.gameStarted) return;

        for (const npc of npcManager.npcs) {
            const npcElement = document.getElementById(npc.id);
            const npcRect = npcElement.getBoundingClientRect();
            const playerRect = gameState.elements.player.getBoundingClientRect();
            
            if (Math.abs(npcRect.left - playerRect.left) < CONFIG.INTERACTION.RANGE) {
                const dialog = npcManager.getNPCDialog(npc.type);
                if (dialog) dialogManager.showDialog(dialog);
                break;
            }
        }
    }

    // Start the game
    npcManager.createNPCs(gameState.elements.gameWorld);
    gameLoop();
});