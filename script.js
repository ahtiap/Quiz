//DOM Elements
var quiz = document.querySelector("#quiz");
var quizIntro = document.querySelector("#quizintro");
var start = document.querySelector("#start");
var timeEl = document.querySelector("#time");
var answerEl = document.querySelector("#answer");
var formEl = document.querySelector("#scoreForm");
var finalScore = document.querySelector("#score");
var head = document.querySelector("#head");
var submit = document.querySelector("#initSubmit");
var initialsEl = document.querySelector("#initials");
var ul = document.createElement("ul");

//user initial
var initials = localStorage.getItem("initials");
//score
var score = localStorage.getItem("score");
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
    correctAnswer: "Brendan Eich",
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm",
    },
    correctAnswer: "npm",
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint",
    },
    correctAnswer: "ESLint",
  },
];
var goodA;
//function to show each question after answer
function showQ() {
  if (index > 2) {
    return;
  } else {
    quizIntro.style.display = "none";
    // get question at the current index
    var curQ = myQuestions[index].question;
    // get answer at current index
    var curAs = myQuestions[index].answers;
    quiz.textContent = curQ;
    quiz.appendChild(ul);
    // loop to create new list items with answers and add them to the ul
    for (var key in myQuestions[index].answers) {
      if (curAs.hasOwnProperty(key)) {
        var element = curAs[key];
        var li = document.createElement("li");
        li.setAttribute("id", index);
        ul.appendChild(li);
        var button = document.createElement("button");
        button.textContent = element;
        li.appendChild(button);
      }
    }
    //get the correct answer for verification
    goodA = myQuestions[index].correctAnswer;
    //console.log(goodA);
    quiz.style.display = "block";
  }
}
//function to make the quiz
function createQuiz(event) {
  event.stopPropagation();
  event.preventDefault();
  showQ();
  setTime();
}

//function to check answer
function checkA(a) {
  //if answer is correct show the prompt
  if (a == goodA) {
    answerEl.style.display = "block";
    answerEl.textContent = "Correct!";
    //if answer is wrong show prompt and take 10 sec off the timer
  } else {
    answerEl.style.display = "block";
    answerEl.textContent = "wrong!";
    timer = timer - 10;
  }
}
//function to get user initials and display final score
function finalScoreF() {
  answerEl.style.display = "none";
  formEl.style.display = "block";
  quiz.style.display = "none";
  score = timer;
  localStorage.setItem("score", score);
  finalScore.textContent = score;
  clearInterval(setTime);
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
  e = event.target;
  if (e.matches("button")) {
    // if to check if any question is remaing
    if (index < 3) {
      //loop to remove last question
      while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
      }

      //increase index and the new question
      checkA(e.textContent);
      index++;

      showQ();
      //console.log(index);
      if (index == 3) {
        finalScoreF();
      }
    }
  }
});
