const quizData = [
  {
    question: "Hey! What’s the capital city of India?",
    a: "Mumbai",
    b: "New Delhi",
    c: "Kolkata",
    d: "Chennai",
    correct: "b"
  },
  {
    question: "Which language is used to make web pages interactive?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d"
  },
  {
    question: "Do you know what CSS stands for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b"
  },
  {
    question: "When did JavaScript first appear?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "Not sure",
    correct: "b"
  }
];

const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answersEls = document.querySelectorAll('.answer');
const resultEl = document.getElementById('result');
const progressBar = document.getElementById('progress');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  resultEl.innerText = "";
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  updateProgressBar();
}

function deselectAnswers() {
  answersEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  let answer = undefined;
  answersEls.forEach(answerEl => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function updateProgressBar() {
  const progressPercent = (currentQuiz / quizData.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected();
  if (!answer) {
    resultEl.innerText = "Oops! Please pick an answer before moving on.";
    return;
  }
  if (answer === quizData[currentQuiz].correct) {
    score++;
  }

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    progressBar.style.width = `100%`;
    resultEl.innerHTML = `Awesome! You got <strong>${score}</strong> out of <strong>${quizData.length}</strong> right.<br><button id="restart" onclick="location.reload()">Play Again?</button>`;
    submitBtn.style.display = 'none';
  }
});
