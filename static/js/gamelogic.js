//animate css
$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);
    });
  }
});

//images of the fighters
var bob = $('#bob-img');
var mike = $('#mike-img');
var frank = $('#frank-img');
var detlev = $('#detlev-img');
var swen = $('#swen-img');
var tim = $('#tim-img');
var ruben = $('#ruben-img');
var leela = $('#leela-img');
var karl = $('#karl-img');
var habib = $('#habib-img');
var tony = $('#tony-img');
var percival = $('#percival-img');
var manuel = $('#manuel-img');
var sarina = $('#sarina-img');
var trevor = $('#trevor-img');
var bertram = $('#bertram-img');
var lars = $('#lars-img');
var james = $('#james-img');

//delay for setTimeout
var animationTimer = 2000;

//music objects
var grunt = new Audio('audio/grunt2.m4a');
var deadSound = new Audio('audio/dying.m4a');
var swordClink = new Audio('audio/sword.wav');

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

  //make swords move
  move();

  $('.gladiator1, .gladiator2').animateCss('swing');

  //check to see if game has ended
  gameCheck();
  // combat sounds
  swordClink.play();

  //get attack values
  fighter1.attack = getRandomInt(0, 40);
  fighter2.attack = getRandomInt(0, 40);

  if (fighter1.attack == 0) {
    document.getElementById("f1_attack").innerHTML =
      fighter1.name + "<br>" + " has missed! ";
  } else if (fighter2.attack == 0) {
    document.getElementById("f2_attack").innerHTML =
      fighter2.name + "<br>" + " has missed! ";
  } else {
    document.getElementById("f1_attack").innerHTML = fighter1.name + "<br>" + " hits for: " + fighter1.attack;
    document.getElementById("f2_attack").innerHTML = fighter2.name + "<br>" + " hits for: " + fighter2.attack;
  }

  //display attack values on page


  fighter1.hitpoints -= fighter2.attack;
  fighter2.hitpoints -= fighter1.attack;

  $('#f1_hitpoints').text(fighter1.hitpoints)
  $('#f2_hitpoints').text(fighter2.hitpoints)
  gameCheck();
}


//is game over?
function gameCheck() {

  //if both lose
  if (fighter2.hitpoints <= 0 && fighter1.hitpoints <= 0) {
    deadSound.play()

    document.getElementById("f1_hitpoints").value = ""
    document.getElementById("f2_hitpoints").value = ""
    document.getElementById("fighter_both_result").innerHTML = "Both " + fighter1.name + " and " + fighter2.name + " Have Died!";

    $('.gladiator2, .gladiator1').animateCss('hinge');
    $('#sword2, #sword').animateCss('zoomOutDown');

    setTimeout(function () {
      $('.gladiator2, .sword2, sword').addClass('invisible');
      location.reload();
      confirm("Game is Over, " + fighter2.name + " and " + fighter1.name + " have lost. Click OK to reset.");
    }, animationTimer);
  }

  //-------------------------------------------------------------------------
  else if (fighter1.hitpoints <= 0) {
    deadSound.play()
    $('.sword2').addClass('invisible');
    $('#f1_hitpoints, #f2_hitpoints ').val("");

    document.getElementById("fighter1_result").innerHTML = fighter1.name + " Has Lost!";

    $('.gladiator1').animateCss('hinge');
    $('#sword2').animateCss('zoomOutDown');

    setTimeout(function () {
      $('#gladiator1').addClass('invisible');
      location.reload();
      confirm("Game is Over, " + fighter1.name + " has lost.  Click OK to reset");
    }, animationTimer);
  }

  //----------------------------------------------------------------------
  else if (fighter2.hitpoints <= 0) {
    deadSound.play()
    $('.sword').addClass('invisible');
    document.getElementById("f1_hitpoints").value = ""
    document.getElementById("f2_hitpoints").value = ""
    document.getElementById("fighter2_result").innerHTML = fighter2.name + " Has Lost!";

    $('#gladiator2').animateCss('hinge');
    //$('.gladiator1').animateCss('bounce');
    $('#sword').animateCss('zoomOutDown');

    setTimeout(function () {
      $('.gladiator2').addClass('invisible');
      location.reload();
      confirm("Game is Over, " + fighter2.name + " has lost.  Click OK to reset");
    }, animationTimer);

  }
}

