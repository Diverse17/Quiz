/* All answer options */ 
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/* All our option */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');   // сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'),  // номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // количество всех вопросов

      let indexOfQuestion, // индекс текущего вопроса
          indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker');  // обёртка для трекера
const btnNext = document.getElementById('btn-next');   // кнопка далее

let score = 0;  // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), // количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // количество всех вопросов в модальном окне
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка "начать викторину заново"

const questions = [
    {
        question: 'Самый дорогой трансфер в футболе ?',
        options: [
            '150 млн. евро',
            '178 млн. евро',
            '222 млн. евро',
            '263 млн. евро',
        ],
        rightAnswer: 2
    },
    {
        question: 'Первый победитель чемпионата мира по футболу  ?',
        options: [
            'Бразилия',
            'СССР',
            'Югославия',
            'Уругвай',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кто является обладателем Золотого Мяча в 2022 году  ?',
        options: [
            'Карим Бензема',
            'Лионель Месси',
            'Садио Мане',
            'Килиан Мбаппе',
        ],
        rightAnswer: 0
    },
    {
        question: 'Единственный вратарь, получивший "Золотой Мяч"  ?',
        options: [
            'Эдвин Ван дер Сар',
            'Питер Шилтон',
            'Лев Яшин',
            'Икер Касильяс',
        ],
        rightAnswer: 2
    },
    {
        question: 'В каком французском футбольном клубе играет Александр Головин  ?',
        options: [
            'Нант',
            'Лилль',
            'Монако',
            'Марсель',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто стал победителем в Лиге Чемпионов 21/22  ?',
        options: [
            'ПСЖ',
            'Реал Мадрид',
            'Бавария',
            'Ливерпуль',
        ],
        rightAnswer: 1
    }
];

numberOfAllQuestions.innerHTML = questions.length; // Выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;    // сам вопрос

    // мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
    indexOfPage++; // увеличение индекса страницы
};

let completedAnswers = []; // массив для заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов

    if (indexOfPage == questions.length) {
        quizOver()
    } else { 
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}

const checkAnswer = e1 => {
    if (e1.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        e1.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        e1.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

// удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const vadidate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    vadidate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})