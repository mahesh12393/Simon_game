var buttonColors = ["red","blue","green","yellow"];
var currLevel=1;
var gamePattern=[];
var userChosenColor;
var userClickedPattern=[];
var started=false;

$(document).keypress(function(){
  if(!started){
    $("h1").html("Level "+currLevel);
    nextSequence();
    started=true;
  }
});
//user clickings
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
     userClickedPattern.push(userChosenColor);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer((userClickedPattern.length)-1);
});
function nextSequence(){
   userClickedPattern=[];
  $("h1").html("Level "+currLevel);
  currLevel++;
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // jQuery to animate a flash to the button selected in step 1.
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);//for flashing
  playSound(randomChosenColor);//for playing sound of button
  animatePress(randomChosenColor);
}
//function for button animations
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//function for checking if user and computer patters are the same
function checkAnswer(presentLevel){
  if(userClickedPattern[presentLevel] == gamePattern[presentLevel]){
    // console.log("success");
     if(userClickedPattern.length == gamePattern.length){
       setTimeout(function(){
         nextSequence();
}, 1000);
}
  } else{
    var error="wrong";
     playSound(error);
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200)
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//functions for playing the sound
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//for restaring the game when the user gtes wrong
function startOver(){
  currLevel=1;
  gamePattern=[];
  started=false;
}
