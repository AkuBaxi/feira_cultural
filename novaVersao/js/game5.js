// Função para a transição de fade-out (tela preta desaparecendo)
function fadeOut() {
    const fadeElement = document.getElementById('screen-fade');
    fadeElement.style.opacity = '0'; // Inicia o fade-out
    setTimeout(() => {
        fadeElement.style.display = 'none'; // Remove o fade após a transição
    }, 5000); // O tempo do fade-out é de 2 segundos
}

// Função para inicializar o jogo e fazer o fade-in
window.onload = () => {
    // Inicia a tela preta
    fadeOut();

    // Agora inicia o conteúdo do jogo após o fade
    setTimeout(() => {
        // Aqui você pode iniciar o seu loop de jogo, o mundo, o jogador, etc.
        createWorldElements(); // Exemplo para adicionar os NPCs e estruturas
        gameLoopId = requestAnimationFrame(gameLoop); // Inicia o loop do jogo
    }, 5000); // Espera o tempo do fade antes de começar o jogo
};

// Lista de dicas para o jogador
const tips = [
    "Use as setas ou as teclas WASD para se mover pelo mapa.",
    "Pressione 'E' ou 'Enter' para interagir com NPCs próximos.",
    "Cuide de sua reputação, pois ela afeta o final do jogo!",
    "Visite todas as estruturas para desbloquear conquistas.",
    "Use a tecla 'Esc' para pausar o jogo e acessar o menu."
];

// Variáveis para o sistema de dicas
let currentTipIndex = 0;
const tipTextElement = document.getElementById('tip-text');

// Função para atualizar as dicas no bloco
function updateTip() {
    tipTextElement.textContent = tips[currentTipIndex];
    currentTipIndex = (currentTipIndex + 1) % tips.length; // Passa para a próxima dica
}

// Configura o sistema de slides
setInterval(updateTip, 5000); // Muda a dica a cada 5 segundos

const player = document.getElementById('player');
const dialogBox = document.getElementById('dialog-box');
const dialogText = document.getElementById('dialog-text');
const choiceContainer = document.getElementById('choice-container');
const reputationIndicator = document.getElementById('reputation-indicator');
const gameWorld = document.getElementById('game-world');
const viewport = document.getElementById('viewport');
const gameContainer = document.getElementById('game-container5');
const endReport = document.getElementById('end-report');
const finalReputationEl = document.getElementById('final-reputation');
const finalStatusEl = document.getElementById('final-status');
const pauseMenu = document.getElementById('pause-menu');

// Estados do jogo
let playerX = 100;
let worldX = 0;
let reputation = 0;
let isDialogActive = false;
let currentNPC = null;
let playerSpeed = 5;
let isJumping = false;
let isGrounded = true;
let jumpHeight = 100;
let isPaused = false;
let gameLoopId;

// Constantes
const maxJumpHeight = 300;
const jumpSpeed = 20;
const fallSpeed = 15;

// NPCs do jogo
const npcs = [
    {
        id: 'merchant',
        x: 300,
        type: 'Mercador',
        sprite: '../img/bonecoNPCTeste.png',
        interacted: false
    },
    {
        id: 'Villager',
        x: 800,
        type: 'Aldeão',
        sprite: '../img/bonecoNPCTeste.png',
        interacted: false
    },
    {
        id: 'blacksmith',
        x: 1500,
        type: 'Ferreiro',
        sprite: '../img/bonecoFerreiro.png',
        interacted: false
    }
];
// Estruturas do mundo


// Sistema de diálogo
function getNPCDialog(npcType) {
    const dialogues = {
        'Mercador': {
            text: "Olá, viajante! Deseja comprar algo?",
            choices: [
                { text: "Sim, quero ver suas mercadorias", effect: 1 },
                { text: "Não, obrigado", effect: -1 }
            ]
        },
        'Aldeão': {
            text: "Nossa vila precisa de ajuda. Você pode nos ajudar?",
            choices: [
                { text: "Claro, conte comigo!", effect: 2 },
                { text: "Desculpe, não tenho tempo", effect: -1 }
            ]
        },
        'Mago': {
            text: "Os segredos da magia são profundos. O que busca?",
            choices: [
                { text: "Quero aprender magia", effect: 1 },
                { text: "Só estava passando", effect: 0 }
            ]
        }
    };

    return new Promise((resolve) => {
        resolve(dialogues[npcType] || {
            text: "...",
            choices: [{ text: "Ok", effect: 0 }]
        });
    });
}

