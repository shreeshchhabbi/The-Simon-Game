const FOUR = 4;

var buttonColors = ["red", "blue", "green", "yellow"];

// Patterns
var gamePattern = [];
var userClickedPattern = [];


// Levels
var level = 0;
var started = false;
$("body").keypress(startGame);

function startGame(){
    if(!false){
        nextSequence();
        started=true;
        $("h2").text("");
    }
}

// Generate sequence, play sound & show animation
function nextSequence(){
    userClickedPattern.length = 0;
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(FOUR*Math.random());
    var randomChosenColor = buttonColors[randomNumber];
    
    // Push randomly chosen color to game pattern holding array
    gamePattern.push(randomChosenColor);

    // Show animation & play sound
    playSoundAndAnimate(randomChosenColor);
}

// Capture user clicks
$(".btn").click(function(){
    var userSelectedColor = $(this).attr("id");
    userClickedPattern.push(userSelectedColor);
    playSoundAndAnimate(userSelectedColor);
    testUserGamePatterns(userClickedPattern.length - 1);
});

// Test
function testUserGamePatterns(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    }else{
        gameOver();
    }
}

// Play sound and animate
function playSoundAndAnimate(name){
    var playSound = new Audio("sounds/" + name + ".mp3");
    playSound.play();
    $("." + name).fadeOut(100).fadeIn(100);
}

// Game over
function gameOver(){
    var playSound = new Audio("sounds/wrong.mp3");
    playSound.play();
    $("body").addClass("game-over");
    $("h1").text("Game over. Press any key to restart.");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 2000);

    $("h2").append("Expected ");
    for(var i=0; i<gamePattern.length; i++){
        $("h2").append(" ");
        $("h2").append(gamePattern[i]);
    }
    $("h2").append("<br><br>You Pressed ");
    for(var i=0; i<userClickedPattern.length; i++){
        $("h2").append(" ");
        $("h2").append(userClickedPattern[i]);
    }
    level=0;
    gamePattern.length=0;
    started=false;
}