let gamePattern = []; // the pattern for correct answers
let buttonColours = ["red", "blue", "green", "yellow"]; // button colours on screen
let userClickedPattern = []; // the users pattern pressed
let started = false; // checks to see if game already started
let level = 0; // leveling


//gameplay
$(document).keypress(function(){
    if (!started){
        $("#level-title").text(`level ${level}`);
        nextSequence();
        started = true;
    }

});


$(".btn").click (function() {
    let userChosenColor = $(this).attr("id"); // gets id of button clicked
    userClickedPattern.push(userChosenColor); // pushes
    playSound(userChosenColor); // plays a sound for the color clicked
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// Restart and reset when game is over
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text(`level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4); // random number from 0 to 3

    let randomChosenColor = buttonColours[randomNumber]; // pick colour from array colour with random number
    gamePattern.push(randomChosenColor); // push color to gamepattern instance

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // animation for clicked
    playSound(randomChosenColor); //plays sounds for sequence

}


// Checks answer in sequence
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){ // if correct
        console.log("Success");
        if (userClickedPattern.length == gamePattern.length){ // and whole sequence complete
            setTimeout(function (){
                nextSequence(); // move to next level
            }, 1000)
        }
    }
    else { // if incorrect answer
        console.log("Fail");
        let fail = "wrong";
        playSound(fail) // play fail sound
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver(); // reset values
    }
}

//sounds and effects
function playSound(name) {
    var beep = new Audio(`sounds/${name}.mp3`); // sound effect
    beep.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    },100);
}
