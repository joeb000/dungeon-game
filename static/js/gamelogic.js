//animate css
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

//delay for setTimeout
var animationTimer = 2000;

//music objects
var grunt = new Audio('audio/grunt2.m4a');
var deadSound = new Audio('audio/dying.m4a');

//initialize fighters
var fighter1 = {
  hitpoints: 120,  
  attack: null
}

var fighter2 = {
  hitpoints: 120,  
  attack: null
}


//fighter object
function newFighter(name) {
  ret = {
    hitpoints: 100,
    name: name
  }
  return ret;
}

console.log("sanity")
//create attack number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  
}

//fight
function rollDice() { 
  move();

  $('.gladiator1, .gladiator2').animateCss('swing');
  

  gameCheck();
  grunt.play();
  
  fighter1.attack = getRandomInt(0, 50);
  fighter2.attack = getRandomInt(0, 50);
  

  document.getElementById("f1_attack").innerHTML =  fighter1.name + "<br>" + " hits for: " +  fighter1.attack;
  document.getElementById("f2_attack").innerHTML =  fighter2.name + "<br>" + " hits for: " +  fighter2.attack;

  console.log("fighter1 has dealt " + fighter1.attack + " damage");
  console.log("fighter2 has dealt " + fighter2.attack + " damage");
  
  fighter1.hitpoints -= fighter2.attack;
  fighter2.hitpoints -= fighter1.attack;

  
  //updateFighterValues();
  console.log("updating...")
  console.log(fighter1);
  console.log(fighter2);

  $('#f1_hitpoints').text(fighter1.hitpoints)
  $('#f2_hitpoints').text(fighter2.hitpoints)
  gameCheck();
}


//is game over?
function gameCheck() { 

  //if both lose
  if (fighter2.hitpoints <= 0 && fighter1.hitpoints <= 0) { 
    deadSound.play()
    
    document.getElementById("f1_hitpoints").value=""
    document.getElementById("f2_hitpoints").value=""
    document.getElementById("fighter2_result").innerHTML = fighter2.name + " and " + fighter1.name + " Has Lost!";

    $('.gladiator2, .gladiator1').animateCss('hinge');
    $('#sword2, #sword').animateCss('zoomOutDown');

    setTimeout(function() {  
      $('.gladiator2, .sword2, sword').addClass('invisible');   
      location.reload();     
      confirm("Game is Over, " + fighter2.name + " and " + fighter1.name + " have lost. Click OK to reset.");    
  }, animationTimer); 

  }

  //-------------------------------------------------------------------------

  else if (fighter1.hitpoints <= 0) {
    deadSound.play()
    $('.sword2').addClass('invisible');
    document.getElementById("f1_hitpoints").value=""
    document.getElementById("f2_hitpoints").value=""
    document.getElementById("fighter1_result").innerHTML = fighter1.name + " Has Lost!";
    
    $('.gladiator1').animateCss('hinge');
    //$('.gladiator2').animateCss('bounce');
    $('#sword2').animateCss('zoomOutDown');

    setTimeout(function() {
      
      $('.gladiator1').addClass('invisible'); 
      location.reload();
      confirm("Game is Over, " + fighter1.name + " has lost.  Click OK to reset");     
  }, animationTimer);
  
  }

//----------------------------------------------------------------------

  else if (fighter2.hitpoints <= 0) { 
    deadSound.play()
    $('.sword').addClass('invisible');
    document.getElementById("f1_hitpoints").value=""
    document.getElementById("f2_hitpoints").value=""
    document.getElementById("fighter2_result").innerHTML = fighter2.name + " Has Lost!";  

    $('.gladiator2').animateCss('hinge');
    //$('.gladiator1').animateCss('bounce');
    $('#sword').animateCss('zoomOutDown');

    setTimeout(function() {
      
      $('.gladiator2').addClass('invisible');
      location.reload();
      confirm("Game is Over, " + fighter2.name + " has lost.  Click OK to reset");    
  }, animationTimer); 
  
  }
}
  

var check = 2;

//update values
function updateFighterValues() {
  $('#sword, #sword2').removeClass('invisible');

  scrollWin();

 if (check == 2) { 
  fighter1.name = document.getElementById("fighter1_name").value;
  fighter2.name = document.getElementById("fighter2_name").value;
  document.getElementById("fighter1_name").value="";
  document.getElementById("fighter2_name").value="";
 }

  //show fight button
  $('.fight-button').removeClass('invisible');

  //bring in images only once
if (check == 2) {
    $('.gladiator1').removeClass('invisible').animateCss('rollIn');
    $('.gladiator2').removeClass('invisible').animateCss('rollIn');
    check++;
}

  $('#f1_name').text(fighter1.name)
  $('#f1_attack').text(fighter1.attack)
  $('#f1_hitpoints').text(fighter1.hitpoints)
  $('#f2_name').text(fighter2.name)
  $('#f2_attack').text(fighter2.attack)
  $('#f2_hitpoints').text(fighter2.hitpoints)
  
}


function move(){
  $('#sword, #sword2').animateCss('tada'); 
  //document.getElementById("sword").style.left =  + "px";
}

function scrollWin() {
    window.scrollBy(0, 800);
}

