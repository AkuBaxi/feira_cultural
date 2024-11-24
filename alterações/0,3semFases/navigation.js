// navigation.js
class NavigationManager {
    constructor() {
        this.screens = {
            loading: document.getElementById('loading-screen'),
            start: document.getElementById('start-screen'),
            modeSelection: document.getElementById('mode-selection'),
            gameScreen: document.getElementById('game-screen')
        };
    }

    showScreen(screenName) {
        // Esconde todas as telas
        for (let screen in this.screens) {
            this.screens[screen].classList.remove('active');
        }
        
        // Exibe a tela desejada
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
        }
    }

    // Exibe a tela de seleção de fase
    showModeSelection() {
        this.showScreen('modeSelection');
    }

    // Inicia o jogo
    startGame() {
        this.showScreen('gameScreen');
    }

    // Exibe a tela inicial
    showStartScreen() {
        this.showScreen('start');
    }

    // Exibe a tela de loading
    showLoading() {
        this.showScreen('loading');
    }
}

// Instanciando o objeto
const navigationManager = new NavigationManager();

// Exemplo de uso
document.getElementById('start-button').addEventListener('click', () => {
    navigationManager.showModeSelection();
});

document.getElementById('mode-selection-button').addEventListener('click', () => {
    navigationManager.startGame();
});
