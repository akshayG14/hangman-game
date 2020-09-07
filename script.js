console.log('JS loaded!!!');

const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-again-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

let selectedWord = '';

(function () {
  try {
    const tempWordList = ['javascript', 'application', 'design'];
    selectedWord = tempWordList[Math.floor(Math.random() * tempWordList.length)];
  } catch (e) { console.log('Error while getting random word: ', e); }
})();

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

displayWord();
