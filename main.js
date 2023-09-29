let emojis = [
  "😵‍💫",
  "👻",
  "❄️",
  "👽",
  "🎃",
  "🦊",
  "🐙",
  "🌺",
  "☠️",
  "🧁",
  "😵‍💫",
  "👻",
  "❄️",
  "👽",
  "🎃",
  "🦊",
  "🐙",
  "🌺",
  "☠️",
  "🧁",
];
console.log(emojis);

let showCards = 0;
let time = 60;
let cardOne = null;
let cardTwo = null;
let firstResult = null;
let secondResult = null;
let score = 0;
let points = 0;
let movements = 0;
let temporizer = false;
let regresiveTime = null;
let tempoBack = document.getElementById("temp");
let totalPoints = document.getElementById("points");
let totalMovements = document.getElementById("movements");
let totalScore = document.getElementById("score");

function timer() {
  regresiveTime = setInterval(() => {
    time--;
    tempoBack.innerHTML = `Temporizador ⌛️: ${time}`;

    if (time === 0 && score < 10) {
      clearInterval(regresiveTime);
      blockTurnAllCards();
      totalScore.innerHTML = `Total Aciertos: ${score}`;
      totalPoints.innerHTML = `Total Puntos: ${points}`;
      tempoBack.innerHTML = `Falto poco ...`;
    }
  }, 1000);
}
function blockTurnAllCards() {
  for (let i = 0; i < emojis.length; i++) {
    let card = document.getElementById(i);
    card.innerHTML = emojis[i];
  }
}

function start() {
  movements = 0;
  points = 0;
  time = 60;
  score = 0;
  totalMovements.innerHTML = `Total Movimientos: ${movements}`;
  totalPoints.innerHTML = `Total Puntos: ${points}`;
  totalScore.innerHTML = `Total Aciertos: ${score}`;
  if (regresiveTime) {
    clearInterval(regresiveTime);
  }
  tempoBack.innerHTML = `Temporizador ⌛️: ${time}`;
  emojis = emojis.sort(() => Math.random() - 0.5);
  for (let i = 0; i < emojis.length; i++) {
    let card = document.getElementById(i);
    card.innerHTML = emojis[i];
    card.disabled = true;
  }

  setTimeout(() => {
    for (let i = 0; i < emojis.length; i++) {
      let card = document.getElementById(i);
      card.innerHTML = "";
      card.disabled = false;
    }
  }, 5000);
}

function turn(id) {
  if (temporizer == false) {
    timer();
    temporizer = true;
  }

  showCards++;

  if (showCards === 1) {
    cardOne = document.getElementById(id);
    firstResult = emojis[id];
    cardOne.innerHTML = firstResult;
    cardOne.disabled = true;
  } else if (showCards === 2) {
    cardTwo = document.getElementById(id);
    secondResult = emojis[id];
    cardTwo.innerHTML = secondResult;
    cardTwo.disabled = true;
    movements++;

    totalMovements.innerHTML = `Total Movimientos: ${movements}`;

    if (firstResult === secondResult) {
      showCards = 0;
      score++;
      points += 20;

      totalScore.innerHTML = `Total Aciertos: ${score}`;
      totalPoints.innerHTML = `Total Puntos: ${points}`;
    } else {
      points -= 5;
      totalPoints.innerHTML = `Total Puntos: ${points}`;
      setTimeout(() => {
        cardOne.innerHTML = "";
        cardTwo.innerHTML = "";
        cardOne.disabled = false;
        cardTwo.disabled = false;
        showCards = 0;
      }, 800);
    }
    if (score === 10) {
      //confeti();
      totalScore.innerHTML = `Total Aciertos: ${score}`;
      totalPoints.innerHTML = `Total Puntos: ${points}`;
      tempoBack.innerHTML = "Enhorabuena lo has logrado";
    }
  }
}
if (time === 0 && score < 10) {
  clearInterval(regresiveTime);
  blockTurnAllCards();
}
