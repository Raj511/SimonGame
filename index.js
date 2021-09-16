// Declaring variables
var buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highscore = 0;
var score = 0;

$("#highscore-title").text("Highscore " + highscore);

// adding event listener to keypress
$(document).keypress(function(){
  if (!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

// adding event listener to button clicks
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    patternMatch((userClickedPattern.length)-1);
});

// Generates random sequence
function nextSequence(){
    userClickedPattern = [];
    level++;
    score = level;
    $("#score-title").text("Score " + score);

    if(level >= highscore){
      highscore = level;
    }
    $("#highscore-title").text("Highscore " + highscore);

    var randomNumber = Math.floor(Math.random()*4);
    $("#level-title").text("level " + level);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


//Sound and Animation function
function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


function animatePress(currentColor){
  $("." + currentColor).addClass("pressed")
  setTimeout(function(){
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// function patternMatch(currentLevel){
//   for(var i =0 ; i < currentLevel;i++){
//       if (gamePattern[i] !== userClickedPattern[i]){
//         $("#level-title").text("Game Over");
//         return false;
//         break;
//         // Here comes the code to show player through animation that game is over
//       }
//     }
//     return true;
// }
//
// // Game logic
// if (started){
//     if (patternMatch(level)){
//       nextSequence();
//     }
//   }







function patternMatch(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("success");
      if(userClickedPattern.length == gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else{
      playSound("wrong")
      score = level - 1;
      $("#score-title").text("Score " + score);
      $("#score-title").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
      highscore -= 1;
      $("#highscore-title").text("Highscore " + highscore);
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },250);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}



function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  score = 0;
}
