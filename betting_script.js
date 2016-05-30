var isInt = function(n) {
    return n % 1 === 0;
}

var betweenRange = function(n) {
    var min = 1;
    var max = 10;
    return n >= 1 && n <= 10;
}

var verifiedGuess = function(input) {
    return isInt(input) && betweenRange(input);
}

var compareGuess = function(guess) {
    return Math.abs(randomNum - guess);
}

var bankroll = 100;
var play = "";

alert("Welcome to this simple JS betting game!");
alert("You start off with $" + bankroll);
while (play != "no") {
    var randomNum = Math.floor(Math.random() * 10) + 1;
    var bet = prompt("Would you like to bet $5 or $10?");
    while (bet != "5" && bet != "10") {
        bet = prompt("Please enter either 5 or 10");
    }
    var guess = prompt("Guess a number between 1 and 10");
    while (!verifiedGuess(guess)) {
        guess = prompt("Please only enter a number between 1 and 10");
    }
    switch (compareGuess(guess)) {
        case 0:
            bankroll += Number(bet);
            alert("Correct!! You win your bet!");
        break;
        case 1:
            alert("You were close! You don't lose money");
        break;
        default:
            if (bankroll - Number(bet) <= 0) {
                bankroll = 0;
            } else {
                bankroll -= Number(bet);
            }
            alert("Wrong :( You lose your bet.");

    }
    alert("Your current bankroll is $" + bankroll + ".")
    if (bankroll == 0) {
        alert("Game over. You lose :(");
        play = "no"
    } else {
        play = prompt('Press enter to continue playing or type "no" to quit')
    }
}

