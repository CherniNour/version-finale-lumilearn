//variable decleration
let numbers=[];
let initialNumbers=[];
let expr=[];
let used=[];
let history = [];
let undoStack=[];
let target = 0;
let difficulty = "easy";
const SCORE_KEY = "mathgame_score";

//get elements from html
diff_select=document.getElementById("difficulty");
newgame_button=document.getElementById("new_game");
attempt_button=document.getElementById("attempt");
undo_button=document.getElementById("undo");
restart_button=document.getElementById("restart");
reset_button=document.getElementById("reset_game");
change_diff=document.getElementById("difficulty");
bonus_span=document.getElementById("bonus");
score_span=document.getElementById("score");
target_span=document.getElementById("target");
numbers_div=document.getElementById("numbers_container");
operator_div = document.getElementById("operators_container");
msg_div=document.getElementById("message");
expr_div=document.getElementById("expression");
history_div=document.getElementById("history");

//random number between a and b 
function randInt(a, b) 
{
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function setMessage(txt, ok = true) {
    msg_div.textContent = txt;
    msg_div.style.color = ok ? "green" : "red";
    setTimeout(() => { if (msg_div.textContent === txt) msg_div.textContent = ""; }, 2000);
}
function saveScore(v)
{
    localStorage.setItem(SCORE_KEY, v);
}
function loadScore()
{
    return parseInt(localStorage.getItem(SCORE_KEY) || "0");
}
function snapshot()
{
    undoStack.push({numbers: [...numbers],
        expr: [...expr],
        used: [...used],
        history: [...history]
    });
}
//generate a new game 
function generateGame()
{
    difficulty=diff_select.value;
    let count = difficulty ==="easy" ? 6: difficulty === "medium" ? 8 : 10;
    let bonus = difficulty ==="easy" ? 10: difficulty === "medium" ? 20 : 30;
    bonus_span.textContent=bonus;
    score_span.textContent = loadScore();
    numbers=[];
    for(let i=0;i<count;i++)
    {
        if(difficulty==="easy")
            numbers.push(randInt(1,20));
        else if(difficulty==="medium") 
            numbers.push(randInt(1,30));
        else
            numbers.push(randInt(1,30));

    }
    target = generateTarget(numbers);

    initialNumbers=[...numbers];
    expr = [];
    used = [];
    history = [];
    undoStack = [];
    render();
    setMessage("New puzzle generated");
}
function generateTarget(numbers) {

    let ops = ["+", "-", "*", "/"];
    let count = randInt(3,4);
    let selected = [];
    let copy = [...numbers];
    for (let i = 0; i < count; i++) {
        let idx = randInt(0, copy.length - 1);
        selected.push(copy.splice(idx, 1)[0]);
    }
    let result = selected[0];
    for (let i = 1; i < selected.length; i++) {

        let b = selected[i];
        let op = ops[randInt(0, ops.length - 1)];
        if (op === "/" && Math.abs(b) < 1e-9) {
            op = "+"; 
        }
        if (op === "*" && result * b > 200) {
            op = "+";
        }
        let expr = `${result} ${op} ${b}`;
        result = Math.abs(eval(expr));
        result = Math.abs(Math.floor(result)); 
        console.debug("Selected =", selected);
        console.debug("Op =", op);
        console.debug("Expr =", expr);
        console.debug("Result =", result);
    }
    if(numbers.includes(result) || result===0)
    {
        return generateTarget(numbers);
    }
    else
    {
        return result;
    }
}
// Ensure initial score load
document.addEventListener("DOMContentLoaded", () => {
    score_span.textContent = loadScore();
    // Re-linking buttons to new IDs if necessary
    document.getElementById("new_game").addEventListener("click", generateGame);
    document.getElementById("reset_game").addEventListener("click", resetScore);
    
    // Initial render
    generateGame();
});

// Update the message function to be more visible
function setMessage(txt, ok = true) {
    msg_div.textContent = txt;
    msg_div.style.color = ok ? "#2d5a4a" : "#d9534f";
    msg_div.style.fontWeight = "bold";
    msg_div.style.marginTop = "10px";
    setTimeout(() => { if (msg_div.textContent === txt) msg_div.textContent = ""; }, 3000);
}

// ... rest of the existing game logic ...


//assure that the target is reachable
/*function generateSolvableTarget(nums) {
    let arr = [...nums];
    while (arr.length > 1) {
        const i = randInt(0, arr.length - 1);
        const j = randInt(0, arr.length - 1);
        if (i === j) continue;

        const a = arr[i];
        const b = arr[j];

        const ops = ["+", "-", "*", "/"];
        const op = ops[randInt(0, ops.length - 1)];

        let result;

        if (op === "/" && b === 0) continue;
        result = eval(`${a}${op}${b}`);

        if (!Number.isFinite(result)) continue;

        arr.splice(Math.max(i, j), 1);
        arr.splice(Math.min(i, j), 1);
        arr.push(result);
    }

    return Math.round(arr[0]);
}*/
//render page
function renderNumbers() {
    numbers_div.innerHTML = "";
    // Ensure numbers are displayed in the order they appear in the array
    numbers.forEach((num, i) => {
        const btn = document.createElement("div");
        btn.className = "num";
        btn.textContent = num;
        
        // If the number was used in the current expression, make it look disabled
        if (used.includes(i)) {
            btn.style.opacity = "0.3";
            btn.style.pointerEvents = "none";
            btn.style.transform = "scale(0.9)";
        }

        btn.addEventListener("click", () => onNumberClick(i));
        numbers_div.appendChild(btn);
    });
}

function renderExpr()
{
    expr_div.textContent = expr.length === 0 ? "Your attempt" : expr.join(" ");
}

function renderHistory() {
    history_div.innerHTML = "";
    history.slice().reverse().forEach(h => {
        const div = document.createElement("div");
        div.textContent = h;
        history_div.appendChild(div);
    });
}

function render()
{
    target_span.textContent=target;
    loadScore();
    renderNumbers();
    renderExpr();
    renderHistory();
}
//events
function onNumberClick(i)
{
    snapshot();
    expr.push(String(numbers[i]));
    used.push(i);
    render();
}
function onOperatorClick(op) {
    if (expr.length === 0) {
        setMessage("Pick a number first", false);
        return;
    }

    const last = expr[expr.length - 1];
    if (["+","-","*","/"].includes(last)) {
        setMessage("Cannot put two operators", false);
        return;
    }
    snapshot();
    expr.push(op);
    render();
}
//apply button
function attempt()
{
    if (expr.length < 3) {
        setMessage("Build a valid expression", false);
        return;
    }
    const last = expr[expr.length - 1];
    if (["+","-","*","/"].includes(last)) {
        setMessage("Expression cannot end with operator", false);
        return;
    }
    const safeExpr = expr.join(" ");
    if (!/^[0-9+\-*/ ().]+$/.test(safeExpr)) {
        setMessage("Invalid characters", false);
        return;
    }

    let result;
    try {
        result = eval(safeExpr); // safe now because only digits/operators allowed
    } catch {
        setMessage("Invalid expression", false);
        return;
    }
    used.sort((a, b) => b - a);
    for (const i of used) {
        numbers.splice(i, 1);
    }

    snapshot();

    const rounded = Math.round((result * 100) / 100);
    numbers.push(rounded);

    history.push(`${safeExpr} = ${rounded}`);
    expr = [];
    used = [];
    render();
    checkWin();

}
//check if you have the correct number
function checkWin() {
    for (const n of numbers) {
        if (Math.abs(n - target) === 0) {
            const bonus = parseInt(bonus_span.textContent);
            const newScore = loadScore() + bonus;
            saveScore(newScore);
            score_span.textContent=parseInt(score_span.textContent)+bonus;
            render();
            setMessage(`You win! +${bonus} points`);
            generateGame();
            return;
        }
    }
}
//reset the score
function resetScore() {
    localStorage.removeItem(SCORE_KEY); 
    saveScore(0);                       
    generateGame();
    render();      
    setMessage("Score reset!",true);
}

//undo last action
function undo()
{
    if(undoStack.length ===0)
    {
        setMessage("Nothing to undo",false);
        return;
    }
    const snap=undoStack.pop();
    numbers = snap.numbers;
    expr = snap.expr;
    used = snap.used;
    history = snap.history;
    render();
    setMessage("Undo successful");
}
//like new game but with the same target
function restart()
{
    numbers = [...initialNumbers];
    expr = [];
    used = [];
    history = [];
    render();
    setMessage("Restart successful");
}

newgame_button.addEventListener("click",generateGame);
attempt_button.addEventListener("click",attempt);
undo_button.addEventListener("click", undo);
restart_button.addEventListener("click", restart);
reset_button.addEventListener("click",resetScore);
change_diff.addEventListener("change",generateGame);

Array.from(operator_div.querySelectorAll("button")).forEach(btn => {
    btn.addEventListener("click", () => onOperatorClick(btn.textContent));
});
if (isNaN(loadScore())) saveScore(0);
bonus_span.textContent = "10";

generateGame();
