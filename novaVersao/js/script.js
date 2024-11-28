// Configurações globais
const settings = {
    volume: 100,
    colorMode: 'normal'
};

// Funções de navegação entre menus
function switchMenu(hideId, showId) {
    const hideMenu = document.getElementById(hideId);
    const showMenu = document.getElementById(showId);
    
    if (hideMenu && showMenu) {
        hideMenu.classList.add('hidden');
        showMenu.classList.remove('hidden');
    }
}

// Funções principais do menu
function handleStartJourney() {
    switchMenu('mainMenu', 'gameModeMenu');
}

function selectNormalMode() {
    switchMenu('gameModeMenu', 'phasesMenu');
}

function backToGameMode() {
    switchMenu('phasesMenu', 'gameModeMenu');
}

function backToMainMenu() {
    const currentMenu = document.querySelector('.menu:not(.hidden)');
    if (currentMenu && currentMenu.id !== 'mainMenu') {
        switchMenu(currentMenu.id, 'mainMenu');
    }
}

// Sistema de carregamento de jogos
function openLoadGame() {
    switchMenu('mainMenu', 'loadGameMenu');
    console.log('GameSaveManager disponível:', !!window.GameSaveManager); // Debug
    
    if (window.GameSaveManager) {
        const saves = GameSaveManager.getSaves();
        console.log('Saves encontrados:', saves); // Debug
        
        const savesContainer = document.getElementById('saves-container');
        if (!savesContainer) {
            console.error('Container de saves não encontrado');
            return;
        }

        if (saves && saves.length > 0) {
            GameSaveManager.renderSavedGames();
        } else {
            savesContainer.innerHTML = '<p class="no-saves">Nenhum jogo salvo encontrado.</p>';
        }
    } else {
        console.error('GameSaveManager não está disponível');
        alert('Erro: Sistema de saves não encontrado');
    }
}

// Configurações
function openSettings() {
    switchMenu('mainMenu', 'settingsMenu');
}

function updateVolume(value) {
    settings.volume = value;
    document.getElementById('volumeValue').textContent = value;
}

function updateColorMode(mode) {
    settings.colorMode = mode;
    applyColorMode(mode);
}

function applyColorMode(mode) {
    const root = document.documentElement;
    switch(mode) {
        case 'protanopia':
            root.style.setProperty('--primary-green', '#B8AF4E');
            root.style.setProperty('--menu-bg', '#584E3C');
            break;
        case 'deuteranopia':
            root.style.setProperty('--primary-green', '#C2B04E');
            root.style.setProperty('--menu-bg', '#584E3C');
            break;
        case 'tritanopia':
            root.style.setProperty('--primary-green', '#9E8F4E');
            root.style.setProperty('--menu-bg', '#4A3E2E');
            break;
        default:
            root.style.setProperty('--primary-green', '#4CAF50');
            root.style.setProperty('--menu-bg', '#4A2618');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando interface...'); // Debug

    // Inicializar GameSaveManager
    if (window.GameSaveManager) {
        console.log('GameSaveManager encontrado. Saves:', GameSaveManager.getSaves()); // Debug
    } else {
        console.error('GameSaveManager não encontrado!');
    }

    // Listeners dos modos de jogo
    const normalMode = document.querySelector('.game-mode');
    if (normalMode) {
        normalMode.addEventListener('click', selectNormalMode);
    }

    // Listeners das fases
    const phases = document.querySelectorAll('.phase');
    phases.forEach(phase => {
        phase.addEventListener('click', () => {
            const phaseNumber = parseInt(phase.getAttribute('data-phase'));
            selectPhase(phaseNumber);
        });
    });

    // Listeners dos modos de jogo para logging
    document.querySelectorAll('.game-mode').forEach(mode => {
        mode.addEventListener('click', () => {
            console.log('Modo selecionado:', mode.querySelector('h3').textContent.trim());
        });
    });

    // Listener para botão de configurações
    const settingsButton = document.querySelector('[onclick="openSettings()"]');
    if (settingsButton) {
        settingsButton.addEventListener('click', openSettings);
    }
});

// Seleção de fase
function selectPhase(phaseNumber) {
    console.log(`Selecionando fase ${phaseNumber}`); // Debug
    switch(phaseNumber) {
        case 1:
            window.location.href = './fase1.html';
            
            break;
        case 2:
            window.location.href = './fase2.html'; 
            break;
        case 3:
            window.location.href = './fase3.html'; 
            break;
        case 4:
            window.location.href = './fase4.html'; 
            break;
        case 5:
            window.location.href = './fase5.html'; 
            break;
            console.log(`Fase ${phaseNumber} selecionada - Indisponível`);
            break;
        default:
            console.error('Fase inválida:', phaseNumber);
    }
}

// Tecla ESC para voltar ao menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const pauseMenu = document.getElementById('pause-menu');
        if (pauseMenu && pauseMenu.style.display === 'flex') {
            return; // Não fazer nada se estiver no jogo e o menu de pausa estiver aberto
        }
        backToMainMenu();
    }
});

// Expor funções necessárias globalmente
window.handleStartJourney = handleStartJourney;
window.selectNormalMode = selectNormalMode;
window.backToGameMode = backToGameMode;
window.backToMainMenu = backToMainMenu;
window.openLoadGame = openLoadGame;
window.openSettings = openSettings;
window.updateVolume = updateVolume;
window.updateColorMode = updateColorMode;