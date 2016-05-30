var isInt = function(n) {
    return n % 1 === 0;
}

var betweenRange = function(n, min, max) {
    return n >= min && n <= max;
}

var verified = function(input, min, max) {
    return isInt(input) && betweenRange(input, min, max);
}

var compareGuess = function(random, guess) {
    return Math.abs(random - guess);
}

var bankrollUpdate = function() {
    $("#guess").find("p:last").text("Your current bankroll is $" + bankroll + ".").show();
}

var showHideUpdate = function() {
    $("#bet").find("input:first").prop('disabled', false);
    $("#guess").find("div").hide();
}

var addGold = function(n) {
    for (var i = 0; i < n; i++) {
        $("body").append('<div class="gold"><span></span><span>$1</span></div>');
    }
}

var removeGold = function(n) {
    for (var i = 0; i < n; i++) {
        $(".gold:last").remove();
    }
}

var bankroll = 100;
var play = "";
var betAmount;

window.onload = function() {
    bankrollUpdate();
    addGold(bankroll);
    $("#bet").on("submit", function(event) {
        var betInput = $(this).find("input:first").val()
        if (!verified(betInput, 5, 10)) {
            $(this).find("p:first").text("Please enter a number between 5 and 10").show().fadeOut(1000);
            event.preventDefault();
        } else {
            betAmount = betInput;
            $(this).find("input:first").prop('disabled', true);
            $("#guess").find("p:first").hide();
            $("#guess").find("div").show();
            event.preventDefault();
        }
    });
    $("#guess").on("submit", function( event ) {
        var randomNum = Math.floor(Math.random() * 10) + 1;
        console.log(randomNum);
        var guess = $(this).find("input:first").val()
        if (!verified(guess, 1, 10)) {
            $(this).find("p:first").text("Please only enter a number between 1 and 10").show().fadeOut(1000);
            event.preventDefault();
            return;
        }
        switch (compareGuess(randomNum, guess)) {
            case 0:
                bankroll += Number(betAmount);
                $(this).find("p:first").text("Correct!! You win your bet!").show();
                addGold(betAmount);
                bankrollUpdate();
                showHideUpdate();
                event.preventDefault();
            return;
                break;
            case 1:
                $(this).find("p:first").text("You were close! You don't lose money").show();
                bankrollUpdate();
                showHideUpdate();
                event.preventDefault();
            return;
                break;
            default:
                if (bankroll - Number(betAmount) <= 0) {
                    bankroll = 0;
                } else {
                    bankroll -= Number(betAmount);
                }
            $(this).find("p:first").text("Wrong :( You lose your bet.").show();
            removeGold(betAmount);
            bankrollUpdate();
            showHideUpdate();
            event.preventDefault();
        }
        if (bankroll == 0) {
            $(this).find("p:first").text("Game over. You lose :(").show();
            $("#bet").find("div").hide();
        }
    });
    $("#reset").on("submit", function(){
        bankroll = 100;
        bankrollUpdate;
        showHideUpdate;
    });
}
