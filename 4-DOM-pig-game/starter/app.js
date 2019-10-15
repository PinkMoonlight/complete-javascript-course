/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLO BAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

// Dice same as Math.floor(Math.random() * 6) +1;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em> +dice + </em>';

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('.btn-roll').addEventListener('click', function() {
	// 1. random number
	let dice = Math.ceil(Math.random() * 6); 

	//2. display dice/result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';
	
	//3. update the round score IF the rolled number was NOT a 1
	if (dice !== 1) {
		//add score
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		//next player
		nextPlayer();
	}
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	//1. add current score to player's global score
	scores[activePlayer] += roundScore;
	roundScore = 0;

	//2. update UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
	//3. check if player won the game
	if (scores[activePlayer] >= 100) {
		document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!'
		document.querySelector('.dice').style.display = 'none';
		document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
		document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

	} else {
	//Next Player
	nextPlayer();
 	}
	
})

function nextPlayer() {
	//next player
		document.querySelector('#current-' + activePlayer).textContent = 0;
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		setTimeout(function () {
			document.querySelector('.player-0-panel').classList.toggle('active');  //does both .add or .remove
			document.querySelector('.player-1-panel').classList.toggle('active');
			document.querySelector('.dice').style.display = 'none'}, 500);
}



document.querySelector('.btn-new').addEventListener('click', newGame);



