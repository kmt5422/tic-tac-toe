(function(){
    //DOM elements
    const boardLocations = document.querySelectorAll('.board-location');
    const messageBoard = document.querySelector('.message-board');
    const p1InfoField = document.querySelector('#p1-name')
    const p2InfoField = document.querySelector('#p2-name')
    const submitFormBtn = document.querySelector('.form-submit');
    const winningBoard = document.querySelector('.winning-board');
    const closeSpan = document.querySelector('.winning-board > span');
    const resetBtn = document.querySelector('.btn-reset');

    // Event listeners
    for(let i = 0; i < boardLocations.length; i ++) {
        boardLocations[i].addEventListener('click', takeTurn);
        boardLocations[i].classList.add('disabled');
    }

    submitFormBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const p1Name = p1InfoField.value;
        const p2Name = p2InfoField.value;
        game.startGame(p1Name, p2Name);
        for(let i = 0; i < boardLocations.length; i ++) {
            boardLocations[i].classList.remove('disabled');
            boardLocations[i].textContent = '';
        }
        event.target.textContent = 'Reset Game';
    });

    closeSpan.addEventListener('click', (event) => {
        winningBoard.classList.remove('winning-board-show');
    });

    resetBtn.addEventListener('click', (event) => {
        submitFormBtn.click();
        closeSpan.click();
    });

    // Player Factory
    function Player(playerName, playerSymbol) {
        const name = playerName;
        const symbol = playerSymbol

        const getName = () => name;
        const getSymbol = () => symbol;

        return {getName, getSymbol};
    }

    // Game Module
    const game = (() => {
        let boardState = ['', '', '', '', '', '', '', '', ''];
        let players = [];
        let currPlayer;
        let shouldPlayGame = false;

        function startGame(name1, name2) {
            players = [Player(name1, 'X'), Player(name2, 'O')];
            shouldPlayGame = true;
            currPlayer = players[0];
            boardState = ['', '', '', '', '', '', '', '', ''];
        }

        function takeTurn(id) {
            if(!shouldPlayGame) return;
            if(boardState[id - 1] === '') {
                boardState[id - 1] = currPlayer.getSymbol();
                const p = document.createElement('p');
                p.textContent = currPlayer.getSymbol();
                boardLocations[id - 1].appendChild(p);
                if(checkWinConditions()) {
                    messageBoard.textContent = "Reload the page to play again!";
                    shouldPlayGame = false;
                    winningBoard.classList.add('winning-board-show');
                    document.querySelector('.winner-paragraph').textContent = `${currPlayer.getName()} is the winnier!`;
                } else if(checkTie()) {
                    shouldPlayGame = false;
                    console.log('tie');
                    messageBoard.textContent = 'It\'s a tie!';
                } else {
                    messageBoard.textContent = '';
                    changePlayerTurn();
                }
            } else {
                messageBoard.textContent = 'You cannot move there!'
            }
        }

        function checkTie() {
            for(let symbol of boardState) {
                if(symbol == '') {
                    return false;
                }
            }
            return true;
        }

        function checkWinConditions() {
            // Columns
            if(boardState[0] != '' && boardState[0] == boardState[1] && boardState[1] == boardState[2]) {
                return true;
            } else if(boardState[3] != '' && boardState[3] == boardState[4] && boardState[4] == boardState[5]) {
                return true;
            } else if(boardState[6] != '' && boardState[6] == boardState[7] && boardState[7] == boardState[8]) {
                return true;
            } 
            // Rows
            if(boardState[0] != '' && boardState[0] == boardState[3] && boardState[3] == boardState[6]) {
                return true;
            } else if(boardState[1] != '' && boardState[1] == boardState[4] && boardState[4] == boardState[7]) {
                return true;
            } else if(boardState[2] != '' && boardState[2] == boardState[5] && boardState[5] == boardState[8]) {
                return true;
            } 
            // Diagonals
            if(boardState[0] != '' && boardState[0] == boardState[4] && boardState[4] == boardState[8]) {
                return true;
            } else if(boardState[6] != '' && boardState[6] == boardState[4] && boardState[4] == boardState[2]) {
                return true;
            }
            
            return false;
        }

        function changePlayerTurn() {
            if(currPlayer === players[0]) {
                currPlayer = players[1];
            } else {
                currPlayer = players[0];
            }
        }
        return {takeTurn, startGame};
    })();

    // Helper functions
    function takeTurn(event) {
        game.takeTurn(event.target.getAttribute('data-id'));
    }

})();