document.addEventListener('DOMContentLoaded', () => {
    const game = new GameState();
    const npcManager = new NPCManager();
    const animations = new AnimationManager(document.getElementById('player'));
    
    // Sistema de salvamento
    const saveSystem = {
        save() {
            const saveData = {
                playerX: game.playerX,
                reputation: game.reputation,
                mode: game.mode
            };
            localStorage.setItem('gameState', JSON.stringify(saveData));
        },
        
        load() {
            const saveData = JSON.parse(localStorage.getItem('gameState'));
            if (saveData) {
                game.playerX = saveData.playerX;
                game.reputation = saveData.reputation;
                game.mode = saveData.mode;
                return true;
            }
            return false;
        }
    };

    

    // Sistema de partículas
    class ParticleSystem {
        constructor() {
            this.particles = [];
        }

        createParticle(x, y, type) {
            const particle = document.createElement('div');
            particle.className = `particle ${type}`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }

        update() {
            // Atualizar posições das partículas
        }
    }
});


class NPCManager {
    constructor() {
        this.npcs = [
            {
                id: 'merchant',
                x: 300,
                type: 'Mercador',
                sprite: 'img/bonecoNPCTeste.png',
                dialogs: {
                    default: {
                        text: "Olá viajante! Tenho ótimas mercadorias para vender. Está interessado?",
                        choices: [
                            { text: "Claro! Mostre-me o que tem (Amigável)", effect: 1 },
                            { text: "Seus preços são muito altos! (Hostil)", effect: -1 }
                        ]
                    },
                    highReputation: {
                        text: "Meu cliente favorito! Tenho itens especiais para você hoje.",
                        choices: [
                            { text: "Vamos ver essas ofertas especiais!", effect: 2 },
                            { text: "Talvez mais tarde.", effect: 0 }
                        ]
                    }
                }
            },
            // ... outros NPCs com estrutura similar
        ];
    }

    getNPCDialog(npcType, reputation) {
        const npc = this.npcs.find(n => n.type === npcType);
        if (!npc) return null;
        
        return reputation > 5 ? npc.dialogs.highReputation : npc.dialogs.default;
    }
}

// gameState.js
class GameState {
    constructor() {
        this.mode = null;
        this.position = 0;
        this.path = [];
        this.playerX = CONFIG.PLAYER.INITIAL_X;
        this.worldX = 0;
        this.reputation = 0;
        this.isDialogActive = false;
        this.currentNPC = null;
        this.isStarted = false;
        this.keys = {
            left: false,
            right: false
        };
    }

    updateReputation(value) {
        this.reputation = Math.max(CONFIG.REPUTATION.MIN, 
                         Math.min(CONFIG.REPUTATION.MAX, this.reputation + value));
    }
}
