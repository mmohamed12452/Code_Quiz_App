//call in some html elements to manupulatee
var questionsElement = document.querySelector("#questions");
var timeElement = document.querySelector("#time");
var choicesElement = document.querySelector("#choices"); 
var submitButtonElement = document.querySelector("#submit");
var startButtonElement = document.querySelector("#start");
var initialsElement = document.querySelector("#initials");
var feedbackElement = document.querySelector("#feedback");

var currentQuestionIndex = 0;
var timerId;