let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

// keeping track of which question we're on
var numquestions = 0;

//keeping score
let score = 0

//Timer starts when the user clicks quizStart (see above).
function showTime() {
  showQuestions();
  let timerInterval = setInterval(function() {
    secondsLeft--;
    numTime.textContent = "";
    numTime.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || numquestions === questions.length) {
      clearInterval(timerInterval);
      storeScore();
    } 
  }, 1000);
}

//function to load the questions on the page
function showQuestions() {
  removeEls(quizStart);

  if (numquestions < questions.length) {
    divQuestion.innerHTML = questions[numquestions].title;
    options.textContent = "";

    for (let i = 0; i < questions[numquestions].multiChoice.length; i++) {
      let ment = document.createElement("button");
      ment.innerText = questions[numquestions].multiChoice[i];
      ment.setAttribute("data-id", i);
      ment.addEventListener("click", function (event) {
        event.stopPropagation();

        if (ment.innerText === questions[numquestions].answer) {
          score += secondsLeft;
        } else {
          score -= 10;
      
        }
        
        divQuestion.innerHTML = "";

        if (numquestions === questions.length) {
          return;
        } else {
          numquestions++;
          showQuestions();
        }
      });
      options.append(ment);
    }
  }
}


function storeScore() {
  numTime.remove();
  options.textContent = "";

  let startingInput = document.createElement("input");
  let endInput = document.createElement("input");

  total.innerHTML = `You scored ${score} points! Enter Initials (2 characters) `;
  startingInput.setAttribute("type", "text");
  endInput.setAttribute("type", "button");
  endInput.setAttribute("value", "Submit my Score");
  endInput.addEventListener("click", function (event) {
    event.preventDefault();
    let Scores = scoresArray(storedArray, emptyArray);

    let nameInitial = startingInput.value;
    let userAndScore = {
      nameInitial: nameInitial,
      score: score,
    };

    Scores.push(userAndScore);
    Save(Scores);
    showAllScores();
    removeScores();
    buttonReturn();
    viewScoresBtn.remove();
  });
  total.append(startingInput);
  total.append(endInput);
}

const Save = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const scoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

const removeEls = (...els) => {
  for (let ment of els) ment.remove();
}

function showAllScores() {
  removeEls(numTime, quizStart, total);
  let Scores = scoresArray(storedArray, emptyArray);

  Scores.forEach(obj => {
    let nameInitial = obj.nameInitial;
    let storedScore = obj.score;
    let resultsP = document.createElement("p");
    resultsP.innerText = `${nameInitial}: ${storedScore}`;
    divScore.append(resultsP);
  });
}

function viewScores() {
  viewScoresBtn.addEventListener("click", function(event) {
    event.preventDefault();
    removeEls(numTime, quizStart);
    showAllScores();
    removeEls(viewScoresBtn);
    removeScores();
    buttonReturn();
  });
}

function removeScores() {    
  let clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Scores");
  clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(divScore);
    window.localStorage.removeItem("highScores");
  })
  divScore.append(clearBtn)
}

function buttonReturn() {
  let backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(backBtn)
}


viewScores();