// Criação dos elementos do mundo
function createWorldElements() {
    npcs.forEach(npc => {
        const npcElement = document.createElement('div');
        npcElement.className = 'npc';
        npcElement.style.left = `${npc.x}px`;
        npcElement.style.backgroundImage = `url('${npc.sprite}')`;
        npcElement.id = npc.id;
        gameWorld.appendChild(npcElement);
    });

    
}

// Sistema de movimento
function startJump() {
    if (!isGrounded) return;

    isJumping = true;
    isGrounded = false;
    jumpHeight = 100;

    const jumpInterval = setInterval(() => {
        if (jumpHeight < maxJumpHeight && isJumping) {
            jumpHeight += jumpSpeed;
            player.style.bottom = `${jumpHeight}px`;
        } else {
            isJumping = false;
            fallDown();
            clearInterval(jumpInterval);
        }
    }, 20);
}

function fallDown() {
    const fallInterval = setInterval(() => {
        if (jumpHeight > 100) {
            jumpHeight -= fallSpeed;
            player.style.bottom = `${Math.max(jumpHeight, 100)}px`;
        } else {
            jumpHeight = 100;
            player.style.bottom = '100px';
            isGrounded = true;
            clearInterval(fallInterval);
        }
    }, 20);
}

// Controles
let keys = {
    left: false,
    right: false,
    top: false
};

document.addEventListener('keydown', (e) => {
    if (isDialogActive || isPaused) return;

    if (e.key === 'a' || e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'd' || e.key === 'ArrowRight') keys.right = true;
    if ((e.key === 'w' || e.key === 'ArrowUp' || e.key === ' ') && isGrounded) {
        startJump();
    }
    if (e.key === 'e' || e.key === 'Enter') checkInteraction();
    if (e.key === 'Escape') togglePauseMenu();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'd' || e.key === 'ArrowRight') keys.right = false;
});

// Game Loop
function gameLoop() {
    if (!isDialogActive && !isPaused) {
        if (keys.left) {
            playerX = Math.max(50, playerX - playerSpeed);
            player.classList.remove('flip');
        }
        if (keys.right) {
            playerX = Math.min(2350, playerX + playerSpeed);
            player.classList.add('flip');
        }

        player.style.left = `${playerX}px`;

        const viewportWidth = viewport.clientWidth;
        const halfViewport = viewportWidth / 2;

        if (playerX > halfViewport && playerX < 2400 - halfViewport) {
            worldX = -1 * (playerX - halfViewport);
            gameWorld.style.left = `${worldX}px`;
            gameContainer.style.backgroundPosition = `${worldX * 0.5}px 0`;
        }

        
    }
    gameLoopId = requestAnimationFrame(gameLoop);
}

// Sistema de Interação
async function checkInteraction() {
    for (const npc of npcs) {
        const npcElement = document.getElementById(npc.id);
        const npcRect = npcElement.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        
        if (Math.abs(npcRect.left - playerRect.left) < 200 && !npc.interacted) {
            currentNPC = npc;
            const dialog = await getNPCDialog(npc.type);
            showDialog(dialog);
            return;
        }
    }
}

function showDialog(dialog) {
    isDialogActive = true;
    dialogBox.style.display = 'block';
    dialogText.textContent = dialog.text;
    
    choiceContainer.innerHTML = '';
    dialog.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('choice-button');
        button.onclick = () => handleChoice(choice, dialog);
        choiceContainer.appendChild(button);
    });
}

function handleChoice(choice, dialog) {
    if (currentNPC) {
        currentNPC.interacted = true;
    }

    reputation += choice.effect;
    updateReputationBar();
    
    isDialogActive = false;
    dialogBox.style.display = 'none';

    const allInteracted = npcs.every(npc => npc.interacted);
    if (allInteracted) {
        showEndGameReport();
    }

    currentNPC = null;
}

// Menu de Pausa e Sistema de Save
function togglePauseMenu() {
    isPaused = !isPaused;
    pauseMenu.style.display = isPaused ? 'flex' : 'none';
    
    if (isPaused) {
        cancelAnimationFrame(gameLoopId);
    } else {
        gameLoopId = requestAnimationFrame(gameLoop);
    }
}

function resumeGame() {
    isPaused = false;
    pauseMenu.style.display = 'none';
    gameLoopId = requestAnimationFrame(gameLoop);
}

