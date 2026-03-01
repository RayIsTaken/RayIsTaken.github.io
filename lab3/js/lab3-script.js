//event listeners
document.querySelector("#submitQuizz").addEventListener("click", gradeQuizz);
document.querySelector("#resetTries").addEventListener("click", resetTries);

//global variables
let score = 0;

let tries = localStorage.getItem("quizTries");

if (!tries) 
{
    tries = 0;
    localStorage.setItem("quizTries", tries);
} 
else
{
    tries = parseInt(tries, 10);
}

document.getElementById("textNumberTries").textContent = tries;

function shuffleQ1Choices()
{
    let q1Choices = ["Paris", "Bruxelles", "London", "Geneva"];
    q1Choices = _.shuffle(q1Choices);
    console.log(q1Choices); 

    for(let i of q1Choices)
    {
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = i;
        
        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        
        labelElement.prepend(radioElement);
        
        document.querySelector("#q1ChoicesDiv").append(labelElement);
        console.log(radioElement);
    }
}

shuffleQ1Choices();

//q1
function guessCapital()
{
    let userChoice = document.querySelector("input[name=q1]:checked").value;
    alert("Grading Quizz..." + userChoice);
    const resultIcon = document.getElementById("q1Image");

    if(userChoice == "Paris")
    {
        score += 20;
        
        const textElement = document.getElementById("q1Title");
        textElement.style.backgroundColor = "green";
        resultIcon.src = "img/correct.jpg";
        resultIcon.style.display = "inline";
    }
    else
    {
        const textElement = document.getElementById("q1Title");
        textElement.style.backgroundColor = "red";
        resultIcon.src = "img/incorrect.jpg";
        resultIcon.style.display = "inline";
    }
}

//q2
function guessContinent()
{
    let userInput = document.querySelector("#q2").value;
    const resultIcon = document.getElementById("q2Image");

    if(userInput == "africa")
    {
        score += 20;

        const textElement = document.getElementById("q2Title");
        textElement.style.backgroundColor = "green";
        resultIcon.src = "img/correct.jpg";
        resultIcon.style.display = "inline";
    }
    else
    {
        const textElement = document.getElementById("q2Title");
        textElement.style.backgroundColor = "red";
        resultIcon.src = "img/incorrect.jpg";
        resultIcon.style.display = "inline";
    }
}

//q3
function guessCSUMB()
{
    let userInput = document.querySelector("#selectInput").value;
    const resultIcon = document.getElementById("q3Image");

    if(userInput == "California")
    {
        score += 20;
        
        const textElement = document.getElementById("q3Title");
        textElement.style.backgroundColor = "green";
        resultIcon.src = "img/correct.jpg";
        resultIcon.style.display = "inline";
    }
    else
    {
        const textElement = document.getElementById("q3Title");
        textElement.style.backgroundColor = "red";
        resultIcon.src = "img/incorrect.jpg";
        resultIcon.style.display = "inline";
    }
}

//q4
function guessNumberStates()
{
    let userInput = document.querySelector("#numberInput").value;
    const resultIcon = document.getElementById("q4Image");

    if(userInput == 50)
    {
        score += 20;

        const textElement = document.getElementById("q4Title");
        textElement.style.backgroundColor = "green";
        resultIcon.src = "img/correct.jpg";
        resultIcon.style.display = "inline";
    }
    else
    {
        const textElement = document.getElementById("q4Title");
        textElement.style.backgroundColor = "red";
        resultIcon.src = "img/incorrect.jpg";
        resultIcon.style.display = "inline";
    }
}

//q5
function guessArctic()
{
    const resultIcon = document.getElementById("q5Image");

    if(document.querySelector("#checkWest").checked ||
    document.querySelector("#checkSouth").checked ||
    document.querySelector("#checkEast").checked)
    {
        const textElement = document.getElementById("q5Title");
        textElement.style.backgroundColor = "red";
        resultIcon.src = "img/incorrect.jpg";
        resultIcon.style.display = "inline";
    }
    else
    {
        score += 20;

        const textElement = document.getElementById("q5Title");
        textElement.style.backgroundColor = "green";
        resultIcon.src = "img/correct.jpg";
        resultIcon.style.display = "inline";
    }
}

function gradeQuizz()
{
    tries++;
    localStorage.setItem("quizTries", tries);
    document.getElementById("textNumberTries").textContent = tries;

    guessCapital()

    guessContinent();

    guessCSUMB();

    guessNumberStates();

    guessArctic();

    let scoreText = document.getElementById("scoreNumber");
    scoreText.textContent = "Score : " + score;

    const textCongrulation = document.getElementById("congratulation")
    if(score >= 80)
    {
        textCongrulation.style.display = "inline";
        textCongrulation.textContent = "Congratulation ! You scored 80 or more points !!"
        textCongrulation.style.color = "green";
    }
    else
    {
        textCongrulation.textContent = "Sorry ! You didn't score 80 or more points... Try again !!"
        textCongrulation.style.display = "inline";
        textCongrulation.style.color = "red";
    }
    score = 0;
}

function resetTries()
{
    tries = 0;
    localStorage.setItem("quizTries", tries);
    document.getElementById("textNumberTries").textContent = tries;   
}

