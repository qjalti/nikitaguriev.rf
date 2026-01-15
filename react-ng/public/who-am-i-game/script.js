const characters = [
  "Данила Багров",
  "Шурик",
  "Иван Васильевич",
  "Кот Матроскин",
  "Дед Мороз",
  "Чебурашка",
  "Карлсон",
  "Антон Городецкий",
  "Геннадий Букин",
  "Шелдон Купер",
  "Оксимирон",
  "Моргенштерн",
  "Виктор Цой",
  "Юрий Дудь",
  "Илон Маск",
  "Ксения Собчак",
  "Альбус Дамблдор",
];

let playerCount = 0;
let currentPlayer = 1;
let assignedCharacters = [];
let gameActive = false;
let characterTimer;
let revealTimer;

function initGame() {
  const input = document.getElementById("playerCount");
  playerCount = parseInt(input.value);

  if (isNaN(playerCount) || playerCount < 2) {
    alert("Введите корректное число игроков (минимум 2)");
    return;
  }

  if (playerCount > characters.length) {
    alert("Слишком много игроков. Максимум: " + characters.length);
    return;
  }

  assignedCharacters = shuffleArray(characters).slice(0, playerCount);
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  gameActive = true;
  updateTurnText();
}

function updateTurnText() {
  document.getElementById("turnText").innerText = `Ход игрока ${currentPlayer}`;
  document.getElementById("characterName").innerText = "";
  document.getElementById("timerText").innerText = "";
  document.getElementById("showBtn").classList.remove("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
}

function startShow() {
  document.getElementById("showBtn").classList.add("hidden");
  let countdown = 3;
  document.getElementById("timerText").innerText =
    `Показ через ${countdown} секунд...`;

  characterTimer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      document.getElementById("timerText").innerText =
        `Показ через ${countdown} секунд...`;
    } else {
      clearInterval(characterTimer);
      revealCharacter();
    }
  }, 1000);
}

function revealCharacter() {
  if (!gameActive) return;
  const name = assignedCharacters[currentPlayer - 1];
  document.getElementById("characterName").innerText = name;

  let secondsLeft = 59;
  document.getElementById("timerText").innerText =
    `Осталось времени: ${secondsLeft} сек.`;
  document.getElementById("nextBtn").classList.remove("hidden");

  revealTimer = setInterval(() => {
    secondsLeft--;
    if (secondsLeft > 0) {
      document.getElementById("timerText").innerText =
        `Осталось времени: ${secondsLeft} сек.`;
    } else {
      clearInterval(revealTimer);
      nextPlayer();
    }
  }, 1000);
}

function skipToNext() {
  clearInterval(revealTimer);
  nextPlayer();
}

function nextPlayer() {
  currentPlayer = (currentPlayer % playerCount) + 1;
  updateTurnText();
}

function endGame() {
  clearInterval(characterTimer);
  clearInterval(revealTimer);
  gameActive = false;
  document.getElementById("game").classList.add("hidden");
  document.getElementById("end").classList.remove("hidden");
}

function restartGame() {
  location.reload();
}

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function enterFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
}
