var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started= false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.round(Math.random() * 3)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeTo(100, 0).fadeTo(100, 1);

    playSound(randomChosenColor);
    $("#level-title").text("Level " + level)
    level++;

}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currenrColor) {

    $("#" + currenrColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currenrColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = []
    started = false;
}