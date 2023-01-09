//call in some html elements to manipulate
var questionsElement = document.querySelector("#questions");
var timeElement = document.querySelector("#time");
var choicesElement = document.querySelector("#choices"); 
var submitButtonElement = document.querySelector("#submit");
var startButtonElement = document.querySelector("#start");
var initialsElement = document.querySelector("#initials");
var feedbackElement = document.querySelector("#feedback");
var startScreenElement = document.getElementById("start_screen");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//functionality to our start button which hides the start screen and display the questions
function startQuiz()
{
    //upon clicking start quiz the start screen disapperas and question appears
    startScreenElement.setAttribute("class" , "hide");

    //unhide the questions screen upon disappearing of the start screen
    questionsElement.removeAttribute("class");

    //after the first qustion screen appears, the timer should start
    timerId = setInterval(clockTick, 1000);

    //show our time
    timerId.textContent = timeElement;


}