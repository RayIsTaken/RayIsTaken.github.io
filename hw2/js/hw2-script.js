    const words = ["planet","ocean","mountain","computer","javascript","library","hangman","program"];
    const maxWrong = 6;
    let selected = "";
    let revealed = [];
    let wrong = 0;
    let used = [];
const imageStages = [
  "img/hangman0.png",
  "img/hangman1.png",
  "img/hangman2.png",
  "img/hangman3.png",
  "img/hangman4.png",
  "img/hangman5.png",
  "img/hangman6.png"
];
    const imageWrap = document.getElementById("imageWrap");
    const wordRow = document.getElementById("wordRow");
    const messageEl = document.getElementById("message");
    const wrongCountEl = document.getElementById("wrongCount");
    const maxWrongEl = document.getElementById("maxWrong");
    const lettersSpan = document.getElementById("lettersSpan");
    const letterInput = document.getElementById("letterInput");
    const guessBtn = document.getElementById("guessBtn");
    const resetBtn = document.getElementById("resetBtn");
    maxWrongEl.textContent = maxWrong;
    function pickWord() {
    const idx = Math.floor(Math.random() * words.length);
    selected = words[idx];
    revealed = new Array(selected.length).fill("_");
    wrong = 0;
    used = [];
    updateUI();
    }
    function updateUI() {
    wordRow.innerHTML = "";
    for (let i = 0; i < revealed.length; i++) {
        const box = document.createElement("div");
        box.className = "letterBox";
        box.textContent = revealed[i] === "_" ? "" : revealed[i];
        wordRow.appendChild(box);
    }
    wrongCountEl.textContent = wrong;
    lettersSpan.textContent = used.join(", ");
    imageWrap.innerHTML = "";
    const img = document.createElement("img");
    img.src = imageStages[Math.min(wrong, imageStages.length - 1)];
    imageWrap.appendChild(img);
    if (wrong >= maxWrong) {
        messageEl.textContent = "You lost. The word was: " + selected;
        messageEl.style.color = "crimson";
        revealAll();
    } else if (!revealed.includes("_")) {
        messageEl.textContent = "You won! Nice job.";
        messageEl.style.color = "limegreen";
    } else {
        messageEl.textContent = "Guess the word";
        messageEl.style.color = "";
    }
    }
    function revealAll() {
    for (let i = 0; i < selected.length; i++) {
        revealed[i] = selected[i];
    }
    updateUI();
    }
    function handleGuessLetter(raw) {
    const letter = raw.toLowerCase();
    if (!/^[a-z]$/.test(letter)) {
        messageEl.textContent = "Please enter a single letter a-z.";
        return;
    }
    if (used.includes(letter)) {
        messageEl.textContent = "Letter already used.";
        return;
    }
    used.push(letter);
    let found = false;
    for (let i = 0; i < selected.length; i++) {
        if (selected[i] === letter) {
        revealed[i] = letter;
        found = true;
        }
    }
    if (!found) {
        wrong++;
        document.body.style.backgroundColor = wrong >= 4 ? "#2b0f1a" : "";
    }
    updateUI();
    }
    guessBtn.addEventListener("click", function() {
    const val = letterInput.value;
    handleGuessLetter(val);
    letterInput.value = "";
    letterInput.focus();
    });
    letterInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        guessBtn.click();
    }
    });
    resetBtn.addEventListener("click", function() {
    pickWord();
    letterInput.value = "";
    letterInput.focus();
    messageEl.style.color = "";
    });
    window.addEventListener("load", function() {
    pickWord();
    letterInput.focus();
    });