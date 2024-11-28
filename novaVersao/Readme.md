# Jogo de Aventura Interativo

Este projeto implementa um jogo de aventura simples em 2D, onde o jogador pode interagir com NPCs, explorar um mundo virtual e tomar decisões que impactam sua reputação e o andamento do jogo. O jogo inclui elementos como movimento do personagem, saltos, interação com NPCs, escolha de diálogos e a possibilidade de salvar o progresso.

## Funcionalidades

- **Movimento do Jogador**: O jogador pode se mover para a esquerda e direita usando as teclas `A` e `D` ou as setas do teclado.
- **Salto**: O jogador pode pular com a tecla `W`, `Seta para cima` ou `Espaço`.
- **Interação com NPCs**: O jogador pode interagir com NPCs próximos ao pressionar `E` ou `Enter`. Cada NPC possui uma série de diálogos com escolhas que afetam a reputação do jogador.
- **Reputação**: As escolhas feitas pelo jogador durante as interações com os NPCs alteram sua reputação, que é representada por uma barra de reputação visível na interface.
- **Pausa e Salvamento**: O jogador pode pausar o jogo e salvar seu progresso. O jogo também suporta o carregamento de um estado salvo.
- **Relatório Final**: Ao completar as interações com todos os NPCs, o jogador recebe um relatório final que exibe sua reputação, status (Herói, Vilão ou Neutro), e as conquistas obtidas.

## Como Jogar

### Controles

- **Mover para a esquerda**: `A` ou `Seta para a esquerda`
- **Mover para a direita**: `D` ou `Seta para a direita`
- **Saltar**: `W`, `Seta para cima` ou `Espaço`
- **Interagir com NPC**: `E` ou `Enter`
- **Pausar o jogo**: `Esc`
- **Salvar progresso**: A opção de salvar está disponível no menu de pausa.

### Reputação

Durante o jogo, suas escolhas de diálogo com os NPCs afetam sua **reputação**. O sistema de reputação segue três possíveis estados:

- **Herói**: Você tem uma reputação positiva.
- **Vilão**: Você tem uma reputação negativa.
- **Neutro**: Você não se destacou em nenhuma das direções.

### NPCs e Estruturas

O mundo do jogo é composto por **NPCs** com os quais o jogador pode interagir. Cada NPC oferece escolhas que impactam a reputação do jogador. As interações com NPCs incluem:

- **Mercador**: Oferece a opção de comprar mercadorias.
- **Aldeão**: Solicita ajuda para a vila.
- **Mago**: Oferece o aprendizado de magia.

Além disso, existem **estruturas** no mundo, como casas, torres e tavernas, que podem ser exploradas, e cada estrutura visitada também afeta o progresso do jogo.

### Fim do Jogo

O jogo termina quando o jogador interage com todos os NPCs disponíveis. O relatório final é exibido com as estatísticas do jogo, incluindo:

- **Reputação Final**: O valor total da reputação do jogador.
- **Status**: Herói, Vilão ou Neutro, dependendo da reputação.
- **Interações com NPCs**: Um resumo de quais NPCs foram interagidos.
- **Conquistas**: Conquistas obtidas pelo jogador durante a aventura, como interagir com todos os NPCs ou visitar todas as estruturas.

## Arquitetura

### Componentes do Jogo

- **Elementos do DOM**: São os componentes visuais, como o jogador, NPCs, caixa de diálogo, barra de reputação, e o mundo do jogo.
- **Estados do Jogo**: Variáveis que controlam o estado atual do jogo, como a posição do jogador, reputação, se o jogo está pausado, e o NPC atual.
- **NPCs**: Personagens não jogáveis que possuem diálogos e interações com o jogador. Cada NPC tem um tipo (ex: Mercador, Aldeão, Mago) e pode afetar a reputação do jogador.
- **Estruturas**: Elementos fixos no mundo do jogo, como casas e torres, que o jogador pode explorar.
- **Diálogos**: O sistema de diálogo permite que o jogador escolha opções durante as interações com os NPCs, influenciando o desenrolar da história.
- **Controle de Movimento**: O jogador pode se mover e pular no mundo utilizando as teclas correspondentes, com a física do salto e queda.

### Game Loop

A lógica de jogo é atualizada em um **game loop** que é executado continuamente utilizando o método `requestAnimationFrame`. Este loop é responsável por:

- Atualizar a posição do jogador com base nas entradas do teclado.
- Mover o mundo para seguir o jogador.
- Verificar colisões e interações com NPCs e estruturas.

## Como Executar

1. Clone o repositório ou baixe os arquivos do projeto.
2. Abra o arquivo `index.html` em um navegador para iniciar o jogo.

### Dependências

Este projeto não possui dependências externas, mas requer um navegador moderno com suporte a JavaScript.

## Contribuições

Sinta-se à vontade para contribuir para o projeto! Se você deseja adicionar novos recursos, corrigir bugs ou melhorar a documentação, crie um **pull request**.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

Se você encontrar algum erro ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma **issue** no repositório. Divirta-se jogando!
