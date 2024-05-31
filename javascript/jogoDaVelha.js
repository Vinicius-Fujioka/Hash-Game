const currentPlayerPlace = document.querySelector(".jogador");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const playAgain = document.querySelector('[data-play-again]');
const leaveGame = document.querySelector('[data-leave]');

let selected;

let player1 = {
    name: localStorage.getItem("jogador1"),
    type: "X",
    color: "#F22"
}

let player2 = {
    name: localStorage.getItem("jogador2"),
    type: "O",
    color: "#22F"
}

let playerLastMove = {
    name: "",
    type: "",
    color: ""
};

let currentPlayer = { ...player1 };

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    winningMessage.classList.remove("show-winning-message");
    selected = [];

    currentPlayerPlace.innerHTML = `Vez do jogador: ${currentPlayer.name}`;

    document.querySelectorAll(".tabuleirocasa").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}

init();

function newMove(e) {
    Object.assign(playerLastMove, currentPlayer);
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = currentPlayer.type;
    e.target.style = `text-shadow: 0.05em 0.05em 0.2em ${currentPlayer.color}`;
    e.target.removeEventListener("click", newMove);
    selected[index] = currentPlayer.type;

    setTimeout(() => {
        check();
    }, [100]);

    currentPlayer = currentPlayer.type === player1.type ? {...player2} : {...player1};
    currentPlayerPlace.innerHTML = `Vez do jogador: ${currentPlayer.name}`;
}

function check() {
    const items = selected
        .map((item, i) => [item, i])
        .filter((item, i) => item[0] === playerLastMove.type)
        .map((item) => item[1]);

    for (pos of positions) {
        console.log(playerLastMove.type)
        if (pos.every((item) => items.includes(item))) {
            winningMessageTextElement.innerText = `${playerLastMove.name} ganhou!`;
            winningMessage.classList.add("show-winning-message");
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        winningMessageTextElement.innerText = 'Jogo Empatado!';
        winningMessage.classList.add("show-winning-message");
        return;
    }
}

function leave() {
    window.location = 'login.html'
}

playAgain.addEventListener('click', init);
leaveGame.addEventListener('click', leave);