//prevent repetition
var check = 2;

//update values
function updateFighterValues() {

 //scrollToTop();

  $('#sword, #sword2, #cancelFight').removeClass('invisible');
  $('.top, .staging-area').addClass('invisible').css({
    'height': '0',
    "padding": "0",
    "margin": "0",
    "min-height": "0",
    "margin-top": "-18px"
  });
  //do only once - the first time
  if (check == 2) {
    fighter1.name = document.getElementById("fighter1_name").value;
    fighter2.name = document.getElementById("fighter2_name").value;
    $('#fighter1_name, #fighter2_name').val("");
    $('.gladiator1, .gladiator2').removeClass('invisible').animateCss('rollIn');
    scrollWin();
    check++;
  }

  //show fight button
  $('.fight-button').removeClass('invisible');
  //update during fight
  $('#f1_name').text(fighter1.name)
  $('#f1_attack').text(fighter1.attack)
  $('#f1_hitpoints').text(fighter1.hitpoints)
  $('#f2_name').text(fighter2.name)
  $('#f2_attack').text(fighter2.attack)
  $('#f2_hitpoints').text(fighter2.hitpoints)
}


// function scrollToTop() {
//   window.scrollTo(0,0);
//   console.log('going to top now');
// }

function move() {
  $('#sword, #sword2').animateCss('flip');
  //document.getElementById("sword").style.left =  + "px";
}

function scrollWin() {
  window.scrollBy(0, 600);
}

//display fighter names on mouseover
function showName(name) {

  if (name == "bob") {
    $('#display-name').text('Bob');
  } else if (name == "mike") {
    $('#display-name').text('Mike');
  } else if (name == "frank") {
    $('#display-name').text('Frank');
  } else if (name == "detlev") {
    $('#display-name').text('Detlev');
  } else if (name == "detlev") {
    $('#display-name').text('Detlev');
  } else if (name == "swen") {
    $('#display-name').text('Swen');
  } else if (name == "tim") {
    $('#display-name').text('Tim');
  } else if (name == "ruben") {
    $('#display-name').text('Ruben');
  } else if (name == "leela") {
    $('#display-name').text('Leela');
  } else if (name == "karl") {
    $('#display-name').text('Karl');
  } else if (name == "habib") {
    $('#display-name').text('Habib');
  } else if (name == "tony") {
    $('#display-name').text('Tony');
  } else if (name == "percival") {
    $('#display-name').text('Percival');
  } else if (name == "manuel") {
    $('#display-name').text('Manuel');
  } else if (name == "sarina") {
    $('#display-name').text('Sarina');
  } else if (name == "trevor") {
    $('#display-name').text('Trevor');
  } else if (name == "bertram") {
    $('#display-name').text('Bertram');
  } else if (name == "lars") {
    $('#display-name').text('Lars');
  } else if (name == "james") {
    $('#display-name').text('James');
  }

}

function clearName() {
  $('#display-name').text("");
}

function clearFighterInputs() {
  $('#gladiator1').children('img').remove();
  $('#gladiator2').children('img').remove();

  $('#fighter1_name').val('');
  $('#fighter2_name').val('');
  $('#img-slot1').attr('src', '')
  $('#img-slot2').attr('src', '')
  $('#img-slot1').addClass('invisible');
  $('#img-slot2').addClass('invisible');
}

function cancelFight() {

  if (confirm('Are You Sure?')){
   location.reload();
}else{
   alert("Stay and Fight, Coward!")
}
}


function selectFighter(name) {

  if ($('#fighter1_name').val()) {
    $('#fighter2_name').val(name);

  } else {
    $('#fighter1_name').val(name);

  }

}




//stage fighter img
$('#bob').on({
  'click': function () {
    swordClink.play();
    //$('#bob').addClass('invisible');              
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/bob.jpg').animateCss('flipInY');
      $('#bob-img').clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/bob.jpg').animateCss('flipInY');
      $('#bob-img').clone().appendTo('#gladiator1');
    }

  }
});

$('#mike').on({
  'click': function () {
    swordClink.play();
    //$('#mike').addClass('invisible');              
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/mike.jpg').animateCss('flipInY');
      $('#mike-img').clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/mike.jpg').animateCss('flipInY');
      $('#mike-img').clone().appendTo('#gladiator1');
    }
  }
});

