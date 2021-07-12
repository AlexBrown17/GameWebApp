document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const displayCurrentPlayer = document.querySelector('#current-player')
    let currentPlayer = "Red"
    let counter

    const winningMessageElement = document.getElementById('winningMessage')
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

    startGame()
    restartButton.addEventListener('click', startGame)
    function startGame() {
        winningMessageElement.classList.remove('show')
        currentPlayer = "Red"
        displayCurrentPlayer.innerHTML = currentPlayer
        for (let j = 0; j < 42; j++) {
            if (j < 7) {squares[j].classList.add("top")}
            squares[j].classList.remove("taken")
            squares[j].classList.remove("player-one")
            squares[j].classList.remove("player-two")
            squares[j].classList.add("border")
        }
        for (let j = 42; j < 49; j++) {
            squares[j].classList.remove("taken")
            squares[j].classList.add("bottom")
            squares[j].classList.add("taken")
        }
        counter = 0
    }

    const winningArrays = [
        [0, 1, 2, 3],
        [41, 40, 39, 38],
        [7, 8, 9, 10],
        [34, 33, 32, 31],
        [14, 15, 16, 17],
        [27, 26, 25, 24],
        [21, 22, 23, 24],
        [20, 19, 18, 17],
        [28, 29, 30, 31],
        [13, 12, 11, 10],
        [35, 36, 37, 38],
        [6, 5, 4, 3],
        [0, 7, 14, 21],
        [41, 34, 27, 20],
        [1, 8, 15, 22],
        [40, 33, 26, 19],
        [2, 9, 16, 23],
        [39, 32, 25, 18],
        [3, 10, 17, 24],
        [38, 31, 24, 17],
        [4, 11, 18, 25],
        [37, 30, 23, 16],
        [5, 12, 19, 26],
        [36, 29, 22, 15],
        [6, 13, 20, 27],
        [35, 28, 21, 14],
        [0, 8, 16, 24],
        [41, 33, 25, 17],
        [7, 15, 23, 31],
        [34, 26, 18, 10],
        [14, 22, 30, 38],
        [27, 19, 11, 3],
        [35, 29, 23, 17],
        [6, 12, 18, 24],
        [28, 22, 16, 10],
        [13, 19, 25, 31],
        [21, 15, 9, 3],
        [20, 26, 32, 38],
        [36, 30, 24, 18],
        [5, 11, 17, 23],
        [37, 31, 25, 19],
        [4, 10, 16, 22],
        [2, 10, 18, 26],
        [39, 31, 23, 15],
        [1, 9, 17, 25],
        [40, 32, 24, 16],
        [9, 17, 25, 33],
        [8, 16, 24, 32],
        [11, 17, 23, 29],
        [12, 18, 24, 30],
        [1, 2, 3, 4],
        [5, 4, 3, 2],
        [8, 9, 10, 11],
        [12, 11, 10, 9],
        [15, 16, 17, 18],
        [19, 18, 17, 16],
        [22, 23, 24, 25],
        [26, 25, 24, 23],
        [29, 30, 31, 32],
        [33, 32, 31, 30],
        [36, 37, 38, 39],
        [40, 39, 38, 37],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 16, 23, 30],
        [10, 17, 24, 31],
        [11, 18, 25, 32],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
    ]

    function checkBoard() { //return false if no winner
        if (counter == 42) {
            winningMessageTextElement.innerText = "Draw!"
            winningMessageElement.classList.add('show')
            return true
        }

        for (let y = 0; y < winningArrays.length; y++) {
            const square1 = squares[winningArrays[y][0]]
            const square2 = squares[winningArrays[y][1]]
            const square3 = squares[winningArrays[y][2]]
            const square4 = squares[winningArrays[y][3]]

            //check squares to see if they all have the class of player-one
            if (
                square1.classList.contains('player-one') &&
                square2.classList.contains('player-one') &&
                square3.classList.contains('player-one') &&
                square4.classList.contains('player-one')
            ) {
                winningMessageTextElement.innerText = "Red wins!"
                winningMessageElement.classList.add('show')
                return true
            }

            //check squares to see if they all have the class of player-two
            if (
                square1.classList.contains('player-two') &&
                square2.classList.contains('player-two') &&
                square3.classList.contains('player-two') &&
                square4.classList.contains('player-two')
            ) {
                winningMessageTextElement.innerText = "Blue wins!"
                winningMessageElement.classList.add('show')
                return true
            }
        }
        return false
    }

    for (let i = 0; i < squares.length; i++) {
        squares[i].onclick = () => {
            //allow piece to 'fall'
            let clicked = i
            while (!squares[i + 7].classList.contains('taken')) {
                i = i + 7
            }
            //if the square below your current square is taken, you can go on top of it
            if (squares[i + 7].classList.contains('taken') && !squares[i].classList.contains('taken')) {
                if (currentPlayer == "Red") {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-one')
                    currentPlayer = "Blue"
                    displayCurrentPlayer.innerHTML = currentPlayer
                    counter++
                } /*else if (currentPlayer == "Blue") {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-two')
                    currentPlayer = "Red"
                    displayCurrentPlayer.innerHTML = currentPlayer
                }*/
                //reset i value inside current loop iteration
                i = clicked
            }

            if (!checkBoard()) {     //if no winner... computer's turn
                //pick valid slot
                let rng = Math.floor(Math.random() * 7)
                while (squares[rng].classList.contains('taken')) {
                    rng = Math.floor(Math.random() * 7)
                }
                //simulate fall
                let temp = rng
                while (!squares[rng + 7].classList.contains('taken')) {
                    rng = rng + 7
                }
                //land
                if (squares[rng + 7].classList.contains('taken') && !squares[rng].classList.contains('taken')) {
                    /*if (currentPlayer == "Red") {
                        squares[rng].classList.add('taken')
                        squares[rng].classList.add('player-one')
                        currentPlayer = "Blue"
                        displayCurrentPlayer.innerHTML = currentPlayer
                    } else */if (currentPlayer == "Blue") {
                        squares[rng].classList.add('taken')
                        squares[rng].classList.add('player-two')
                        currentPlayer = "Red"
                        displayCurrentPlayer.innerHTML = currentPlayer
                        counter++
                    }
                    //reset rng value inside current loop iteration
                    rng = temp //necessary?
                }
            }
            //checkboard
            checkBoard()
        }
    }
})
