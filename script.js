const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-again-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

let selectedWord = '';

function getRandomWord() {
  try {
    const tempWordList = ['javascript', 'application', 'design'];
    selectedWord = tempWordList[Math.floor(Math.random() * tempWordList.length)];
  } catch (e) { console.log('Error while getting random word: ', e); }
}

let correctLetters = [];
let wrongLetters = [];

function displayWord() {
  wordElement.innerHTML = `
  ${selectedWord
      .split('')
      .map(letter => `<span class="letter">
      ${correctLetters.includes(letter) ? letter : ''}
      </span>`)
      .join('')
    }`;

  const innerWord = wordElement.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations!!! You Won!!! 🥇";
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Update the wrong letters
function updateWrongLettersElement() {
  // display worng letters
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // check if last
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😞';
    popup.style.display = 'flex';
  }
}

// Keydown letter press
window.addEventListener('keydown', event => {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letterInput = event.key;
    if (selectedWord.includes(letterInput)) {
      if (!correctLetters.includes(letterInput)) {
        correctLetters.push(letterInput);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letterInput)) {
        wrongLetters.push(letterInput);
        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
});

// Restart the game
playAgainButton.addEventListener('click', () => {
  // Empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  getRandomWord();
  displayWord();

  updateWrongLettersElement();
  popup.style.display = 'none';
});

getRandomWord();
displayWord();
