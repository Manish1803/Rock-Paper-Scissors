const btnRules = document.querySelector(".btn-rules");
const btnClose = document.querySelector(".btn-close");
const modal = document.querySelector(".rules-modal");

const gameSec = document.querySelector(".game");
const resultSec = document.querySelector(".result");

const choices = document.querySelectorAll(".choice");
const picked = document.querySelectorAll(".picked");

const resultWinner = document.querySelector(".result-winner");
const resultTitle = document.querySelector(".result-title");
const btnPlayAgain = document.querySelector(".play-again");

const computerScore = document.querySelector(".score-com");
const playerScore = document.querySelector(".score-player");

const btnNext = document.querySelector(".btn-next");

const hurryScreen = document.querySelector(".hurry-screen");
const reset = document.querySelector(".reset");

const CHOICES = [
  {
    name: "rock",
    beats: "scissors",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "paper",
    beats: "rock",
  },
];

choices.forEach((btn) =>
  btn.addEventListener("click", () => {
    const choiceName = btn.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  })
);

function choose(choice) {
  const rand = Math.floor(Math.random() * CHOICES.length);
  const pcChoice = CHOICES[rand];
  displayResult([choice, pcChoice]);
  displayWinner([choice, pcChoice]);
}

function displayResult(result) {
  picked.forEach((pick, idx) => {
    setTimeout(() => {
      pick.innerHTML = `
        <div class="choice ${result[idx].name}">
          <img src="./img/icon-${result[idx].name}.png" alt="${result[idx].name}">
        </div>
      `;
    }, idx * 1000);
  });

  gameSec.classList.toggle("hidden");
  resultSec.classList.toggle("hidden");
}

function isWinner(result) {
  return result[0].beats === result[1].name;
}

// Update score

function handleScores(result = null) {
  const scoresJSON = sessionStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  if (result) {
    if (result === "user") {
      scores.user += 1;
    } else if (result === "comp") {
      scores.computer += 1;
    }

    sessionStorage.setItem("scores", JSON.stringify(scores));
  }

  computerScore.innerText = scores.computer;
  playerScore.innerText = scores.user;
}

handleScores();

function displayWinner(result) {
  setTimeout(() => {
    const userWins = isWinner(result);
    const aiWins = isWinner(result.reverse());

    if (userWins) {
      resultTitle.innerHTML = `You win<br>
      <span>Against PC</span>`;
      picked[0].classList.toggle("winner");
      handleScores("user");
      btnNext.classList.toggle("hidden");
      btnPlayAgain.innerHTML = "Play Again";
    } else if (aiWins) {
      resultTitle.innerHTML = `You Lose<br>
      <span>Against PC</span>`;
      picked[1].classList.toggle("winner");
      handleScores("comp");
      btnPlayAgain.innerHTML = "Play Again";
    } else {
      resultTitle.innerHTML = `TIE UP`;
      btnPlayAgain.innerHTML = "Replay";
    }

    resultWinner.classList.toggle("hidden");
    resultSec.classList.toggle("show-winner");
  }, 1000);
}

function playAgain() {
  gameSec.classList.toggle("hidden");
  resultSec.classList.toggle("hidden");
  btnNext.classList.toggle("hidden");

  picked.forEach((pick) => {
    pick.innerHTML = "";
    pick.classList.remove("winner");
  });

  resultTitle.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultSec.classList.toggle("show-winner");
}

btnPlayAgain.addEventListener("click", playAgain);

btnNext.addEventListener("click", () => {
  hurryScreen.classList.toggle("hidden");
});

reset.addEventListener("click", () => {
  hurryScreen.classList.toggle("hidden");
  playAgain();
});

/**
 * SHOW/HIDE MODAL
 */

btnRules.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
});
