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
    question : "Who is the NBA's all-time leader in assists?",
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

var startButtonEl = document.getElementById('start');
var timerEl = document.getElementById('timer');
var timeLeftEl = document.getElementById('timeLeft');
var totalTime = 45;
var score = 0;
var timeLeft;
var timeInterval;

var startScreenEl = document.getElementById('startScreen');
var quizScreenEl = document.getElementById('quizScreen');
var highscoreScreenEl = document.getElementById('highscoreScreen');

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

answerA.addEventListener('click', function() {
    checkAnswer('A');
});
answerB.addEventListener('click', function() {
    checkAnswer('B');
});
answerC.addEventListener('click', function() {
    checkAnswer('C');
});
answerD.addEventListener('click', function() {
    checkAnswer('D');
});

// add in event listeners for functionality
startButtonEl.addEventListener('click', startQuiz);
retryButtonEl.addEventListener('click', retry);
submitScoreButtonEl.addEventListener('click', submit);

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
    startScreenEl.style.display = "none";
    quizScreenEl.style.display = "block";
    runningQuestion = 0;
    timeLeft = totalTime;
    timeLeftEl.textContent = timeLeft;
    startTimer();
    renderQuestion();
};

// renders questions to an empty div
function renderQuestion() {
    var currentQuestion = questions[runningQuestion];
    questionEl.innerHTML = currentQuestion.question;
    answerA.innerHTML = currentQuestion.answerA;
    answerB.innerHTML = currentQuestion.answerB;
    answerC.innerHTML = currentQuestion.answerC;
    answerD.innerHTML = currentQuestion.answerD;
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
    if (answer === questions[runningQuestion].answer) {
        // correct answer will add points
        score += 10;
    } else {
        timeLeft -= 5;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
       setTimeout(function() {
        timeLeftEl.style.color = "";
        runningQuestion++;
        if (runningQuestion <= lastQuestion) {
            renderQuestion();
        } else {
            timerEl.textContent = "Ball Game Over",
            quizScreenEl.style.display = "none";
            highscoreScreenEl.style.display = "block";
            scoreRender();
            }
       }, 1000);
    return;
    }
    
//     timeLeftEl.textContent = timeLeft;
//     if (runningQuestion < lastQuestion && timeLeft > 0) {
//         runningQuestion++;
//         renderQuestion();
//     } else {
        
//     }
// }

// renders the score page and the time left will be the score
function scoreRender() {
    clearInterval(timeInterval);
    startScreenEl.style.display = "none";
    quizScreenEl.style.display = "none";
    highscoreScreenEl.style.display = "block";
    scoreEl.style.display= "flex";
    scoreEl.innerHTML = timeLeft;
}

// restarts the quiz
function retry () {
    highscoreScreenEl.style.display = "none";
    startScreenEl.style.display = "block";
    timeLeftEl.textContent = "";
    timerEl.textContent = "Time =";
    timerEl.appendChild(timeLeftEl);
}
// submit score
function submit() {
    var submitHighestScore = {
        name: initialsInput.value, 
        score: timeLeft
    };
    highScoresList.push(submitHighestScore);
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
}