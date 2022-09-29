const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = ["able", "act", "ball", "bank", "before", "behavior", "campaign", "capital", "chance", "data", "design", "deep", "effect", "economy", "election", "financial", "foreign", "general", "ground", "green", "guess", "herself", "human", "important", "interest", "issue", "job", "join", "kind", "kitchen", "lawyer", "lie", "little", "machine", "media", "moment", "name", "next", "nothing", "number", "occur", "only", "order", "parent", "party", "peace", "pick", "price", "put", "quick", "rate", "real", "reason", "relate", "right", "sea", "seven", "skill", "street", "think", "though", "together", "type", "under", "upon", "use", "very", "view", "violence", "wait", "walk", "weapon", "why", "window", "write", "yeah", "year", "young", "zebra"];


// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') 
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty')
    ? localStorage.getItem('difficulty')
    : 'medium';


// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}


addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time = 7;
    } else if (difficulty === 'medium') {
      time = 10;
    } else {
      time = 15;
    }

    updateTime();
  }
});



// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h3>Time ran out</h3>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}