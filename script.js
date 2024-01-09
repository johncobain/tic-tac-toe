let player1 = '';
let player2 = '';
let player1Score = 0;
let player2Score = 0;
let actualPlayer = 'x';
let table = ['','','','','','','','',''];

const scoreboard = document.querySelector('.scoreboard');
const playerDisplay = document.querySelector('.player-display');
const squares = document.querySelectorAll('.square');
const res = document.querySelector('.res');

function clearTable(){
    squares.forEach(square=>{
        square.textContent = '';
        square.dataset.value = '';
        square.classList.remove('active');
        square.classList.remove('draw');
    })
}

function restartGame(){
    player1 = '';
    player2 = '';
    actualPlayer = 'x';
    table =  ['','','','','','','','',''];
    clearTable();
    scoreboard.textContent = '';
    res.textContent = '';
    alert('Game restarted');
    playerNames();
    displayName();
    displayScore();
    startGame();
}

function playerNames(){
    player1 = prompt('Type the name of the (X) Player')+' - X';
    player2 = prompt('Type the name of the (O) Player')+' - O';
}

function displayScore(){
    scoreboard.textContent += `${player1.slice(0, -4)} = ${player1Score} pts. | ${player2.slice(0,-4)} = ${player2Score} pts.`
}

function displayName(){
    if(actualPlayer==='x'){
        playerDisplay.textContent = 'Playing: '+player1;
    }else{
        playerDisplay.textContent = 'Playing: '+player2;
    }
}

function checkGame(isTableFull, player){
    const possibilities = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let won = false
    possibilities.forEach(p=>{
        if(table[p[0]]===player && table[p[1]]===player && table[p[2]]===player){
            squares.forEach(square=>{
                if(square.id === 'square'+ (p[0]+1)||square.id === 'square'+ (p[1]+1)||square.id === 'square'+ (p[2]+1)){
                    square.classList.add('active');
                }
            })
            won = true;
        };
    })
    if(isTableFull && won === false){
        winGame(false);
    }else if(won){
        winGame(player);
    }else{
        actualPlayer === 'x'? actualPlayer = 'o': actualPlayer = 'x';
    }
}

function winGame(playerWon){
    squares.forEach(square=>{
        square.removeEventListener('click', gameEvent);
    });
    if(playerWon){
        let playerName;

        if(playerWon === 'x'){
            playerName = player1;
            player1Score+=1;
        }else{
            playerName = player2;
            player2Score+=1;
        }
        res.textContent = 'Player '+playerName+ ' WON!';
    }else{
        squares.forEach(square=>square.classList.add('draw'))
        res.textContent = 'DRAW!'
    }
}

function gameEvent(ev){
    if(ev.target.dataset.value === ''){
        let newSquare = document.createElement('img');
        newSquare.classList.add('square-icon');
        newSquare.id = actualPlayer+'_icon';
        newSquare.setAttribute('src', 'src/'+actualPlayer+'_icon.svg');
        ev.target.appendChild(newSquare);
        ev.target.dataset.value = actualPlayer;
        table[ev.target.id.slice(-1)-1] = actualPlayer;
        
        if(table.includes('')){
            checkGame(false, actualPlayer);
        }else{
            checkGame(true, actualPlayer);
        }
        displayName();
    }
}

function startGame(){
    squares.forEach(square=>{
        square.addEventListener('click', gameEvent)
    })
}

playerNames();
displayName();
displayScore();
startGame();