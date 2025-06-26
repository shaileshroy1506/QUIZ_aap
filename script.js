const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Cascading Simple Sheets", correct: false },
      { text: "Cars SUVs Sailboats", correct: false }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hyperloop Machine Language", correct: false },
      { text: "Helicopters Terminals Motorboats Lamborghinis", correct: false },
      { text: "None of the above", correct: false }
    ]
  },
  {
    question: "What year was JavaScript launched?",
    answers: [
      { text: "1996", correct: false },
      { text: "1995", correct: true },
      { text: "1994", correct: false },
      { text: "None of the above", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.classList.remove("hide");
}

function showScore() {
  document.getElementById("question-container").classList.add("hide");
  scoreContainer.classList.remove("hide");
  scoreElement.innerText = `${score} / ${questions.length}`;

  const resultHeading = document.getElementById("result-heading");

  if (score >= questions.length * 0.75) {
    resultHeading.innerText = "🎉 You're a Winner!";
    scoreContainer.classList.add("winner");
  } else {
    resultHeading.innerText = "😢 Try Again!";
    scoreContainer.classList.add("try-again");
  }
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
