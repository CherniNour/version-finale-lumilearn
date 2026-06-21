let numbers = [];
let initialNumbers = [];
let expr = [];
let used = [];
let history = [];
let undoStack = [];
let target = 0;
let difficulty = "easy";
const SCORE_KEY = "mathgame_score";

// Récupération des éléments
const diff_select = document.getElementById("difficulty");
const newgame_button = document.getElementById("new_game");
const attempt_button = document.getElementById("attempt");
const undo_button = document.getElementById("undo");
const restart_button = document.getElementById("restart");
const reset_button = document.getElementById("reset_game");
const change_diff = document.getElementById("difficulty");
const bonus_span = document.getElementById("bonus");
const score_span = document.getElementById("score");
const target_span = document.getElementById("target");
const numbers_div = document.getElementById("numbers_container");
const operator_div = document.getElementById("operators_container");
const msg_div = document.getElementById("message");
const expr_div = document.getElementById("expression");
const history_div = document.getElementById("history");

function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

function setMessage(txt, ok = true) {
    msg_div.textContent = txt;
    msg_div.style.color = ok ? "green" : "red";
    setTimeout(() => { if (msg_div.textContent === txt) msg_div.textContent = ""; }, 3000);
}

function saveScore(v) { localStorage.setItem(SCORE_KEY, v); }
function loadScore() { return parseInt(localStorage.getItem(SCORE_KEY) || "0"); }

function snapshot() {
    undoStack.push({numbers: [...numbers], expr: [...expr], used: [...used], history: [...history]});
}

function generateGame() {
    difficulty = diff_select.value;
    let count = difficulty === "easy" ? 6 : difficulty === "medium" ? 8 : 10;
    let bonus = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
    bonus_span.textContent = bonus;
    score_span.textContent = loadScore();
    numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(difficulty === "easy" ? randInt(1, 20) : randInt(1, 30));
    }
    target = generateTarget(numbers);
    initialNumbers = [...numbers];
    expr = []; used = []; history = []; undoStack = [];
    render();
    setMessage("Nouveau puzzle généré");
}

function generateTarget(nums) {
    let ops = ["+", "-", "*", "/"];
    let copy = [...nums];
    let selected = [];
    for (let i = 0; i < randInt(3, 4); i++) {
        selected.push(copy.splice(randInt(0, copy.length - 1), 1)[0]);
    }
    let res = selected[0];
    for (let i = 1; i < selected.length; i++) {
        let op = ops[randInt(0, ops.length - 1)];
        let b = selected[i];
        if (op === "/" && (b === 0 || res % b !== 0)) op = "+";
        res = Math.abs(eval(`${res}${op}${b}`));
    }
    res = Math.floor(res);
    return (nums.includes(res) || res === 0) ? generateTarget(nums) : res;
}

function renderNumbers() {
    numbers_div.innerHTML = "";
    numbers.forEach((num, i) => {
        const btn = document.createElement("div");
        btn.className = "num";
        btn.textContent = num;
        if (used.includes(i)) { btn.style.opacity = "0.3"; btn.style.pointerEvents = "none"; }
        btn.addEventListener("click", () => {
            snapshot();
            expr.push(String(numbers[i]));
            used.push(i);
            render();
        });
        numbers_div.appendChild(btn);
    });
}

function render() {
    target_span.textContent = target;
    renderNumbers();
    expr_div.textContent = expr.length === 0 ? "Votre essai" : expr.join(" ");
    history_div.innerHTML = "";
    history.slice().reverse().forEach(h => {
        const div = document.createElement("div");
        div.textContent = h;
        history_div.appendChild(div);
    });
}

function onOperatorClick(op) {
    if (expr.length === 0) { setMessage("Choisissez d'abord un nombre", false); return; }
    if (["+", "-", "*", "/"].includes(expr[expr.length - 1])) { setMessage("Impossible de mettre deux opérateurs", false); return; }
    snapshot();
    expr.push(op);
    render();
}

function attempt() {
    if (expr.length < 3) { setMessage("Construisez une expression valide", false); return; }
    if (["+", "-", "*", "/"].includes(expr[expr.length - 1])) { setMessage("L'expression ne peut pas finir par un opérateur", false); return; }
    let res;
    try { res = eval(expr.join(" ")); } catch { setMessage("Expression invalide", false); return; }
    
    used.sort((a, b) => b - a).forEach(i => numbers.splice(i, 1));
    snapshot();
    let rounded = Math.round(res);
    numbers.push(rounded);
    history.push(`${expr.join(" ")} = ${rounded}`);
    expr = []; used = [];
    render();
    if (numbers.some(n => n === target)) {
        let b = parseInt(bonus_span.textContent);
        saveScore(loadScore() + b);
        setMessage(`Bravo ! +${b} points`);
        setTimeout(generateGame, 2000);
    }
}

function resetScore() { saveScore(0); generateGame(); setMessage("Score réinitialisé !"); }
function undo() {
    if (undoStack.length === 0) { setMessage("Rien à annuler", false); return; }
    let snap = undoStack.pop();
    numbers = snap.numbers; expr = snap.expr; used = snap.used; history = snap.history;
    render(); setMessage("Annulation réussie");
}
function restart() { numbers = [...initialNumbers]; expr = []; used = []; history = []; render(); setMessage("Redémarrage réussi"); }

document.addEventListener("DOMContentLoaded", () => {
    newgame_button.onclick = generateGame;
    attempt_button.onclick = attempt;
    undo_button.onclick = undo;
    restart_button.onclick = restart;
    reset_button.onclick = resetScore;
    change_diff.onchange = generateGame;
    Array.from(operator_div.querySelectorAll("button")).forEach(btn => {
        btn.onclick = () => onOperatorClick(btn.textContent);
    });
    generateGame();
});