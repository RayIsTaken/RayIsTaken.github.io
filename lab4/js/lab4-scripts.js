let zipElement = document.querySelector("#zipCode");
zipElement.addEventListener("change", displayCity);
let passwordElement = document.querySelector("#passwordClick");
passwordElement.addEventListener("click", suggestPassword);
let stateElement = document.querySelector("#state");
stateElement.addEventListener("change", displayCounty);
let userName = document.querySelector("#usernameText");
userName.addEventListener("input", checkAvailability);
let submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", checkSignUp);
let checkBool = false;

displayStates();

async function displayStates() // DO NOT FORGET async BEFORE TYPING FUNCTION WHEN USING APIs
{
    // ONE WAY OF DOING APIs
    let url = "https://csumb.space/api/allStatesAPI.php";
    try
    {
        const response = await fetch(url);
        if (!response.ok)
        {
            throw new Error("Error accessing API endpoint");
        }
        const data = await response.json();
        for (let i of data)
        {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            optionEl.value = i.usps;
            document.querySelector("#state").append(optionEl);
        }
        await displayCounty();
    } 
    catch (err)
    {
        if (err instanceof TypeError)
        {
            alert("Error accessing API endpoint (network failure)");
        }
        else
        {
            alert(err.message);
        }
    }
}

async function displayCity()
{
    // ANOTHER WAY OF DOING APIs
    let zipCode = zipElement.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url);
    let data = await response.json();
    if(!data)
    {
        document.querySelector("#stateError").textContent = "Zip code not found";
        document.querySelector("#city").textContent = "";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
    }
    else
    {
        document.querySelector("#stateError").textContent = "";
        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;
    }
    
}

async function displayCounty()
{
    let stateAbbreviation = document.querySelector("#state").value;
    let url = "https://csumb.space/api/countyListAPI.php?state=" + stateAbbreviation;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    document.getElementById("county").innerHTML = ""; // THIS EMPTIES THE SELECT, DO NOT FORGET !!!!
    for(let i of data)
    {
        let optionEl = document.createElement("option");
        optionEl.textContent = i.county;
        document.querySelector("#county").append(optionEl);
    }
}

async function checkAvailability()
{
    let userInput = document.querySelector("#usernameText").value;
    if(userInput == "")
    {
        document.querySelector("#usernameAvailabilityText").textContent = "";
    }
    else
    {
        let url = "https://csumb.space/api/usernamesAPI.php?username="+userInput;
        let response = await fetch(url);
        let data = await response.json();
        if(data.available)
        {
            document.querySelector("#usernameAvailabilityText").textContent = " This Username is Available";
            document.querySelector("#usernameAvailabilityText").style.color = "green";
            checkBool = true;
        }
        else
        {
            document.querySelector("#usernameAvailabilityText").textContent = " This Username is NOT Available";
            document.querySelector("#usernameAvailabilityText").style.color = "red";
            checkBool = false;
        }
    }
}

async function suggestPassword()
{
    let passwordSuggestedText = document.querySelector("#suggestPassword");
    let suggestedPW = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(suggestedPW);
    let data = await response.json();
    passwordSuggestedText.textContent = " Suggested Password: " + data.password;
}

function checkSignUp()
{
    let userNameInput = document.querySelector("#usernameText").value;
    let passwordCreationInput = document.querySelector("#passwordClick").value;
    let passwordConfirmationInput = document.querySelector("#passwordConfirm").value;
    let str = "<br>";
    let bool = true;
    if(userNameInput.length < 3)
    {
        str += "The Username must be 3 or more characters long! Retype Username!<br>";
        bool = false;
    }
    if(passwordCreationInput.length < 6)
    {
        str += "The Password must be 6 or more characters long! Retype Password!<br>";
        bool = false;
    }
    if(passwordCreationInput != passwordConfirmationInput)
    {
        str += "The Password inputs don't match! Retype Password again!<br>";
        bool = false;
    }
    if(bool)
    {
        str = "You signed up successfully!";
        document.querySelector("#submitConfirmation").innerHTML = str;
        document.querySelector("#submitConfirmation").style.color = "green";
    }
    else
    {
        str += "Sign up failed. Try again.";
        document.querySelector("#submitConfirmation").innerHTML = str;
        document.querySelector("#submitConfirmation").style.color = "red";
    }
}