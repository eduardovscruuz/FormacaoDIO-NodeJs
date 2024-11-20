const readline = require('readline');

const players = [
  { NOME: 'Mario', VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 },
  { NOME: 'Peach', VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0 },
  { NOME: 'Yoshi', VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3, PONTOS: 0 },
  { NOME: 'Bowser', VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
  { NOME: 'Luigi', VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0 },
  { NOME: 'Donkey Kong', VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Seleção de jogadores
async function selectPlayer() {
  return new Promise(resolve => {
    console.log('(1) 🛻 Mario\n(2) 👑 Peach\n(3) 🦖 Yoshi\n(4) 💀 Bowser\n(5) 🚜 Luigi\n(6) 🐵 Donkey Kong\n');

    rl.question('Escolha seu personagem (1-6): ', input => {
      const choice = parseInt(input);
      if (choice >= 1 && choice <= 6) {
        resolve(choice - 1);
      } else {
        console.log('Escolha inválida. Tente novamente.');
        resolve(selectPlayer());
      }
    });
  });
}

// Selecionar o segundo jogador
function selectRandomOpponent(excludeIndex) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * players.length);
  } while (randomIndex === excludeIndex);
  return randomIndex;
}
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = 'RETA';
      break;
    case random < 0.66:
      result = 'CURVA';
      break;
    default:
      result = 'CONFRONTO';
  }

  return result;
}

async function logRollResult(characterName, blockResult, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${blockResult} ${diceResult} + ${attribute} = ${diceResult + attribute}`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block == 'RETA') {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(character1.NOME, block, diceResult1, character1.VELOCIDADE);
      await logRollResult(character2.NOME, block, diceResult2, character2.VELOCIDADE);
      if (totalTestSkill1 == totalTestSkill2) console.log('Empate! niguém pontua!');
    }
    if (block == 'CURVA') {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(character1.NOME, block, diceResult1, character1.MANOBRABILIDADE);
      await logRollResult(character2.NOME, block, diceResult2, character2.MANOBRABILIDADE);
      if (totalTestSkill1 == totalTestSkill2) console.log('Empate, niguém pontua!');
    }

    if (block == 'CONFRONTO') {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
      await logRollResult(character1.NOME, block, diceResult1, character1.PODER);
      await logRollResult(character2.NOME, block, diceResult2, character2.PODER);

      if (powerResult1 == powerResult2) console.log('Empatou, niguém perde ponto!');

      if (powerResult1 != powerResult2 && (character1.PONTOS == 0 || character2.PONTOS == 0)) {
        if (character1.PONTOS == 0 && character2.PONTOS == 0) {
          console.log(`Os jogadores não tem pontos para perder!`);
        } else if (character1.PONTOS == 0 && powerResult1 < powerResult2) {
          console.log(`${character1.NOME} não tem pontos para perder!`);
        } else if (character2.PONTOS == 0 && powerResult2 < powerResult1) {
          console.log(`${character2.NOME} não tem pontos para perder!`);
        }
      }
      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
        character2.PONTOS--;
      }
      if (powerResult1 < powerResult2 && character1.PONTOS > 0) {
        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
        character1.PONTOS--;
      }
    }
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou 1 ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill1 < totalTestSkill2) {
      console.log(`${character2.NOME} marcou 1 ponto!`);
      character2.PONTOS++;
    }

    console.log('-------------------------------------------');
  }
}

async function declareWinner(character1, character2) {
  console.log('Resultado final:');
  console.log(`${character1.NOME}: ${character1.PONTOS}`);
  console.log(`${character2.NOME}: ${character2.PONTOS}`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida, parabéns!!! 🥇`);
  } else if (character1.PONTOS < character2.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida, você perdeu... ❌`);
  } else {
    console.log('A corrida terminou em empate!');
  }
}

(async function main() {
  console.log(`\n--------- 🏆 BEM-VINDO À CORRIDA MARIO-KART NODE.JS 🏆 ---------\n`);

  // Jogador 1
  const player1Index = await selectPlayer();
  const player1 = players[player1Index];
  console.log(`\nVocê escolheu: ${player1.NOME}`);

  // Jogador 2 (escolhido pelo computador)
  const player2Index = selectRandomOpponent(player1Index);
  const player2 = players[player2Index];
  console.log(`E irá correr contra: ${player2.NOME}\n`);

  // Iniciar corrida
  console.log(`\n🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);

  rl.close();
})();
