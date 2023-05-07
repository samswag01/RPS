'use strict';

let buttons = document.querySelectorAll('.play button'),
    rock = document.querySelector('.rock'),
    paper = document.querySelector('.paper'),
    scissors = document.querySelector('.scissors'),
    aiScoreBoard = document.querySelector('.ai span'),
    playerScoreBoard = document.querySelector('.player span'),
    resultArea = document.querySelector('.result'),
    againBtn = document.querySelector('.play-again'),
    aiScore = 0,
    playerScore = 0,
    aiName = 'AI',
    gameCount = 0,
    gameOn = true,
    noIter = 5;

const random = (arr) => {
    return arr[Math.floor(Math.random() * 3)];
}

const alertor = (content) => {
    resultArea.textContent = content;
}

const playMove = (player, ai) => {
    if (player.move === ai.move) {
        return 'TIE'
    }

    if (
        (player.move === 'rock' && ai.move === 'scissors') ||
        (player.move === 'scissors' && ai.move === 'paper') ||
        (player.move === 'paper' && ai.move === 'rock')
    ) return player.name;

    return ai.name;
}

const updateScoreline = (winner) => {
    if (winner === 'TIE') return;
    if (winner === aiName) {
        aiScore++;
        aiScoreBoard.textContent = aiScore;
    } else {
        playerScore++;
        playerScoreBoard.textContent = playerScore;
    }
}

const toggleFade = () => {
    buttons.forEach((btn) => {
        btn.classList.toggle('game-over');
    });
}

const gameOver = () => {
    let msg = playerScore === aiScore ? "TIE!" : playerScore > aiScore ? `${playerName} WON!` : `${aiName} WON!`
    alertor(`GAME OVER! => ${msg}`);
    againBtn.style.display = 'block';
    toggleFade();
}

const restartGame = () => {
    gameOn = !gameOn;
    aiScore = 0;
    playerScore = 0;
    gameCount = 0;
    aiScoreBoard.textContent = 0;
    playerScoreBoard.textContent = 0;
    toggleFade();
    againBtn.style.display = "none";
    document.querySelector('.result').textContent = "Choose a Weapon...";
}

const getPlayerMove = (event) => {
    let playerMove = event.target.dataset.name;
    let aiMove = random(['rock', 'paper', 'scissors']);
    let winner = playMove({ name: playerName, move: playerMove }, { name: aiName, move: aiMove });
    updateScoreline(winner);
    winner = (winner === 'AI' || winner === playerName) ? `${winner} WINS!!` : `${winner}!!`;
    alertor(`${winner} => ${playerMove} vs ${aiMove}`);

    // end game after noIter game has been played
    gameCount++;
    if (gameCount === noIter) {
        gameOver();
        gameOn = !gameOn;
    }
}

// EVENT LISTENERS
buttons.forEach((button, _) => {
    button.addEventListener('click', getPlayerMove);
});

againBtn.addEventListener('click', restartGame);

window.addEventListener('keyup', (event)=> {
    if (event.key == "r" && !gameOn) {
        restartGame();
    }
});
