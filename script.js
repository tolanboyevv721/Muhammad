const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const scoreText = document.getElementById('score-text');
const quizBox = document.getElementById('quiz');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "O'zbekiston bayrog'ida nechta yulduz bor?",
        answers: [
            { text: "10 ta", correct: false },
            { text: "12 ta", correct: true },
            { text: "15 ta", correct: false }
        ]
    },
    {
        question: "Dunyodagi eng katta okean qaysi?",
        answers: [
            { text: "Atlantika", correct: false },
            { text: "Hind", correct: false },
            { text: "Tinch", correct: true }
        ]
    },
    {
        question: "GitHub bu — ...",
        answers: [
            { text: "Kodlar ombori", correct: true },
            { text: "Ovqat pishirish sayti", correct: false },
            { text: "Kino ko'rish portali", correct: false }
        ]
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    resultContainer.style.display = 'none';
    quizBox.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true") button.classList.add('correct');
        button.disabled = true;
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.style.display = 'block';
    } else {
        setTimeout(showScore, 1000);
    }
}

function showScore() {
    quizBox.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreText.innerText = `Natija: ${questions.length} tadan ${score} ta!`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

startQuiz();

