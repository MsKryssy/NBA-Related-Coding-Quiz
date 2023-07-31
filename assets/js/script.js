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

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var initialsInput = document.querySelector('input');
var scoreList = document.getElementById('scoreList');
var highScoresList = [];

// add in event listeners for functionality
startButtonEl.addEventListener('click', startQuiz);
retryButtonEl.addEventListener('click', retry);
submitScoreButtonEl.addEventListener('click', submit);

// here is the questions variable setup
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
    answerA : "Los Angeles Lakers",
    answerB : "Boston Celtics",
    answerC : "Chicago Bulls",
    answerD : "Golden State Warriors",
    answer : "B"
    }, {
    question : "Who holds the record for the most triple-doubles in NBA history?",
    answerA : "Magic Johnson",
    answerB : "Russell Westbrook",
    answerC : "Oscar Robertson",
    answerD : "LeBron James",
    answer : "B"
    }, {
    question : "Which player has won the most NBA MVP awards?",
    answerA : "Michael Jordan",
    answerB : "Kareem Abdul-Jabbar",
    answerC : "LeBron James",
    answerD : "Bill Russell",
    answer : "B"
    }, {
    question : "Who is the youngest player to score 30,000 points in the NBA?",
    answerA : "Kobe Bryant",
    answerB : "Dirk Nowitzki",
    answerC : "Kevin Durant",
    answerD : "LeBron James",
    answer : "D"
    }, {
    question : "Which NBA team holds the record for most wins in a single regular season?",
    answerA : "Chicago Bulls",
    answerB : "Boston Celtics",
    answerC : "Golden State Warriors",
    answerD : "Los Angeles Lakers",
    answer : "C"
    }, {
    question : "Who is theNBA's all-time leader in assists?",
    answerA : "John Stockton",
    answerB : "Magic Johnson",
    answerC : "Steve Nash",
    answerD : "Chris Paul",
    answer : "B"
    }, {
    question : "Which player has won the most Defensive Player of the Year (DPOY) awards?",
    answerA : "Hakeem Olajuwon",
    answerB : "Ben Wallace",
    answerC : "Tim Duncan",
    answerD : "Dwight Howard",
    answer : "B"
    }, {
    question : "Who is the only player to have won an NBA championship, NCAA championship, and an Olympic Gold Medal in the same year?",
    answerA : "Shaquille O'Neal",
    answerB : "Larry Johnson",
    answerC : "Larry Bird",
    answerD : "Michael Johnson",
    answer : "C"
    }, {
    question : "Which NBA player has the highest career scoring average?",
    answerA : "Wilt Chamberlain",
    answerB : "Stephen Curry",
    answerC : "Elgin Baylor",
    answerD : "Michael Jordan",
    answer : "A"
    },
]
// this will give a record of the previous scores
function recordScore() {
    highScoresList = JSON.parse(localStorage.getItem("highScoresList"));
    if (!highScoresList) {
        highScoresList = [];
    }
};
// start the quiz functions here
function startQuiz() {
    recordScore();
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    runningQuestion = 0;
    timeLeft = totalTime;
    timeLeftEl.textContent = timeLeft;
    startTimer();
    showQuestion();
};

// functionality to display the current question
function showQuestion() {
    const currentQuestion = questions[runningQuestion];
    questionEl.textContent = currentQuestion.question;
    answerA.textContent = currentQuestion.answerA;
    answerB.textContent = currentQuestion.answerB;
    answerC.textContent = currentQuestion.answerC;
    answerD.textContent = currentQuestion.answerD;
}

// timer function
function startTimer() {
    timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftEl.textContent = timeLeft;
        } else if (timeLeft === 0) {
            scoreRender();
        }
    }, 1000);
}

// user answers functionality
function checkAnswer(answer) {
    const currentQuestion = questions[runningQuestion];
    if (answer === currentQuestion.answer) {
        // correct answer will add points
        score += 10;
    } else {
        // wrong answer will deduct time from the timer
        timeLeft -= 15;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    timeLeftEl.textContent = timeLeft;
    if (runningQuestion < lastQuestion && timeLeft > 0) {
        runningQuestion++;
        renderQuestion();
    } else {
        timerEl.textContent = "Ball Game Over",
        quizScreen.style.display = "none";
        highscoreScreen.style.display = "block";
        scoreRender();
    }
}
// renders the score page and the time left will be the score
function scoreRender() {
    clearInterval(timeInterval);
    startScreen.style.display = "none";
    quizScreen.style.display = "none";
    highscoreScreen.style.display = "block";
}

// restarts the quiz
function retry () {
    highscoreScreen.style.display = "none";
    startScreen.style.display = "block";
    timeLeftEl.textContent = "";
    timerEl.textContent = "Time =";
    timerEl.appendChild(timeLeftEl);
}
// submit score
function submit() {
    var submitHighestScore = {
        name: input.value, 
        score: timeLeft
    };
    highScoresList.push(submitHighestScore);
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
}