$('#frank').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/frank.jpg').animateCss('flipInY');
      $('#frank-img').clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/frank.jpg').animateCss('flipInY');
      $('#frank-img').clone().appendTo('#gladiator1');
    }
  }
});

$('#detlev').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/detlev.jpg').animateCss('flipInY');
      $('#detlev-img').clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/detlev.jpg').animateCss('flipInY');
      $('#detlev-img').clone().appendTo('#gladiator1');
    }
  }
});

$('#swen').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/swen.jpg').animateCss('flipInY');
      $('#swen-img').clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/swen.jpg').animateCss('flipInY');
      $('#swen-img').clone().appendTo('#gladiator1');
    }
  }
});

$('#tim').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/tim.jpg').animateCss('flipInY');
      $('#tim-img').clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/tim.jpg').animateCss('flipInY');
      $('#tim-img').clone().appendTo('#gladiator1');
    }
  }
});

$('#ruben').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/ruben.jpg').animateCss('flipInY');
      $('#ruben-img').clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/ruben.jpg').animateCss('flipInY');
      $('#ruben-img').clone().appendTo('#gladiator1');
    }
  }
});

$('#leela').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/leela.jpg').animateCss('flipInY');
      $('#leela-img').clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/leela.jpg').animateCss('flipInY');
      $('#leela-img').clone().appendTo('#gladiator1');
    }
  }
});

$('#karl').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/karl.jpg').animateCss('flipInY');
      $(karl).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/karl.jpg').animateCss('flipInY');
      $(karl).clone().appendTo('#gladiator1');
    }
  }
});

$('#habib').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/habib.jpg').animateCss('flipInY');
      $(habib).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/habib.jpg').animateCss('flipInY');
      $(habib).clone().appendTo('#gladiator1');
    }
  }
});

$('#tony').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/tony.jpg').animateCss('flipInY');
      $(tony).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/tony.jpg').animateCss('flipInY');
      $(tony).clone().appendTo('#gladiator1');
    }
  }
});

$('#percival').on({
  'click': function () {
    swordClink.play();

    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/percival.jpg').animateCss('flipInY');
      $(percival).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/percival.jpg').animateCss('flipInY');
      $(percival).clone().appendTo('#gladiator1');
    }
  }
});

$('#manuel').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/manuel.jpg').animateCss('flipInY');
      $(manuel).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/manuel.jpg').animateCss('flipInY');
      $(manuel).clone().appendTo('#gladiator1');
    }
  }
});

$('#sarina').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/sarina.jpg').animateCss('flipInY');
      $(sarina).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/sarina.jpg').animateCss('flipInY');
      $(sarina).clone().appendTo('#gladiator1');
    }
  }
});

$('#trevor').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/trevor.jpg').animateCss('flipInY');
      $(trevor).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/trevor.jpg').animateCss('flipInY');
      $(trevor).clone().appendTo('#gladiator1');
    }
  }
});

$('#bertram').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/bertram.jpg').animateCss('flipInY');
      $(bertram).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/bertram.jpg').animateCss('flipInY');
      $(bertram).clone().appendTo('#gladiator1');
    }
  }
});

$('#lars').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/lars.jpg').animateCss('flipInY');
      $(lars).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/lars.jpg').animateCss('flipInY');
      $(lars).clone().appendTo('#gladiator1');
    }
  }
});

$('#james').on({
  'click': function () {
    swordClink.play();
    if ($('#img-slot1').attr('src')) {
      $('#img-slot2').removeClass('invisible').attr('src', 'img/james.jpg').animateCss('flipInY');
      $(james).clone().appendTo('#gladiator2');
    } else {
      $('#img-slot1').removeClass('invisible').attr('src', 'img/james.jpg').animateCss('flipInY');
      $(james).clone().appendTo('#gladiator1');
    }
  }
});


function removeStagingImg1() {
  $('#fighter1_name').val('');
  $('#img-slot1').attr('src', '');
  $('#img-slot1').addClass('invisible');
}

function removeStagingImg2() {
  $('#fighter2_name').val('');
  $('#img-slot2').addClass('invisible');
  $('#img-slot2').attr('src', '');
}
