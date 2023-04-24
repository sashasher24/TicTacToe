let whoseTurn = 0;

function turn() {
    let player1 = document.getElementById('player1');
    let player2 = document.getElementById('player2');
    let sideBar = document.getElementById('sideBar');
    let gameOver = document.getElementById('resultMessage');

    if (whoseTurn % 2 != 0) {
        player1.style.background = '#cf9139';
        player2.style.background = '#d4d4d4';
    } else {
        player2.style.background = ' #cf9139';
        player1.style.background = '#d4d4d4';
    }
    if (event.target.innerHTML == '') {
        if (whoseTurn % 2 == 0) {
            event.target.innerHTML = `X`;
        } else event.target.innerHTML = `O`;
        whoseTurn++;
        document.getElementById('numberOfTurns').innerHTML = `${whoseTurn}`;

    } else {
        gameOver.innerHTML = 'You can\'t click here';
    }
    if (win('X')) {

        player1.style.background = '#d4d4d4';
        player2.style.background = '#d4d4d4';
        sideBar.style.background = '#2f7731';
        sideBar.style.color = 'white';
        gameOver.innerHTML = `Player 1 won !`;
        console.log('X won');
    }
    if (win('O')) {
        player1.style.background = '#d4d4d4';
        player2.style.background = '#d4d4d4';
        sideBar.style.background = '#2f7731';
        sideBar.style.color = 'white';
        gameOver.innerHTML = `Player 2 won !`;
        console.log('O won');
    }

    let playSpace = document.getElementsByClassName('square');
    playSpace = Array.from(playSpace);

    let countTaken = 0;
    for (let i = 0; i < 9; i++) {
        if (playSpace[i].innerHTML != '')
            countTaken++;
    }

    if (countTaken == 9 && !win('X') && !win('O')) {
        player1.style.background = '#d4d4d4';
        player2.style.background = '#d4d4d4';
        sideBar.style.background = '#cf9139';
        gameOver.innerHTML = `It's a draw !`;
    }
}

function win(winningPlayer) {
    let playSpace = document.getElementsByClassName('square');
    playSpace = Array.from(playSpace);

    let countDiagRight = 0;
    let countDiagLeft = 0;

    let countHoriz = 0;
    let countVert = 0;

    for (let i = 0; i < 9; i += 4) {
        if (playSpace[i].innerHTML == winningPlayer) {
            countDiagRight++;
        }
        if (countDiagRight == 3) {
            i = 0
            while (i < 9) {
                playSpace[i].classList.add('green');
                console.log(`diag right ${countDiagRight}`);
                i += 4;
            }
        }
    }

    for (let i = 2; i < 7; i += 2) {
        if (playSpace[i].innerHTML == winningPlayer) {
            countDiagLeft++;
        }
        if (countDiagLeft == 3) {
            i = 2;
            while (i < 7) {
                playSpace[i].classList.add('green');
                i += 2;
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        if (i % 3 == 0) {
            for (let j = i; j < i + 3; j++) {
                if (playSpace[j].innerHTML == winningPlayer) {
                    countHoriz++;
                }
            }
            if (countHoriz != 3) countHoriz = 0;
            else {
                let k = i;
                while (i < k + 3) {
                    playSpace[i].classList.add('green');
                    i++;
                }
                break;
            }
        }
    }

    for (let i = 0; i <= 2; i++) {
        for (let j = i; j <= i + 6; j += 3) {
            if (playSpace[j].innerHTML == winningPlayer)
                countVert++;
        }
        if (countVert != 3) countVert = 0;
        else {
            while (i < 9) {
                playSpace[i].classList.add('green');
                i += 3;
            }
            break;
        }
    }

    if (countDiagLeft == 3 || countDiagRight == 3 || countHoriz == 3 || countVert == 3) {
        for (let i = 0; i < 9; i++) {
            if (playSpace[i].innerHTML == '') {
                playSpace[i].removeEventListener('click', turn);
            }
        }
        return true;
    }
}

function emptyPlayground() {
    whoseTurn = 0;
    let main = document.getElementById('main');
    let container = document.getElementById('container');

    main.removeChild(container);
    ticTacToePlayGround();
}

function ticTacToePlayGround() {
    let main = document.getElementById('main');
    let container = document.createElement('div');
    container.setAttribute('id', 'container');

    let heading = document.createElement('div');
    heading.setAttribute('id', 'heading');
    heading.innerHTML = `<h1>Tic tac toe</h1>`;

    let gameContainer = document.createElement('div');
    gameContainer.setAttribute('class', 'gameContainer');

    let gameSpace = document.createElement('div');
    gameSpace.setAttribute('class', 'gameSpace');

    let gameDiv = document.createElement('div');
    gameDiv.setAttribute('id', 'gameDiv');

    for (let i = 0; i < 9; i++) {
        let playSquare = document.createElement('div');
        playSquare.setAttribute('id', `square${i}`);
        playSquare.setAttribute('class', `square`);
        playSquare.addEventListener('click', turn);
        gameDiv.appendChild(playSquare);
    }

    let sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'sideBar');

    let player1 = document.createElement('div');
    player1.setAttribute('id', 'player1');
    player1.innerHTML = 'Player 1';

    let player2 = document.createElement('div');
    player2.setAttribute('id', 'player2');
    player2.innerHTML = 'Player 2';

    let turns = document.createElement('div');
    turns.setAttribute('id', 'turnsTable');
    turns.innerHTML = 'Number of turns';

    let numberOfTurns = document.createElement('p');
    numberOfTurns.setAttribute('id', 'numberOfTurns');
    turns.appendChild(numberOfTurns);

    let result = document.createElement('div');
    result.setAttribute('id', 'resultMessage');


    let playAgain = document.createElement('div');
    playAgain.setAttribute('id', 'playAgain');
    playAgain.innerHTML = 'Play Again';
    playAgain.addEventListener('click', emptyPlayground);

    sideBar.appendChild(player1);
    sideBar.appendChild(player2);
    sideBar.appendChild(turns);
    sideBar.appendChild(result);
    sideBar.appendChild(playAgain);

    gameContainer.appendChild(heading);

    gameSpace.appendChild(gameDiv);
    gameSpace.appendChild(sideBar);
    gameContainer.appendChild(gameSpace);
    container.appendChild(gameContainer);

    main.appendChild(container);
}

ticTacToePlayGround();