//variable declaration
var roundScore, scores, activePlayer, gamePlaying, prevDice, dice;

//set intial values of attributes
init();

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    prevDice = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');

    gamePlaying = true;

}


//Roll Button working
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        //1. random nummber
        dice = Math.floor(Math.random() * 6) + 1;

        //2.display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update scores
        if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            nextplayer();

        }
    }

});


//Hold Button working
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add current scire to global score
        scores[activePlayer] += roundScore;

        //update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        //check for user set final score of game
        var input=document.querySelector('.final-score').value;
        var winningScore
        if(input) {
            winningScore=input;
        }
        else{
            winningScore=100;
        }

        

        //check if player won the game?
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextplayer();
        }
    }


});



//function to set next player active
function nextplayer() {
    //set active things to 0
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;

    //change active class
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    //change active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //chnage active class
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}


//New Game button working
document.querySelector('.btn-new').addEventListener('click', init);
