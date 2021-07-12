const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
let currentClass

startGame()

restartButton.addEventListener('click', startGame)

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
})

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    const cell = e.target
    placeMark(cell, currentClass)
    if (!checkWin(currentClass)) {   //if no winner...keep going
        if (!isDraw()) {    //if no draw either... keep going
            swapTurns()
            computerTurn()
            if (checkWin(currentClass)) {
                endGame(false)
            } else if (isDraw()) {
                endGame(true)
            }
            swapTurns()
            setBoardHoverClass()
        }
    }

    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    }
}

function computerTurn() {
    let rng = Math.floor((Math.random() * 9))
    //while cell isn't empty...
    while ([...cellElements][rng].className != "cell") {    
        rng = Math.floor((Math.random() * 9))
    }
    //finally we have an empty cell selected, set cell to computer class
    placeMark([...cellElements][rng], currentClass)
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} win!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
    currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}