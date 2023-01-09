//call in some html elements to manipulate
var questionsElement = document.querySelector("#questions");
var timeElement = document.querySelector("#time");
var choicesElement = document.querySelector("#choices"); 
var submitButtonElement = document.querySelector("#submit");
var startButtonElement = document.querySelector("#start");
var initialsElement = document.querySelector("#initials");
var feedbackElement = document.querySelector("#feedback");
var startScreenElement = document.getElementById("start_screen");
var questionAsked = document.getElementById("questionasked");
var lastScreenElement = document.getElementById("last_screen");
var finalScoreElement = document.getElementById("final_score");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var currentQuestion;

//functionality to our start button which hides the start screen and display the questions
function startQuiz()
{
    //upon clicking start quiz the start screen disappeares and question appears
    startScreenElement.setAttribute("class" , "hide");

    //unhide the questions screen upon disappearing of the start screen
    questionsElement.removeAttribute("class");

    //after the first qustion screen appears, the timer should start
    timerId = setInterval(timeUpdater, 1000);

    //show our time
    timerId.textContent = timeElement;
     
    getQuestions();

}

//function to get question from questions .js file
function getQuestions()
{
    //get the first question from our array of questions
    currentQuestion = questions[currentQuestionIndex];

    //Fill in the  question asked to the user interface
    questionAsked.textContent = currentQuestion.questionasked

    //make the choices empty so it can accomodate the new choice from user
    choicesElement.innerHTML="";

    //go through all the choices to make available fot the current question
    currentQuestion.choices.forEach(function(choice, i)
    {

        //create buttons for all the choices we have
        var availableChoice = document.createElement("button");
        //give the choioce button a class and value;
        availableChoice.setAttribute("class", "choice");
        availableChoice.setAttribute("value", choice);

        availableChoice.textContent= i + 1 + ". " + choice;
        
        //add a click event to each available choice from the array
        availableChoice.onclick = questionClick;

        //dispolay on the user interface
        choicesElement.appendChild(availableChoice);
    });
}

function questionClick()
{
   //logic to check if user selected the wrong question
   if(this.value !== questions[currentQuestionIndex].answer){
    //if the choice is wrong then subtract time for that particular question
    time -= 15;

    if(time<0){
        time = 0;
    }


    //we display the new time on the UI

     timeElement.textContent = time;
     feedbackElement = "Wrong!";
     feedbackElement.style.color ="red";
     feedbackElement.style.fontWeight = "1000";
     feedbackElement.style.size = "500%";
   } 
   else 
   {
    feedbackElement = "Correct!";
     feedbackElement.style.color ="green";
     feedbackElement.style.fontWeight = "1000";
     feedbackElement.style.size = "500%";  
   }

   //we need to set the feedback area with the right/Wrong choice alert
   feedbackElement.setAttribute("class", "feedback");
   setTimeout(function(){
    feedbackElement.setAttribute("class", "feedback hide");
   }, 1000);

   //now we move to the next question by increamenting the index
   currentQuestionIndex++;

   //logic to check our questions array is exhauted
   //if exuhausted then call end quiz function otherwise keep answering via the getQuestions function

   if(currentQuestionIndex === questions.length){
    endOurQuiz();
   } else {
    getQuestions();
   }  

}

function endOurQuiz(){
    //we stop the time
    clearInterval(timerId);

    //we need to unhide our last screen by removing the hide class
    lastScreenElement.removeAttribute("class");

    //show our final scre to the UI
    finalScoreElement.textContent = time;

    //now we can hide the question section to give room for our last screen only which has the final score
    questionsElement.setAttribute("class" ,"hide");

    
}

function timeUpdater(){    
    //updates our time when need be
    time--;
    timeElement.textContent = time;

    //check if user has exhausted their time
    if(time<=0){
        endOurQuiz();
    }
}

function saveHighscore(){
    var initials = initialsElement.value.trim();

    if(initials !== " "){
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    
        // format new score object for current user
        var newScore = {
          score: time,
          initials: initials
        };
    
        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
    
        // redirect to next page
        window.location.href = "highscore.html";
    
    }


}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

//submit your entered initials by assigning your submit button to the saveHighscore function
initialsElement.onkeyup = checkForEnter;

submitButtonElement.onclick = saveHighscore();


// start quiz
startButtonElement.onclick = startQuiz;