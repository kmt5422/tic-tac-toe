(function(){
    //DOM elements
    const boardLocations = document.querySelectorAll('.board-location');
    const messageBoard = document.querySelector('.message-board');

    // Event listeners
    for(let i = 0; i < boardLocations.length; i ++) {
        boardLocations[i].addEventListener('click', takeTurn);
    }

    // Game Module
    const game = (() => {
        const boardState = ['', '', '', '', '', '', '', '', ''];
        const boardSymbols = {player1: 'X', player2: 'O'};
        let currPlayer = 'player1';
        let shouldPlayGame = true;

        function takeTurn(id) {
            if(boardState[id - 1] === '' && shouldPlayGame) {
                boardState[id - 1] = boardSymbols[currPlayer];
                const p = document.createElement('p');
                p.textContent = boardSymbols[currPlayer];
                boardLocations[id - 1].appendChild(p);
                if(checkWinConditions()) {
                    messageBoard.textContent = `${currPlayer} wins!`;
                    shouldPlayGame = false;
                    return;
                }
                messageBoard.textContent = '';
                changePlayerTurn();
            } else {
                messageBoard.textContent = 'You cannot move there!'
            }
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
            if(currPlayer === 'player1') {
                currPlayer = 'player2';
            } else {
                currPlayer = 'player1';
            }
        }
        return {takeTurn};
    })();

    // Helper function
    function takeTurn(event) {
        game.takeTurn(event.target.getAttribute('data-id'));
        console.log(game);
    }
})();