# Jogo Narrativo de Inteligência Artificial
# X-IA

## 🤖 Contexto de Inteligência Artificial

Este projeto é uma demonstração prática de conceitos de Inteligência Artificial (IA), focando especificamente em:

### 🧠 Aprendizado e Tomada de Decisões

O jogo simula um ambiente de aprendizado onde:
- Cada interação do jogador representa um "exemplo de treinamento"
- O sistema de reputação modela um mecanismo básico de aprendizado por reforço
- As escolhas do jogador criam um "dataset" de comportamentos e consequências

### 🔍 Simulação de Decisões Éticas

O sistema de reputação e status do jogador (Herói/Neutro/Vilão) demonstra como:
- Algoritmos de IA podem aprender padrões éticos
- Decisões podem ser avaliadas e classificadas
- Consequências de escolhas podem ser modeladas computacionalmente

### 📊 Elementos de Aprendizado de Máquina Simulados

- **Reputação como Função de Custo**: A pontuação de reputação atua como uma métrica de "sucesso" das decisões
- **Classificação Automática**: Transformação de pontuações em categorias (Herói/Neutro/Vilão)
- **Registro de Experiências**: Salvamento de escolhas e estados para análise posterior

### 🌐 Narrativa Adaptativa

O jogo explora como sistemas de IA podem:
- Criar narrativas dinâmicas
- Responder a diferentes entradas do usuário
- Gerar experiências únicas baseadas em interações anteriores

## 🔬 Conceitos de IA Demonstrados

1. **Aprendizado por Reforço**: 
   - Cada escolha tem uma pontuação de impacto
   - O sistema "aprende" ao registrar consequências das ações

2. **Tomada de Decisão Automatizada**:
   - NPCs respondem com base em um conjunto de regras predefinidas
   - Geração de diálogos e escolhas contextuais

3. **Persistência e Memória**:
   - Sistema de saves simula como IAs podem "lembrar" e "aprender" de experiências passadas

## 🎓 Objetivo Educacional

Demonstrar de forma interativa e acessível:
- Como sistemas de IA tomam decisões
- Os fundamentos de aprendizado de máquina
- A complexidade ética na tomada de decisões automatizadas

## ⚠️ Limitações Pedagógicas

É importante compreender que este é um modelo **simplificado**:
- Representa conceitos básicos de IA
- Não reflete a complexidade de sistemas de IA avançados
- Serve como uma introdução didática ao tema

## 🚀 Para Educadores e Estudantes

Este projeto pode ser usado para:
- Introduzir conceitos de IA
- Discutir ética em sistemas automatizados
- Demonstrar princípios básicos de aprendizado de máquina

## 📖 Descrição do Projeto

Este é um jogo narrativo interativo desenvolvido com HTML, CSS e JavaScript, oferecendo uma experiência de aventura onde as escolhas do jogador impactam diretamente a narrativa e a reputação.

## 🎮 Funcionalidades Principais

- **Sistema de Navegação**: Menu principal com opções de iniciar jornada, carregar jogo e configurações
- **Modos de Jogo**: 
  - Modo Normal: Jogabilidade completa com controles livres
  - Modo Simplificado: Navegação direcionada com foco na história
- **Sistema de Reputação**: Tracking das decisões do jogador
- **Salvamento de Progresso**: Permite salvar e carregar jogos
- **Acessibilidade**: Modo daltônico com diferentes esquemas de cores

## 🕹️ Controles

- **Movimento**:
  - `A` / `←`: Mover para esquerda
  - `D` / `→`: Mover para direita
  - `W` / `↑` / `Espaço`: Pular
  - `E` / `Enter`: Interagir com NPCs
  - `Esc`: Pausar o jogo

## 📁 Estrutura do Projeto

```
projeto/
│
├── index.html         # Página inicial e menu principal
├── fase1.html         # Primeira fase do jogo
├── script.js          # Lógica de navegação e menu
├── game1.js           # Mecânicas do jogo e sistema de interação
└── save-manager.js    # Gerenciamento de saves
```

## 🔧 Tecnologias Utilizadas

- HTML5
- JavaScript (Vanilla)
- SessionStorage para persistência de dados
- Sistema de gerenciamento de saves customizado

## 💾 Sistema de Save

- Salva o estado do jogo, incluindo:
  - Reputação
  - Status do jogador
  - Fase atual
  - Escolhas narrativas
- Limite de 5 saves
- Possibilidade de carregar e excluir saves

## 🌈 Acessibilidade

Suporta modos de cor para diferentes tipos de daltonismo:
- Normal
- Protanopia
- Deuteranopia
- Tritanopia

## 📊 Sistema de Reputação

Suas escolhas afetam sua reputação:
- Reputação positiva: Torna-se um Herói
- Reputação negativa: Torna-se um Vilão
- Neutro: Equilíbrio entre escolhas

## 🏆 Conquistas

- Primeiro Contato: Interagir com o primeiro NPC
- Diplomata: Interagir com todos os NPCs
- Explorador: Visitar todas as estruturas

## 🚀 Como Iniciar

1. Clone o repositório
2. Abra `index.html` em um navegador moderno
3. Explore o jogo!

## 🛠️ Requisitos

- Navegador moderno com suporte a JavaScript
- Resolução mínima: 1024x768

## 📝 Notas de Desenvolvimento

- Projeto em desenvolvimento
- Fase 1 totalmente implementada
- Próximas fases em construção

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de enviar pull requests.

## 📄 Licença

[Inserir informações de licença]