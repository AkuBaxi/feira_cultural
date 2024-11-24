class ScreenManager {
    constructor() {
        this.initialized = false;
        this.screens = {
            loading: document.getElementById('loading-screen'),
            start: document.getElementById('start-screen'),
            options: document.getElementById('options-menu'),
            modeSelection: document.getElementById('mode-selection'),
            gameInterface: document.getElementById('game-interface')
        };
        
        // Verificar se todas as telas foram encontradas
        const missingScreens = Object.entries(this.screens)
            .filter(([key, element]) => !element)
            .map(([key]) => key);
            
        if (missingScreens.length > 0) {
            console.error('Missing screens:', missingScreens);
        }
        
        this.init();
    }

    async init() {
        if (this.initialized) {
            console.warn('ScreenManager já foi inicializado');
            return;
        }

        console.log('Inicializando ScreenManager');
        
        try {
            // Esconder todas as telas inicialmente
            Object.values(this.screens).forEach(screen => {
                if (screen) {
                    screen.style.display = 'none';
                }
            });
            
            // Mostrar tela de carregamento
            this.showScreen('loading');
            
            // Configurar event listeners
            this.setupEventListeners();
            
            // Inicializar sistemas do jogo
            await this.initializeGameSystems();
            
            // Marcar como inicializado
            this.initialized = true;
            
            // Mostrar tela inicial
            this.showScreen('start');
            
            console.log('ScreenManager inicializado com sucesso');
            
        } catch (error) {
            console.error('Erro ao inicializar ScreenManager:', error);
            this.handleError(error);
        }
    }

    handleError(error) {
        console.error('Erro crítico:', error);
        const errorMessage = document.createElement('div');
        errorMessage.style.position = 'fixed';
        errorMessage.style.top = '50%';
        errorMessage.style.left = '50%';
        errorMessage.style.transform = 'translate(-50%, -50%)';
        errorMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        errorMessage.style.color = 'white';
        errorMessage.style.padding = '20px';
        errorMessage.style.borderRadius = '10px';
        errorMessage.style.zIndex = '9999';
        errorMessage.innerHTML = `
            <h2 style="margin-bottom: 10px">Erro ao carregar o jogo</h2>
            <p style="margin-bottom: 15px">Desculpe, ocorreu um erro ao carregar o jogo.</p>
            <button onclick="window.location.reload()" style="padding: 8px 16px; background: #4CAF50; border: none; border-radius: 4px; color: white; cursor: pointer;">
                Tentar Novamente
            </button>
        `;
        document.body.appendChild(errorMessage);
    }

    setupEventListeners() {
        console.log('Configurando event listeners');
        
        // Start button
        const startButton = document.querySelector('.box-menu button[data-action="start"]');
        if (startButton) {
            startButton.addEventListener('click', () => {
                console.log('Botão iniciar clicado');
                this.showScreen('modeSelection');
            });
        } else {
            console.warn('Botão iniciar não encontrado');
        }

        // Options button
        const optionsButton = document.querySelector('.box-menu button[data-action="options"]');
        if (optionsButton) {
            optionsButton.addEventListener('click', () => {
                console.log('Botão opções clicado');
                this.showScreen('options');
            });
        }

        // Close button in options menu
        const closeButton = document.querySelector('#options-menu .modal-content button');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                console.log('Botão fechar clicado');
                this.showScreen('start');
            });
        }

        // Mode selection buttons
        const normalModeBtn = document.querySelector('button[data-mode="normal"]');
        const simpleModeBtn = document.querySelector('button[data-mode="simple"]');
        
        if (normalModeBtn) {
            normalModeBtn.addEventListener('click', () => {
                console.log('Modo normal selecionado');
                window.game.mode = 'normal';
                this.showScreen('gameInterface');
                
                if (!this.gameNavigation) {
                    this.gameNavigation = new GameNavigation();
                }
            });
        }
        
        if (simpleModeBtn) {
            simpleModeBtn.addEventListener('click', () => {
                console.log('Modo simples selecionado');
                window.game.mode = 'simple';
                this.showScreen('simpleMode');
            });
        }
    }

    showScreen(screenName) {
        console.log('Mostrando tela:', screenName);
        
        // Esconder todas as telas
        Object.values(this.screens).forEach(screen => {
            if (screen) {
                screen.style.display = 'none';
            }
        });

        // Mostrar tela requisitada
        if (this.screens[screenName]) {
            this.screens[screenName].style.display = 'flex';
        } else {
            console.error('Tela não encontrada:', screenName);
        }
    }

    async loadGame() {
        try {
            console.log('Starting game load');
            
            // Show loading screen
            this.showScreen('loading');
            
            // Initialize game systems
            await this.initializeGameSystems();
            
            // Show start screen
            this.showScreen('start');
            
            console.log('Game loaded successfully');
            
        } catch (error) {
            console.error('Error loading game:', error);
            // Mostrar mensagem de erro mais amigável
            const errorMessage = document.createElement('div');
            errorMessage.style.position = 'fixed';
            errorMessage.style.top = '50%';
            errorMessage.style.left = '50%';
            errorMessage.style.transform = 'translate(-50%, -50%)';
            errorMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            errorMessage.style.color = 'white';
            errorMessage.style.padding = '20px';
            errorMessage.style.borderRadius = '10px';
            errorMessage.style.zIndex = '9999';
            errorMessage.innerHTML = `
                <h2 style="margin-bottom: 10px">Erro ao carregar o jogo</h2>
                <p style="margin-bottom: 15px">Desculpe, ocorreu um erro ao carregar o jogo.</p>
                <button onclick="window.location.reload()" style="padding: 8px 16px; background: #4CAF50; border: none; border-radius: 4px; color: white; cursor: pointer;">
                    Tentar Novamente
                </button>
            `;
            document.body.appendChild(errorMessage);
        }
    }

    async initializeGameSystems() {
        console.log('Initializing game systems');
        
        try {
            // Initialize audio system with error handling
            if (window.audioManager) {
                try {
                    await window.audioManager.init();
                    console.log('Audio system initialized');
                } catch (error) {
                    console.warn('Audio system initialization failed:', error);
                    // Continue without audio
                }
            }
            
            // Initialize particle system
            try {
                window.particleSystem = new ParticleSystem();
                console.log('Particle system initialized');
            } catch (error) {
                console.warn('Particle system initialization failed:', error);
                // Continue without particles
            }
            
            // Simular carregamento de recursos
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return true;
        } catch (error) {
            console.error('Error in initializeGameSystems:', error);
            throw error;
        }
    }
}

