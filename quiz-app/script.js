const quizData = [
    {
        question: "Which among the following cities is the most populated city in the world?",
        a: "Tokyo",
        b: "New Delhi",
        c: "New York",
        d: "London",
        correct: 'a'
    }, 
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "Javascript",
        correct: 'd'
    },
    {
        question: "Which among the following is the lowest atmospheric layer?",
        a: "Stratosphere",
        b: "Troposphere",
        c: "Thermosphere",
        d: "Mesosphere",
        correct: 'b'
    },
    {
        question: "In terms of geographical area, which one of the following is the largest country in the world?",
        a: "Canada",
        b: "China",
        c: "Russia",
        d: "USA",
        correct: 'c'
    }, 
    {
        question: "In which year, Javascript was launched ?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: 'b'
    }
];

let currentQuiz = 0;
let score = 0;

const quiz = document.getElementById('quiz');

const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuiz+1+ ". " + currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        
        if(currentQuiz < quizData.length) {
            loadQuiz();
        }
        else {
            quiz.innerHTML = `<h2 class="center" style="padding: 2rem 2rem;">You answered correctly ${score} / ${quizData.length} questions</h2><button onclick="location.reload()" class="center">Restart Quiz</button>`;
        }
    }       
});