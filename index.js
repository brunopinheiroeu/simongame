//Start
var colorCheck = [];
var clickArray = [];
var level = 1;
var color = ["red", "blue", "yellow", "green"];

$(document).keydown(function(event) {
  $("h1").text("Level "+level+". Repeat the movement!");
  playGame();
  btnActive();
});

$("h1").click(function(event) {
  $("h1").text("Level "+level+". Repeat the movement!");
  playGame();
  btnActive();
});

function playGame() {
  randomize();
  sequence();
  console.log(colorCheck);
}

//organizing the button click

function btnActive() {
  $(".btn").click(function(btnCliked) {
    $(btnCliked.currentTarget).addClass("pressed");
    makeSound(btnCliked.currentTarget.id);
    clickArray.push(btnCliked.currentTarget.id);
    console.log(clickArray);
    realGame();
    setTimeout(function() {
      $(btnCliked.currentTarget).removeClass("pressed");
    }, 100);

  });
}

//checking if the sequence is right
function isItRight() {

  if (clickArray.length != colorCheck.length)
          return "wait";

      for (var i = 0, l = colorCheck.length; i < l; i++) {
          // Check if we have nested arrays
          if (colorCheck[i] instanceof Array && clickArray[i] instanceof Array) {
              // recurse into the nested arrays
              if (!colorCheck[i].equals(clickArray[i]))
                  return false;
          }
          else if (colorCheck[i] != clickArray[i]) {
              // Warning - two different object instances will never be equal: {x:20} != {x:20}
              return false;
          }
      }
      return true;

}


function realGame() {
  if (isItRight() == true) {
    level++;
    $("h1").text("Level "+level+" Great! Next!");
    clickArray = [];
    setTimeout(playGame,1000);
  } else if (isItRight() == false) {
    $("h1").text("Game Over! Click or Press key");
    $(".btn").off("click");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    var gameover = new Audio('sounds/wrong.mp3');
    gameover.play();
    colorCheck = [];
    clickArray = [];
  } else {
    //do nothing


  }
}

//sequence

function randomize() {
  var colorRandom = color[Math.floor(Math.random() * 4)];
  colorCheck.push(colorRandom);
}

function buttonPressed(color) {
$('.'+color).delay(70).fadeOut().fadeIn('slow');
}

function makeSound(color) {
  switch (color) {
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;

    default:
      console.log(color);

  }
}

function sequence() {
  let interval = 700;
  colorCheck.forEach((mode, index) => {

    setTimeout(() => {
      makeSound(mode)
      buttonPressed(mode)
    }, index * interval)
  })
}
