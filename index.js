var buttonClr = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var start=false;

$(document).keydown(function(){
    if(!start){
        $("h1").text("Level "+ level);
        nextSequence();
        start=true;
    }
});

$(".btn").click(function(){
    var userClr = $(this).attr("id");
    userPattern.push(userClr);
    playSound(userClr);
    animatePress(userClr);
    checkAns(userPattern.length-1);
});

function startOver(){
    gamePattern.length=0;
    userPattern.length=0;
    level=0;
    start=false;
}

function checkAns(currLevel){
    if(gamePattern[currLevel]===userPattern[currLevel]){
        console.log("Success");
        if(userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("failure");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userPattern.length=0;
    level++;
    $("#level-title").text("Level "+ level);
    var randNum = Math.random();
    randNum = Math.floor(randNum*4 );
    
    var randClr = buttonClr[randNum];
    gamePattern.push(randClr);
    
    $("#" + randClr).fadeIn(75).fadeOut(75).fadeIn(75);
    playSound(randClr);
    
}

function playSound(clr){
    var audio = new Audio("sounds/" + clr + ".mp3");
    audio.play();
}

function animatePress(curClr){
    $("#" + curClr).addClass("pressed");
    setTimeout(function(){
        $("#" + curClr).removeClass("pressed");
    },75);
}



