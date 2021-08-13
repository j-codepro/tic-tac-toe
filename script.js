const xMark = 'x';
const circleMark = 'circle'; 
const cellElements = document.querySelectorAll('[data-cell]');
const restartBtn = document.getElementById('restartBtn')
const winningText = document.querySelector('.winning-text');
const displayResult = document.querySelector('.display-result')
let circleTurn;
let score1 = document.querySelector('.score1');
let score2 = document.querySelector('.score2');
let scoreResult1 = 0;
let scoreResult2 = 0;

const manageGame = (() => {

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
    
    const startGame = () => {
        circleTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(xMark);
            cell.classList.remove(circleMark);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true })
        })
        setHoverMark();
        displayResult.classList.remove('show');
    };

    const handleClick = (e) => {
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

    const endGame = (draw) => {
        if (draw) {
        } else if (circleTurn) {
            scoreResult2++;
            score2.innerText = scoreResult2;
        } else if (!circleTurn) {
            scoreResult1++;
            score1.innerText = scoreResult1;
        }
        startGame();
        results();
    };

    const results = () => {
        if (scoreResult1 === 3 && scoreResult1 > scoreResult2) {
            winningText.innerText = "Player 1 Wins !";
            displayResult.classList.add('show');
            displayResult.style.background = 'rgba(199, 50, 50, .9)';
        } else if (scoreResult2 === 3 && scoreResult2 > scoreResult1) {
            winningText.innerText = "Player 2 Wins !";
            displayResult.classList.add('show');
            displayResult.style.background = 'rgba(57, 172, 57, .9)';
        }  else {};
    }

    const resetScores = () => {
        scoreResult1 = 0;
        scoreResult2 = 0;
        score1.innerText = scoreResult1;
        score2.innerText = scoreResult2;
    }
    
    const isDraw = () => {
        return [...cellElements].every(cell => {
            return cell.classList.contains(xMark) || cell.classList.contains(circleMark)
        })
    };

    const placeMark = (cell, currentMark) => {
        cell.classList.add(currentMark);   
    };
    
    const swapTurns = () => {
        circleTurn = !circleTurn;
    };
    
    const setHoverMark = () => {
        board.classList.remove(xMark);
        board.classList.remove(circleMark);
        if(circleTurn) {
            board.classList.add(circleMark)
        } else {
            board.classList.add(xMark)
        }
    };
    
    const checkWin = (currentMark) => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return cellElements[index].classList.contains(currentMark)
            })
        })
    };

    return {
        startGame,
        resetScores
    };

})();

manageGame.startGame();
restartBtn.addEventListener('click', (e) => {
    manageGame.resetScores();
    manageGame.startGame();
});
