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
var lastDisplay = document.querySelector("#lastdisplay");
var lastInit = document.querySelector("#lastinit");
var lastScore = document.querySelector("#lastscore");
var retry = document.querySelector("#retry");
var viewScore = document.querySelector("#highscore");
var goBack = document.querySelector("#goback");
var ul = document.createElement("ul");

//sound effects
var wrong = new Audio("wrong.mp3");
var correct = new Audio("correct.mp3");

//countedown timer interval
var timerInterval;
//place to store all highscores history in the locsal storage
var allHighscores = JSON.parse(localStorage.getItem("scoreHistory")) || [];

// timer initial value
var timer = 60;
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
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "<script>",
      b: "<js>",
      c: "<javascript>",
      d: "<scripting>",
    },
    correctAnswer: "<script>",
  },
  {
    question:
      'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: {
      a: '<script name="xxx.js">',
      b: '<script href="xxx.js">',
      c: '<script src="xxx.js">',
    },
    correctAnswer: '<script name="xxx.js">',
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",
    answers: {
      a: "False",
      b: "True",
    },
    correctAnswer: "False",
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
// get the good answer for checking puposes
var goodA;

//function to check answer
function checkA(a) {
  //if answer is correct show the prompt
  if (a == goodA) {
    correct.play();
    answerEl.style.display = "block";
    answerEl.textContent = "Correct!";
    //fadeout answer promt
    setTimeout(fade_out, 1000);
    //if answer is wrong show prompt and take 10 sec off the timer
  } else {
    wrong.play();
    answerEl.style.display = "block";
    answerEl.textContent = "wrong!";
    timer = timer - 10;
    //fadeout answer promt
    setTimeout(fade_out, 1000);
  }
}

//function to show each question after answer
function showQ() {
  if (index > 5) {
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
//function to fadeoout answer element
var fade_out = function () {
  var a = $("#answer");
  a.fadeOut().empty();
};
//function to get user initials and display final score
function finalScoreF() {
  answerEl.style.display = "none";
  formEl.style.display = "block";
  quiz.style.display = "none";
  score = timer + 1;
  //store score
  finalScore.textContent = score;
}

//countdown function
function setTime() {
  timerInterval = setInterval(function () {
    timeEl.textContent = "Time: " + timer;
    timer--;
    if (timer === 0) {
      clearInterval(timerInterval);
      timer -= 1;
      finalScoreF();
    }
  }, 1000);
}
//function to make the quiz
function createQuiz(event) {
  event.stopPropagation();
  event.preventDefault();
  showQ();
  setTime();
}
start.addEventListener("click", createQuiz);
ul.addEventListener("click", function (event) {
  event.preventDefault();
  e = event.target;
  if (e.matches("button")) {
    // if to check if any question is remaing
    if (index < 6) {
      //loop to remove last question
      while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
      }

      //increase index and the new question
      checkA(e.textContent);
      index++;

      showQ();
      //console.log(index);
      if (index == 6) {
        clearInterval(timerInterval);
        finalScoreF();
      }
    }
  }
});
//store the results in the local storage
function allResults(i, s) {
  var results = { lastI: i, lastS: s };
  allHighscores.push(results);
  localStorage.setItem("scoreHistory", JSON.stringify(allHighscores));
}

//function to retry game
function retry() {
  e.preventDefault();
  timeEl.textContent = "Time: " + 0;
  index = 0;
  timer = 75;
  lastDisplay.style.display = "none";
  head.style.display = "block";
  quizIntro.style.display = "block";
}

//All events handling
submit.addEventListener("click", function highScore(e) {
  e.preventDefault();
  initials = initialsEl.value.trim();
  //console.log(init);
  //store initials and score
  allResults(initials, score);
  // var test=JSON.parse(localStorage.getItem("scoreHistory"))
  //console.log(test)

  formEl.style.display = "none";
  lastDisplay.style.display = "block";
  head.style.display = "none";
  lastInit.textContent = "1. " + initials + " ";
  lastScore.textContent = score;
});
retry.addEventListener("click", function retry(e) {
  e.preventDefault();
  timeEl.textContent = "Time: " + 0;
  index = 0;
  timer = 75;
  lastDisplay.style.display = "none";
  head.style.display = "block";
  quizIntro.style.display = "block";
});
//when clicking on view highscore
viewScore.addEventListener("click", function highScore(e) {
  e.preventDefault();
  initials = initialsEl.value.trim();
  //console.log(init);
  formEl.style.display = "none";
  lastDisplay.style.display = "block";
  quiz.style.display = "none";
  quizIntro.style.display = "none";
  head.style.display = "none";
  lastDisplay.textContent = "";
  var scoreList = JSON.parse(localStorage.getItem("scoreHistory"));
  console.log(scoreList);
  scoreList.forEach((element) => {
    var p = document.createElement("p");
    p.textContent = "1. " + element.lastI + "     " + element.lastS;
    lastInit.textContent = "1. " + element.lastI + " ";
    lastScore.textContent = element.lastS;
    lastDisplay.appendChild(p);
  });
  goBack.style.display = "block";
});
//function to get back to home page onclick
goBack.addEventListener("click", function retryF(e) {
  e.preventDefault();
  timeEl.textContent = "Time: " + 0;
  index = 0;
  timer = 75;
  lastDisplay.style.display = "none";
  head.style.display = "block";
  quizIntro.style.display = "block";
  goBack.style.display = "none";
});
