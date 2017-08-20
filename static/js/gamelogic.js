function newFighter(name) {
  ret = {
    hitpoints: 100,
    name: name
  }

  return ret;
}
console.log("sanity")

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var fighter1 = {
  hitpoints: 100,
  name: "Asshole",
  attack: null
}
var fighter2 = {
  hitpoints: 100,
  name: "Balls",
  attack: null
}


function rollDice() {
  console.log("rolling...")

  fighter1.attack = getRandomInt(0, 50);
  fighter2.attack = getRandomInt(0, 50);
  console.log(fighter1)

  fighter1.hitpoints -= fighter2.attack;
  fighter2.hitpoints -= fighter1.attack;
}

function updateFighterValues() {
  console.log("updating...")

  $('#f1_name').text(fighter1.name)
  $('#f1_attack').text(fighter1.attack)
  $('#f1_hitpoints').text(fighter1.hitpoints)
  $('#f2_name').text(fighter2.name)
  $('#f2_attack').text(fighter2.attack)
  $('#f2_hitpoints').text(fighter2.hitpoints)
  console.log(fighter1)
}
