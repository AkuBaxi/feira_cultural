const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definir o tamanho do canvas
canvas.width = 800;
canvas.height = 600;

// Variáveis do jogo
let player = {
  x: 100,
  y: 100,
  width: 50,
  height: 50,
  speed: 5
};

let npc = {
  x: 500,
  y: 100,
  width: 50,
  height: 50
};

let reputation = 0;  // 1 - Boa, 0 - Neutra, -1 - Ruim
let inConversation = false;

// Função para desenhar o jogador
function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Função para desenhar o NPC
function drawNpc() {
  ctx.fillStyle = 'green';
  ctx.fillRect(npc.x, npc.y, npc.width, npc.height);
}

// Função para desenhar o estado do diálogo
function drawDialog(text) {
  const dialogBox = document.getElementById('dialogBox');
  dialogBox.textContent = text;
}

// Função para atualizar a reputação na tela
function updateReputation() {
  const reputationElement = document.getElementById('reputationValue');
  if (reputation > 0) {
    reputationElement.textContent = 'Boa';
  } else if (reputation < 0) {
    reputationElement.textContent = 'Ruim';
  } else {
    reputationElement.textContent = 'Neutra';
  }
}

// Função de movimento do jogador
function movePlayer() {
  if (inConversation) return;  // Impede o movimento durante a conversa

  if (keys['ArrowUp']) player.y -= player.speed;
  if (keys['ArrowDown']) player.y += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;
}

// Função para iniciar uma conversa
function startConversation() {
  inConversation = true;
  drawDialog('Oi! Escolha uma resposta:\n1. "Oi, tudo bem?"\n2. "O que você quer?"');
}

// Função para finalizar a conversa
function endConversation() {
  inConversation = false;
  drawDialog('');
  updateReputation();
}

// Função para escolher uma resposta
function handleChoice(choice) {
  if (choice === 1) {
    reputation += 1;
    drawDialog('Você respondeu de forma amigável!');
  } else if (choice === 2) {
    reputation -= 1;
    drawDialog('Você respondeu de forma rude!');
  }
  setTimeout(endConversation, 2000);  // Finaliza a conversa após 2 segundos
}

// Eventos de teclado
let keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  if (e.key === 'Enter' && !inConversation && player.x + player.width >= npc.x && player.x <= npc.x + npc.width && player.y + player.height >= npc.y && player.y <= npc.y + npc.height) {
    startConversation();
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Função de atualização do jogo
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpa o canvas

  movePlayer();
  drawPlayer();
  drawNpc();

  if (inConversation) {
    // Se estiver em conversa, aguarda uma escolha do jogador
    document.addEventListener('keydown', (e) => {
      if (e.key === '1') handleChoice(1);
      if (e.key === '2') handleChoice(2);
    });
  }

  updateReputation();

  requestAnimationFrame(update);  // Chama a próxima atualização do jogo
}

update();  // Inicia o loop do jogo
