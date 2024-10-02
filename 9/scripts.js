const btnRollDice = document.getElementById('roll-dice-button'); // Let's try something like this
const diceResultParagraph = document.getElementById('dice-result-paragraph'); //I think it's better to do it in this way

function sayHelloExternal() {
    alert('Amongus');
    const audioElement = document.getElementById('audio-file');
    audioElement.play();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('hello-button-external');
    playButton.addEventListener('click', sayHelloExternal);
  });

function checkAge() {
  const age = prompt("Enter your age:");
  if (age >= 18) {
    alert("You are an adult.");
    document.getElementById('age-result').textContent = "You are an adult.";
  } else {
    alert("You are not an adult yet.");
    document.getElementById('age-result').textContent = "You are not an adult yet.";
  }
}
  
  document.addEventListener('DOMContentLoaded', () => {
    const checkAgeButton = document.getElementById('check-age-button');
    checkAgeButton.addEventListener('click', checkAge);
  });
  function checkDay() {
    const day = new Date().getDay();
    switch (day) {
      case 0:
        alert("Today is Sunday.");
        break;
      case 1:
        alert("Today is Monday.");
        break;
      case 2:
        alert("Today is Tuesday.");
        break;
      case 3:
        alert("Today is Wednesday.");
        break;
      case 4:
        alert("Today is Thursday.");
        break;
      case 5:
        alert("Today is Friday.");
        break;
      case 6:
        alert("Today is Saturday.");
        break;
      default:
        alert("Invalid day.");
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const checkDayButton = document.getElementById('check-day-button');
    checkDayButton.addEventListener('click', checkDay);
  });

  function generateNumbersList() {
    const numbersList = document.getElementById('numbers-list');
    for (let i = 1; i <= 10; i++) {
      const li = document.createElement('li');
      li.textContent = i;
      numbersList.appendChild(li);
    }
  }
  
  document.addEventListener('DOMContentLoaded', generateNumbersList);
let count = 0;

function countUp() {
  const countParagraph = document.getElementById('count-paragraph');
  while (count < 10) {
    countParagraph.textContent = `Count: ${count}`;
    count++;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const countButton = document.getElementById('count-button');
  countButton.addEventListener('click', countUp);
});

function rollDiceButtonClicked() {
  const diceResult = Math.floor(Math.random() * 6) + 1;
  const confirmResult = confirm(`You rolled a ${diceResult}. Do you want to roll again?`);
  if (confirmResult) {
    rollDiceButtonClicked(); // Roll again
  } else {
    diceResultParagraph.innerHTML = `You rolled a ${diceResult}. Game over!`;
  }
}