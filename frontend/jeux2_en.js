// Game global state
let cards = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timer = null;
let secondsElapsed = 0;
let gameStarted = false;
let boardLocked = false;

// DOM elements
const board = document.getElementById("board");
const timerVal = document.getElementById("timerVal");
const movesVal = document.getElementById("movesVal");
const bestScoreVal = document.getElementById("bestScoreVal");
const restartBtn = document.getElementById("restartBtn");
const resetBestBtn = document.getElementById("resetBestBtn");

// Victory Modal elements
const victoryModal = document.getElementById("victoryModal");
const finalTimeVal = document.getElementById("finalTimeVal");
const finalMovesVal = document.getElementById("finalMovesVal");
const newRecordMsg = document.getElementById("newRecordMsg");
const replayBtn = document.getElementById("replayBtn");

// Sound Synthesizer via Web Audio API
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    initAudio();
    if (!audioCtx) return;
    
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === "match") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === "mismatch") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (type === "victory") {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C octave
        notes.forEach((freq, idx) => {
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            o.connect(g);
            g.connect(audioCtx.destination);
            o.type = "sine";
            o.frequency.setValueAtTime(freq, now + idx * 0.1);
            g.gain.setValueAtTime(0.15, now + idx * 0.1);
            g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.25);
            o.start(now + idx * 0.1);
            o.stop(now + idx * 0.1 + 0.3);
        });
    }
}

// Cards Data - Picture (emoji) paired with Name (text)
const animalPairs = [
    { text: "🐶", matchId: 1, type: "emoji" }, { text: "Dog", matchId: 1, type: "text" },
    { text: "🐱", matchId: 2, type: "emoji" }, { text: "Cat", matchId: 2, type: "text" },
    { text: "🦁", matchId: 3, type: "emoji" }, { text: "Lion", matchId: 3, type: "text" },
    { text: "🐻", matchId: 4, type: "emoji" }, { text: "Bear", matchId: 4, type: "text" },
    { text: "🐼", matchId: 5, type: "emoji" }, { text: "Panda", matchId: 5, type: "text" },
    { text: "🐸", matchId: 6, type: "emoji" }, { text: "Frog", matchId: 6, type: "text" },
    { text: "🦊", matchId: 7, type: "emoji" }, { text: "Fox", matchId: 7, type: "text" },
    { text: "🐙", matchId: 8, type: "emoji" }, { text: "Octopus", matchId: 8, type: "text" }
];

// Shuffle algorithm (Fisher-Yates)
function shuffle(array) {
    let copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Initialise Game state
function initGame() {
    clearInterval(timer);
    timer = null;
    secondsElapsed = 0;
    moves = 0;
    matchedCount = 0;
    gameStarted = false;
    boardLocked = false;
    flippedCards = [];
    
    timerVal.textContent = "00:00";
    movesVal.textContent = "0";
    victoryModal.classList.remove("active");
    newRecordMsg.style.display = "none";
    
    loadBestScore();

    cards = shuffle(animalPairs);

    renderBoard();
}

// Render board
function renderBoard() {
    board.innerHTML = "";
    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.className = "memory-card";
        cardElement.dataset.index = index;
        cardElement.dataset.matchId = card.matchId;

        const frontClass = card.type === "text" ? "card-front text-card" : "card-front";

        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="${frontClass}">${card.text}</div>
                <div class="card-back"></div>
            </div>
        `;

        cardElement.addEventListener("click", () => handleCardClick(cardElement, index));
        board.appendChild(cardElement);
    });
}

// Handle card click
function handleCardClick(cardEl, index) {
    if (boardLocked || cardEl.classList.contains("flipped") || cardEl.classList.contains("matched")) {
        return;
    }

    initAudio();
    playSound("click");

    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    cardEl.classList.add("flipped");
    flippedCards.push(cardEl);

    if (flippedCards.length === 2) {
        moves++;
        movesVal.textContent = moves;
        checkMatch();
    }
}

// Match check logic
function checkMatch() {
    boardLocked = true;
    const [card1, card2] = flippedCards;

    const matchId1 = card1.dataset.matchId;
    const matchId2 = card2.dataset.matchId;

    if (matchId1 === matchId2) {
        setTimeout(() => {
            card1.classList.add("matched");
            card2.classList.add("matched");
            playSound("match");
            
            matchedCount += 2;
            flippedCards = [];
            boardLocked = false;

            if (matchedCount === cards.length) {
                handleVictory();
            }
        }, 300);
    } else {
        setTimeout(() => {
            card1.classList.add("shake");
            card2.classList.add("shake");
            playSound("mismatch");
        }, 300);

        setTimeout(() => {
            card1.classList.remove("flipped", "shake");
            card2.classList.remove("flipped", "shake");
            flippedCards = [];
            boardLocked = false;
        }, 1200);
    }
}

// Timer clock
function startTimer() {
    secondsElapsed = 0;
    timer = setInterval(() => {
        secondsElapsed++;
        let mins = Math.floor(secondsElapsed / 60);
        let secs = secondsElapsed % 60;
        timerVal.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

// Victory screen trigger
function handleVictory() {
    clearInterval(timer);
    playSound("victory");

    const isNewRecord = saveBestScore(moves);
    saveBestTime(secondsElapsed);

    finalTimeVal.textContent = timerVal.textContent;
    finalMovesVal.textContent = moves;
    
    if (isNewRecord) {
        newRecordMsg.style.display = "block";
    } else {
        newRecordMsg.style.display = "none";
    }

    setTimeout(() => {
        victoryModal.classList.add("active");
    }, 500);
}

// LocalStorage score persistence
function loadBestScore() {
    const best = localStorage.getItem('memory_best_score');
    bestScoreVal.textContent = best ? best : '-';
}

function saveBestScore(currentMoves) {
    const best = localStorage.getItem('memory_best_score');
    if (!best || currentMoves < parseInt(best)) {
        localStorage.setItem('memory_best_score', currentMoves);
        loadBestScore();
        return true;
    }
    return false;
}

// Best time persistence
function loadBestTime() {
    const best = localStorage.getItem('memory_best_time');
    if (best) {
        const mins = Math.floor(parseInt(best) / 60);
        const secs = parseInt(best) % 60;
        document.getElementById('bestTimeVal').textContent =
            `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
    } else {
        document.getElementById('bestTimeVal').textContent = '-';
    }
}

function saveBestTime(currentSeconds) {
    const best = localStorage.getItem('memory_best_time');
    if (!best || currentSeconds < parseInt(best)) {
        localStorage.setItem('memory_best_time', currentSeconds);
        loadBestTime();
    }
}

function resetBestScore() {
    localStorage.removeItem('memory_best_score');
    localStorage.removeItem('memory_best_time');
    loadBestScore();
    loadBestTime();
    playSound("click");
}

// Event Bindings
restartBtn.addEventListener("click", initGame);
resetBestBtn.addEventListener("click", resetBestScore);
replayBtn.addEventListener("click", initGame);

// Load init
document.addEventListener("DOMContentLoaded", () => {
    loadBestTime();
    initGame();
});
