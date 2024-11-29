// Variável global para persistência dos saves entre páginas
const SAVES_KEY = 'GAME_SAVES';

// Inicializar saves do sessionStorage
if (!sessionStorage.getItem(SAVES_KEY)) {
    sessionStorage.setItem(SAVES_KEY, JSON.stringify([]));
}




// Em save-manager.js, adicione um método para filtrar saves por fase

    






const GameSaveManager = {

    filterSavesByPhase(phase) {
        return this.saveStates.filter(save => save.phase === phase);
    },



    
    get saveStates() {
        return JSON.parse(sessionStorage.getItem(SAVES_KEY) || '[]');
    },

    set saveStates(saves) {
        sessionStorage.setItem(SAVES_KEY, JSON.stringify(saves));
    },

    saveProgress(gameData) {
        try {
            const newSave = {
                id: Date.now(),
                timestamp: new Date().toLocaleString(),
                reputation: gameData.reputation || 0,
                status: gameData.status || 'Neutro',
                phase: gameData.phase || 1,
                narrativeChoices: gameData.narrativeChoices || [],
                gameState: {
                    ...gameData.gameState,
                    phase: gameData.phase 
                }
            };

            console.log('Criando novo save:', newSave); // Debug

            let currentSaves = this.saveStates;

            currentSaves = currentSaves.filter(save => save.phase !== gameData.phase);
            
            currentSaves.unshift(newSave);
            if (currentSaves.length > 5) {
                currentSaves = currentSaves.slice(0, 5);
            }

            this.saveStates = currentSaves;
            return newSave;
    
    
        } catch (error) {
            console.error('Erro ao salvar o jogo:', error);
            return null;
        }
    },

    getSaves() {
        return this.saveStates;
    },

    loadSave(saveId) {
        const saves = this.saveStates;
        return saves.find(s => s.id === saveId) || null;
    },

    deleteSave(saveId) {
        let currentSaves = this.saveStates;
        currentSaves = currentSaves.filter(s => s.id !== saveId);
        this.saveStates = currentSaves;
        this.renderSavedGames();
    },

    renderSavedGames() {
        const savesContainer = document.getElementById('saves-container');
        
        console.log('Renderizando saves. Container:', savesContainer); // Debug
        console.log('Saves disponíveis:', this.saveStates); // Debug

        if (!savesContainer) {
            console.error('Container de saves não encontrado');
            return;
        }

        savesContainer.innerHTML = '';

        if (this.saveStates.length === 0) {
            savesContainer.innerHTML = `
                <div class="no-saves">
                    <p>Nenhum jogo salvo encontrado</p>
                </div>
            `;
            return;
        }

        this.saveStates.forEach(save => {
            const saveElement = document.createElement('div');
            saveElement.classList.add('saved-game');
            saveElement.innerHTML = `
                <div class="save-info">
                    <p class="save-timestamp">Salvo em: ${save.timestamp}</p>
                    <div class="save-details">
                        <p>Fase ${save.phase}</p>
                        <p>Reputação: ${save.reputation}</p>
                        <p>Status: ${save.status}</p>
                    </div>
                </div>
                <div class="save-actions">
                    <button class="load-btn" onclick="GameSaveManager.loadSelectedSave(${save.id})">
                        Carregar Jogo
                    </button>
                    <button class="delete-btn" onclick="GameSaveManager.deleteSave(${save.id})">
                        Excluir Save
                    </button>
                </div>
            `;
            savesContainer.appendChild(saveElement);
        });
    },

    loadSelectedSave(saveId) {
        const save = this.loadSave(saveId);
        if (save && save.gameState) {
            // Use o número da fase do save para redirecionar para a fase correta
            sessionStorage.setItem('selectedSave', JSON.stringify(save));
            window.location.href = `fase${save.phase}.html?loadSave=true`;
        } else {
            console.error('Save não encontrado ou inválido');
            alert('Erro ao carregar o save. Tente novamente.');
        }
    }

};

// Expor o GameSaveManager globalmente
window.GameSaveManager = GameSaveManager;

// Debug inicial
console.log('SaveManager inicializado. Saves disponíveis:', GameSaveManager.getSaves());