function saveCurrentGameState() {
    try {
        if (!window.GameSaveManager) {
            throw new Error('Sistema de save não encontrado');
        }

        const gameState = {
            playerX: playerX,
            worldX: worldX,
            reputation: reputation,
            npcs: npcs.map(npc => ({
                id: npc.id,
                interacted: npc.interacted,
                type: npc.type
            })),
           
        };

        const saveData = {
            reputation: reputation,
            status: getPlayerStatus(reputation),
            phase: 4,
            narrativeChoices: npcs.map(npc => ({
                npcType: npc.type,
                interacted: npc.interacted
            })),
            gameState: gameState
        };

        console.log('Tentando salvar:', saveData); // Debug
        const save = window.GameSaveManager.saveProgress(saveData);
        
        if (save) {
            console.log('Save criado:', save); // Debug
            alert('✅ Jogo salvo com sucesso!');
        } else {
            throw new Error('Falha ao criar save');
        }
        togglePauseMenu();
    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert('❌ Erro ao salvar o jogo: ' + error.message);
    }
}

function showOptions() {
    alert('Menu de opções em desenvolvimento');
}

function backToMenu() {
    window.location.href = '../index.html';
}

// Sistema de Reputação e Status
function updateReputationBar() {
    const maxReputation = 10;
    const percent = ((reputation + maxReputation) / (2 * maxReputation)) * 100;
    reputationIndicator.style.width = `${percent}%`;
}

function getPlayerStatus(reputation) {
    if (reputation >= 4) return 'Herói';
    if (reputation <= -4) return 'Vilão';
    return 'Neutro';
}

function getEndGameMessage(status) {
    const messages = {
        'Herói': 'Suas escolhas nobres ajudaram muitas pessoas. Você é um verdadeiro herói!',
        'Vilão': 'Suas decisões causaram impacto negativo na comunidade. Sua reputação o precede.',
        'Neutro': 'Você manteve um caminho equilibrado, sem extremos em suas escolhas.'
    };
    return messages[status];
}

function calculateAchievements() {
    return [
        {
            name: 'Primeiro Contato',
            description: 'Interagir com o primeiro NPC',
            unlocked: npcs.some(npc => npc.interacted)
        },
        {
            name: 'Diplomata',
            description: 'Interagir com todos os NPCs',
            unlocked: npcs.every(npc => npc.interacted)
        }
        
    ];
}

function showEndGameReport() {
    const status = getPlayerStatus(reputation);
    const message = getEndGameMessage(status);
    const achievements = calculateAchievements();

    const choicesReport = document.getElementById('choices-report');
    choicesReport.innerHTML = `
        <h2>Relatório Final</h2>
        <div class="status-section">
            <p id="final-reputation">Reputação Final: ${reputation}</p>
            <p id="final-status">Status: ${status}</p>
            <p class="status-message">${message}</p>
        </div>

        <div class="interactions-section">
            <h3>Interações com NPCs:</h3>
            <ul>
                ${npcs.map(npc => `
                    <li class="${npc.interacted ? 'completed' : 'missed'}">
                        ${npc.type}: ${npc.interacted ? '✓ Completado' : '✗ Não interagido'}
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="achievements-section">
            <h3>Conquistas:</h3>
            <ul>
                ${achievements.map(achievement => `
                    <li class="${achievement.unlocked ? 'unlocked' : 'locked'}">
                        ${achievement.unlocked ? '🏆' : '🔒'} ${achievement.name}
                        <p>${achievement.description}</p>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    const endReport = document.getElementById('end-report');
  endReport.style.display = 'flex';
}

function restartGame() {
    npcs.forEach(npc => {
        npc.interacted = false;
    });
    

    playerX = 100;
    worldX = 0;
    reputation = 0;
    isDialogActive = false;
    currentNPC = null;
    isPaused = false;

    updateReputationBar();
    gameWorld.style.left = '0px';
    player.style.left = '100px';
    endReport.style.display = 'none';
    
    gameLoopId = requestAnimationFrame(gameLoop);
}

// Inicialização e carregamento
document.addEventListener('DOMContentLoaded', () => {
    console.log('GameSaveManager disponível:', !!window.GameSaveManager);
    if (!window.GameSaveManager) {
        console.error('GameSaveManager não encontrado!');
    }

    createWorldElements();
    gameLoopId = requestAnimationFrame(gameLoop);

    // Verificar se há um save para carregar
    if (window.location.search.includes('loadSave=true')) {
        const savedGame = JSON.parse(sessionStorage.getItem('selectedSave'));
        if (savedGame && savedGame.gameState) {
            const state = savedGame.gameState;
            
            playerX = state.playerX;
            worldX = state.worldX;
            reputation = state.reputation;
            
            state.npcs.forEach(savedNpc => {
                const npc = npcs.find(n => n.id === savedNpc.id);
                if (npc) {
                    npc.interacted = savedNpc.interacted;
                }
            });
            
            updateReputationBar();
            player.style.left = `${playerX}px`;
            gameWorld.style.left = `${worldX}px`;
            
            sessionStorage.removeItem('selectedSave');
        }
    }
});