// Atualização do AudioManager para ser mais robusto
const audioManager = {
    sounds: {},
    music: null,

    async init() {
        try {
            // Verificar se o áudio está disponível
            if (!window.Audio) {
                throw new Error('Audio not supported');
            }

            // Carregar sons com tratamento de erro para cada um
            const soundsToLoad = {
                walk: 'path/to/walk.mp3',
                interact: 'path/to/interact.mp3'
            };

            for (const [name, path] of Object.entries(soundsToLoad)) {
                try {
                    this.sounds[name] = new Audio(path);
                    await new Promise((resolve, reject) => {
                        this.sounds[name].addEventListener('canplaythrough', resolve);
                        this.sounds[name].addEventListener('error', reject);
                        // Timeout para evitar espera infinita
                        setTimeout(reject, 5000);
                    });
                } catch (error) {
                    console.warn(`Failed to load sound: ${name}`, error);
                    // Continue sem este som específico
                }
            }

            // Carregar música de fundo
            try {
                this.music = new Audio('path/to/background.mp3');
                this.music.loop = true;
            } catch (error) {
                console.warn('Failed to load background music:', error);
                // Continue sem música
            }
        } catch (error) {
            console.warn('Audio system initialization failed:', error);
            // Continue sem áudio
        }
    },

    playSound(name) {
        if (this.sounds[name]) {
            try {
                this.sounds[name].currentTime = 0;
                this.sounds[name].play().catch(error => {
                    console.warn(`Failed to play sound: ${name}`, error);
                });
            } catch (error) {
                console.warn(`Error playing sound: ${name}`, error);
            }
        }
    },

    startMusic() {
        if (this.music) {
            try {
                this.music.play().catch(error => {
                    console.warn('Failed to play background music:', error);
                });
            } catch (error) {
                console.warn('Error starting background music:', error);
            }
        }
    }
};

// Inicialização principal
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    try {
        window.game = new GameState();
        window.npcManager = new NPCManager();
        window.animations = new AnimationManager(document.getElementById('player'));
        window.audioManager = audioManager;
        window.screenManager = new ScreenManager();
        
        console.log('Game systems created successfully');
    } catch (error) {
        console.error('Error during game initialization:', error);
    }
});