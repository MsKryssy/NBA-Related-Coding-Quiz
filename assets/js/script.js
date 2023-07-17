var startScreen = document.getElementById('startScreen');
var startButtonEl = document.getElementById('start-btn');
var timerEl = document.getElementById('timer');
var timeLeftEl = document.getElementById('timeLeft');
var totalTime = 75;
var timeLeft;
var timeInterval;

var quizScreen = document.getElementById('quizScreen');
var highscoreScreen = document.getElementById('highscoreScreen');

var questionEl = document.getElementById('question');
var answerA = document.getElementById('A');
var answerB = document.getElementById('B');
var answerC = document.getElementById('C');
var answerD = document.getElementById('D');

var retryButtonEl = document.getElementById('retry');
var submitScoreButtonEl = document.getElementById('submitScore');
var scoreEl = document.getElementById('score');

var lastquestion = questions.length - 1;
var runningQuestion = 0;
var initialsInput = document.querySelector('input');
var scoreList = document.getElementById('scoreList');
var highScoresList = [];

// add in event listeners for functionality
startButtonEl.addEventListener('click', startQuiz);
retryButtonEl.addEventListener('click', retry);
submitScoreButtonEl.addEventListener('click', submit);

var questions = [
    {
    question : "Who is the all-time leading scorer in NBA history?",
    answerA : "Michael Jordan",
    answerB : "Kobe Bryant",
    answerC : "Kareem Abdul-Jabbar",
    answerD : "LeBron James",
    answer : "D"
    }, {
    question : "Which NBA team has won the most championships?",
    options : ["Los Angeles Lakers", "Boston Celtics", "Chicago Bulls", "Golden State Warriors"],
    answer : "Boston Celtics"
    },
]