// TODOS
// Currently the game startes before user's can input their name
// rework code to prevent this from happening. 

(function(){
    //DOM elements
    const boardLocations = document.querySelectorAll('.board-location');
    const messageBoard = document.querySelector('.message-board');
    const p1InfoField = document.querySelector('#p1-name')
    const p2InfoField = document.querySelector('#p2-name')
    const submitFormBtn = document.querySelector('.form-submit');

    // Global vars
    let p1Name = '';
    let p2Name = '';

    // Event listeners
    for(let i = 0; i < boardLocations.length; i ++) {
        boardLocations[i].addEventListener('click', takeTurn);
    }

    submitFormBtn.addEventListener('click', (event) => {
        event.preventDefault();
        p1Name = p1InfoField.value;
        p2Name = p2InfoField.value;
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
    const game = ((name1, name2) => {
        const boardState = ['', '', '', '', '', '', '', '', ''];
        const players = [Player(name1, 'X'), Player(name2, 'O')];
        let currPlayer = players[0];
        let shouldPlayGame = true;

        function takeTurn(id) {
            if(!shouldPlayGame) return;
            if(boardState[id - 1] === '') {
                boardState[id - 1] = currPlayer.getSymbol();
                const p = document.createElement('p');
                p.textContent = currPlayer.getSymbol();
                boardLocations[id - 1].appendChild(p);
                if(checkWinConditions()) {
                    messageBoard.textContent = `${currPlayer.getName()} wins!`;
                    shouldPlayGame = false;
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
        return {takeTurn};
    })(p1Name, p2Name);

    // Helper function
    function takeTurn(event) {
        game.takeTurn(event.target.getAttribute('data-id'));
    }
})();