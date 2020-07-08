//DOM Elements
var quiz = document.querySelector("#quiz");
var quizIntro = document.querySelector("#quizintro");
var start = document.querySelector("#start");
var timeEl = document.querySelector("#time");
var ul = document.createElement("ul");
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
//function to show each question after answer
function showQ() {
  quizIntro.style.display = "none";
  var curQ = myQuestions[index].question;
  var curAs = myQuestions[index].answers;
  quiz.textContent = curQ;
  quiz.appendChild(ul);
  for (var key in myQuestions[index].answers) {
    if (curAs.hasOwnProperty(key)) {
      var element = curAs[key];
        var li = document.createElement("li");
        li.setAttribute("id",index)
      ul.appendChild(li);
      var button = document.createElement("button");
      button.textContent = element;
      li.appendChild(button);
    }
  }
  quiz.style.display = "block";
}
//function to make the quiz
function createQuiz(event) {
  event.stopPropagation;
  showQ();
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
ul.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.matches("button")) {
      if (index < 2) {
        while (ul.firstChild) {
            ul.removeChild(ul.lastChild);
          }
          
       index++;
      showQ(); 
    }
      
  }
});
