//DOM Elements
var quiz = document.querySelector("#quiz");
var quizIntro = document.querySelector("#quizintro");
var start = document.querySelector("#start");
var timeEl = document.querySelector("#time");

//user initial
var initials = " ";
//score
var score = 0;
// timer initial value
var timer = 75;
//index for questions
var index = 0;
//array of objects containing questions and correct answer
var myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich",
    },
    correctAnswer: "c",
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm",
    },
    correctAnswer: "c",
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint",
    },
    correctAnswer: "d",
  },
];

//function to make the quiz
function createQuiz(event) {
  event.stopPropagation();
  quizIntro.style.display = "none";
  var curQ = myQuestions[index].question;
    quiz.textContent = curQ;
  quiz.style.display = "block";

  setTime();
}

//countdown function
function setTime() {
  var timerInterval = setInterval(function () {
    timeEl.textContent = "Time: " + timer;
    timer--;
    if (timer === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

start.addEventListener("click", createQuiz);
