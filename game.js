
//  buttonColors Array representing the colors in the game.
var buttonColors=["red" ,"blue","green","yellow"];

// gamePattern to store the random color genearated using Math.random()
var gamePattern=[];

//  userClickedPattern to store the colors when user clicks the button.
var userClickedPattern=[];


var level=0;
var started=false;

// it recognizes the keypress when a button is pressed down in keyboard.
$(document).keypress(function (){

    if(!started){

        nextSequence()
    }
});

/* to check that the user is clicking is correct  color pattern, 
if yes it goes to the next sequence, or it ends the game. */

function checkAnswer(index){
    if(gamePattern[index]===userClickedPattern[index]){
            if(userClickedPattern.length===gamePattern.length){
                setTimeout(function() {
                    nextSequence()
                    },1000);
                    
            }
        }
            
    else {
          $("body").addClass("game-over");
          playSound("wrong");
          setTimeout(function(){
            $("body").removeClass("game-over")
            },200);
          $("h1").text("Game-Over, Press Any Key to Restart");
          restartGame();
    }

}
// it generates the sequence of color randomly and performs fade in and fade out animations.
function nextSequence(){

    userClickedPattern=[]; // the colors clicked by the user resets after each and every level.

    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio=new Audio("sounds/" +randomChosenColor+ ".mp3");

    var flash= $("#"+randomChosenColor).attr("id");
    playSound(flash);

    level++;
    $("#level-title").text("level " + level );

    started=true; //to eliminate the keypress after the first click.

}

// when the user clicks the button, the color is added to the userClickedPattern Array. 

$(".btn").on("click", function(){

    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);
        
    checkAnswer(userClickedPattern.length-1);
        
});

// Function to play Sound 
function playSound(name){
        var audio=new Audio("sounds/" +name+ ".mp3");
        audio.play();
}


// Function to Animate the button once it's got clicked. 
function animatePress(currentColor){
    
       $("."+ currentColor).addClass("pressed");
       setTimeout(function(){
        $("."+ currentColor).removeClass("pressed");
       },100);
           
}

// it restarts the game, once a key is pressed. 

function restartGame(){

    level=0;
    gamePattern=[];
    started=false;
        
}
    
    
     
     