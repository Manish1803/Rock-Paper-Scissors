// Button and modal elements for showing rules
const btnRules = document.querySelector(".btn-rules");
const btnClose = document.querySelector(".btn-close");
const modal = document.querySelector(".rules-modal");

// Sections for game and result display
const gameSec = document.querySelector(".game");
const resultSec = document.querySelector(".result");

// Elements related to the game choices and results
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

// Add event listeners to each choice button
choices.forEach((btn) =>
  btn.addEventListener("click", () => {
    const choiceName = btn.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  })
);

// Function to handle the user's choice and randomly select the computer's choice
function choose(choice) {
  const rand = Math.floor(Math.random() * CHOICES.length);
  const pcChoice = CHOICES[rand];
  displayResult([choice, pcChoice]);
  displayWinner([choice, pcChoice]);
}

// Function to display the result of the game
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

// Function to check is the winner
function isWinner(result) {
  return result[0].beats === result[1].name;
}

// Reset scores if the tab is not just reloaded
if (!sessionStorage.getItem("reloaded")) {
  localStorage.setItem("scores", JSON.stringify({ user: 0, computer: 0 }));
} else {
  sessionStorage.removeItem("reloaded");
}

// Function to handle scores
function handleScores(result = null) {
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  if (result) {
    if (result === "user") {
      scores.user += 1;
    } else if (result === "comp") {
      scores.computer += 1;
    }

    localStorage.setItem("scores", JSON.stringify(scores));
  }

  computerScore.innerText = scores.computer;
  playerScore.innerText = scores.user;
}

handleScores();

// Function to determine and display the winner
function displayWinner(result) {
  setTimeout(() => {
    const userWins = isWinner(result);
    const compWins = isWinner(result.reverse());

    if (result[0].name === result[1].name) {
      resultTitle.innerHTML = `TIE UP`;
      btnPlayAgain.innerHTML = "Replay";

      btnNext.classList.add("hidden");
    } else if (userWins) {
      resultTitle.innerHTML = `You win<br>
      <span>Against PC</span>`;
      btnPlayAgain.innerHTML = "Play Again";
      picked[0].classList.toggle("winner");

      handleScores("user");
      btnNext.classList.remove("hidden");
    } else if (compWins) {
      resultTitle.innerHTML = `You Lose<br>
      <span>Against PC</span>`;
      btnPlayAgain.innerHTML = "Play Again";
      picked[1].classList.toggle("winner");

      handleScores("comp");
      btnNext.classList.add("hidden");
    }

    resultWinner.classList.toggle("hidden");
    resultSec.classList.toggle("show-winner");
  }, 1000);
}

// Function to handle the "Play Again" button
function playAgain() {
  gameSec.classList.toggle("hidden");
  resultSec.classList.toggle("hidden");

  // Next button
  const userScore = playerScore.innerText;
  const compScore = computerScore.innerText;
  if (userScore > compScore) {
    btnNext.classList.remove("hidden");
  } else {
    btnNext.classList.add("hidden");
  }

  picked.forEach((pick) => {
    pick.innerHTML = "";
    pick.classList.remove("winner");
  });

  resultTitle.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultSec.classList.toggle("show-winner");
}

// Event listeners for modal display and reset actions
btnPlayAgain.addEventListener("click", playAgain);

btnNext.addEventListener("click", () => {
  hurryScreen.classList.toggle("hidden");
});

reset.addEventListener("click", () => {
  hurryScreen.classList.toggle("hidden");
  playAgain();
});

// Event listeners for showing/hiding the rules modal
btnRules.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
});

// Storage reload

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("reloaded", "true");
});
