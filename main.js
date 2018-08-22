var rockButton = document.getElementById("rock");
var paperButton = document.getElementById("paper");
var scissorsButton = document.getElementById("scissors");

var playerWins = document.getElementById("player_wins");
var playerLosses = document.getElementById("player_losses");
var computerWins = document.getElementById("computer_wins");
var computerLosses = document.getElementById("computer_losses");
var winnerBanner = document.getElementById("winner");

var DIFFICULTY = 45;
var winString = "";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function playRPS(e){
    var buttonId = e.currentTarget.id;
    //decide if we are going to play properly or not
    if(getRandomInt(0,101) <= DIFFICULTY){
	//we rolled at or below the difficulty, time to play correctly
	if(buttonId == "rock")
	    return "paper";
	else if(buttonId == "paper")
	    return "scissors";
	else
	    return "rock";
    } else{
	//we rolled above the difficulty, time to play randomly, as to have a chance of losing
	var random_choice = getRandomInt(1,4);
	switch(random_choice){
	case 1:
	    return "rock";
	case 2:
	    return "paper";
	case 3:
	    return "scissors";
	}
    }
}

function evaluateGameState(e) {
    var playerChoice = e.currentTarget.id;
    var computerChoice = playRPS(e);
    winString = "";
    winString += "Computer played " + computerChoice + ": ";
    if(playerChoice == computerChoice) {
	return 0;
    } else {
	if((playerChoice == "rock" && computerChoice == "paper")||
	   (playerChoice == "paper" && computerChoice == "scissors")||
	   (playerChoice == "scissors" && computerChoice == "rock")) {
	    return -1;
	}
	if((playerChoice == "paper" && computerChoice == "rock")||
	   (playerChoice == "scissors" && computerChoice == "paper")||
	   (playerChoice == "rock" && computerChoice == "scissors")) {
	    return 1;
	}
    }
}

function updateScores(score) {
    if(score == 1){
	playerWins.innerHTML = (parseInt(playerWins.innerHTML) + 1);
	computerLosses.innerHTML = (parseInt(computerLosses.innerHTML) + 1);
	winString += "Player wins!";
    }
    if(score == -1){
	playerLosses.innerHTML = (parseInt(playerLosses.innerHTML) + 1);
	computerWins.innerHTML = (parseInt(computerWins.innerHTML) + 1);
	winString += "Computer wins!";
    }
    if(score == 0) {
	winString += "Tie!";
    }
    winnerBanner.innerHTML = winString;
}

rockButton.addEventListener("click", function(e){
    updateScores(evaluateGameState(e));
});
paperButton.addEventListener("click", function(e){
    updateScores(evaluateGameState(e));
});
scissorsButton.addEventListener("click", function(e){
    updateScores(evaluateGameState(e));
});
