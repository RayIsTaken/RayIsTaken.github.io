//event listeners
document.querySelector("button").addEventListener("click", gradeQuizz);

let score = 0;

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

function guessCapital()
{
    let userChoice = document.querySelector("input[name=q1]:checked").value;
    alert("Grading Quizz..." + userChoice);
    
    if(userChoice == "Paris")
    {
        score += 20;
        
        const textElement = document.getElementById("q1title");
        textElement.style.backgroundColor = "green";
    }
    else
    {
        const textElement = document.getElementById("q1title");
        textElement.style.backgroundColor = "red";
    }
}
function guessContinent()
{
    let userInput = document.querySelector("#q2").value;

    if(userInput == "africa")
    {
        score += 20;

        const textElement = document.getElementById("q2title");
        textElement.style.backgroundColor = "green";
    }
    else
    {
        const textElement = document.getElementById("q2title");
        textElement.style.backgroundColor = "red";
    }
}

function guessCSUMB()
{
    let userInput = document.querySelector("#selectInput").value;

    if(userInput == "California")
    {
        score += 20;
        
        const textElement = document.getElementById("q3title");
        textElement.style.backgroundColor = "green";
    }
    else
    {
        const textElement = document.getElementById("q3title");
        textElement.style.backgroundColor = "red";
    }
}

function guessNumberStates()
{
    let userInput = document.querySelector("#numberInput").value;

    if(userInput == 50)
    {
        score += 20;

        const textElement = document.getElementById("q4title");
        textElement.style.backgroundColor = "green";
    }
    else
    {
        const textElement = document.getElementById("q4title");
        textElement.style.backgroundColor = "red";
    }
}

function guessArctic()
{
    if(document.querySelector("#checkWest").checked ||
    document.querySelector("#checkNorth").checked ||
    document.querySelector("#checkEast").checked)
    {
        const textElement = document.getElementById("q5title");
        textElement.style.backgroundColor = "red";
    }
    else if(document.querySelector("#checkSouth").checked)
    {
        score += 20;

        const textElement = document.getElementById("q5title");
        textElement.style.backgroundColor = "green";
    }
    else
    {
        const textElement = document.getElementById("q5title");
        textElement.style.backgroundColor = "red";
    }
}

function gradeQuizz()
{
    guessCapital()

    guessContinent();

    guessCSUMB();

    guessNumberStates();

    guessArctic();

    let scoreText = document.getElementById("scoreNumber");
    scoreText.textContent = "Score : " + score; 
}


