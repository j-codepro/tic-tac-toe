const xMark = 'x';
const circleMark = 'circle'; 
const cellElements = document.querySelectorAll('[data-cell]');
const restartBtn = document.getElementById('restartBtn')
const winningText = document.querySelector('.winning-text');
const displayResult = document.querySelector('.display-result')
let circleTurn;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xMark);
        cell.classList.remove(circleMark);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    })
    setHoverMark();
    displayResult.classList.remove('show');
}

function handleClick (e) {
    const cell = e.target;
    const currentMark = circleTurn ? circleMark : xMark;
    placeMark(cell, currentMark);
    if (checkWin(currentMark)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns();
        setHoverMark();
    }
};

function endGame(draw) {
    if (draw) {
        winningText.innerText = 'Draw!'
    } else {
        winningText.innerText = `${circleTurn ? "O's" : "X's"} Wins !`
    }
    displayResult.classList.add('show');
} 

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xMark) || cell.classList.contains(circleMark)
    })
}

function placeMark(cell, currentMark) {
    cell.classList.add(currentMark);   
};

function swapTurns() {
    circleTurn = !circleTurn;
};

function setHoverMark() {
    board.classList.remove(xMark);
    board.classList.remove(circleMark);
    if(circleTurn) {
        board.classList.add(circleMark)
    } else {
        board.classList.add(xMark)
    }
};

function checkWin(currentMark) {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return cellElements[index].classList.contains(currentMark)
        })
    })
};