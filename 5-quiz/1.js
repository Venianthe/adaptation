(function(){
    // Переменные
    const buttonStartQuiz = document.querySelector('.btn-start-enabled');
    const sectionCover = document.getElementById('cover');
    const sectionQuiz = document.getElementById('quiz');
    const sectionResults= document.getElementById('results');
    const quizContainer = document.querySelector('.quiz');
    const submitButton = document.querySelector('.submit');
    const resultsRatio = document.querySelector('.result-ratio');
    const resultsPercent = document.querySelector('.result-percent');
    const buttonRepeatQuiz = document.querySelector('.quiz-repeat');
    const bestResultsContainer = document.querySelector('.best-percent');
    const resultFeedback = document.querySelector('.result-feedback');
    const requestTitle = document.querySelector('.results-title');
    const userName = document.querySelector('.user-name');
    const currentUserName = 'Константин Константинопольский';
    const userDate = document.querySelector('.user-date');
    let bestResults = 0;
    const maxRepeatQuiz = 3;
    const minRequiredPercent = 80;
    const goodFeedbackQuiz = 'Текст-комментарий для положительного результата';
    const badFeedbackQuiz = 'Не очень хороший результат, рекомендуем изучить курс еще раз.';

    
    const myQuestions = [
        {
            question: "Кто ты?",
            answers: {
                a: "Человек",
                b: "Баран",
                c: "Арёль"
            },
        correctAnswer: "a"
      },
      {
          question: "Зачем ты тут сидишь?",
          answers: {
              a: "Смотрю в потолок",
              b: "Ищу смысл жизни",
              c: "Это не я, я - котик-енотик"
            },
            correctAnswer: "a"
        },
        {
            question: "Где енотовые нямки?",
            answers: {
                a: "Енот съел",
                b: "Я не ел",
                c: "Ещё не привезли",
                d: "Что это такое?"
            },
            correctAnswer: "b"
        },
        {
            question: "А если найду?",
            answers: {
                a: "Упс!",
                b: "Упс...",
            c: "Ну ты и Арёль..!"
        },
        correctAnswer: "c"
    },
    {
        question: "А если НЕ найду?",
        answers: {
            a: "Гггг!",
            b: "Ууу...",
            c: "Ну ты и Арёль..!"
        },
        correctAnswer: "c"
    }
];

// Функции

// Скрыть 1 модуль (Cover), отобразить 2 модуль (Quiz)
function nextSection() {
    sectionCover.classList.add('hidden');
    sectionQuiz.classList.remove('hidden');
    console.log(currentRepeatQuiz);
}


function buildQuiz() {
        // переменная для хранения выходных данных HTML
        const output = [];
        
        
        // по каждому вопросу...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {
                
                // переменная для хранения списка возможных ответов
                const answers = [];
                
                // и для каждого доступного ответа...
                for (letter in currentQuestion.answers){
                    
                    // ...добавляем переключатель в формате HTML
                    answers.push(
                        `<label class="quiz-answer-container">
                        <div class="quiz-answer">
                        <input class="quiz-radio js-quiz-cleaner" type="radio" name="question${questionNumber}" value="${letter}"/>
                        ${currentQuestion.answers[letter]}
                        </div>
                        </label> 
                        `
                    );
                    
                }
                
                // добавляем этот вопрос и ответы на него в выходные данные
                output.push(
                    `<div class="quiz-slide">
                    <div class="quiz-question"> ${currentQuestion.question} </div>
                    <div class="quiz-answers"> ${answers.join("")} </div>
                    </div>`
                );
                
            }
        );
        
        
        
        
        // объединяем выходной список в одну строку HTML и размещаем ее на странице
        quizContainer.innerHTML = output.join('');
    }
    const gridForUpdate = document.querySelector('.results');
    // Скрыть 3 модуль (Results), отобразить 1 модуль (Cover)
    function repeatQuiz () {
        sectionCover.classList.remove('hidden');
        sectionResults.classList.add('hidden');

        const bestResults = document.querySelector('.best-result');
        // Показываем лучший результат после нажатия "Повторить тест"
        bestResults.classList.remove('hidden');
        gridForUpdate.classList.remove('grid-one-column');
        cleanSlider();
        cleanActiveAnswears();
        attemptСounter();
    } 
    
    let currentRepeatQuiz = 1;
    // Счетчик прохождений
    function attemptСounter () {
        currentRepeatQuiz++;
    }
    
    // Отобразить результаты
    function showResults() {
        // Скрыть 2 модуль (Quiz), отобразить 3 модуль (Results)
        sectionQuiz.classList.add('hidden');
        sectionResults.classList.remove('hidden');
        
        // собираем контейнеры с ответами из викторины
        const answerContainers = quizContainer.querySelectorAll('.quiz-answers');
        
        // следим за ответами пользователей
        let numCorrect = 0;
        
        // по каждому вопросу...
        myQuestions.forEach( (currentQuestion, questionNumber) => {
            
            // найти выбранный ответ
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            
            
            // если ответ правильный
            if(userAnswer === currentQuestion.correctAnswer){
                // увеличить количество правильных ответов
                numCorrect++;
            }
        });
        
        // Корректируем окончание -ей/-ой
        function updateCounterRequest () {
            if (currentRepeatQuiz !== 3) {
                requestTitle.innerHTML = `Результат ${currentRepeatQuiz}-ой попытки`;
            } else {
                requestTitle.innerHTML = `Результат ${currentRepeatQuiz}-ей попытки`;
            }
        }

        function updateName () {
            userName.innerHTML = currentUserName;
        }

        // Приводим дату к виду ДД.ММ.ГГГГ
        function formatDate(date) {

            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
          
            let mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
          
            let yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;
          
            return dd + '.' + mm + '.' + yy;
        }

        // Обновляем текущую дату
        function updateDate () {
            let currentDate = new Date();
            let normFormatDate = formatDate(currentDate);
            userDate.innerHTML = normFormatDate;
        }

        // вызываем функцию для отображения корректных данных
        function updateCurrentInfo () {
            updateCounterRequest();
            updateName();
            updateDate();
        }

        updateCurrentInfo();

        // показать количество правильных ответов от общего числа
        resultsRatio.innerHTML = `${numCorrect} / ${myQuestions.length}`;
        
        let percentCorrect = 0;
        function ratioToPersent (current, max) {
            let percent = current / max * 100;
            percentCorrect = percent;
        }
        ratioToPersent(numCorrect,myQuestions.length);
        resultsPercent.innerHTML = `${percentCorrect}%`;
        
        if (percentCorrect > bestResults) {
            bestResults = percentCorrect;
        }
        
        bestResultsContainer.innerHTML = `${bestResults}%`;

        if (currentRepeatQuiz >= maxRepeatQuiz) {
            buttonNextDisabled();
            buttonRepeatQuiz.style.display = 'none';
        }

        if (percentCorrect >= minRequiredPercent) {
            buttonRepeatQuiz.style.display = 'none';
            goodFeedback();
        } else {
            badFeedback();
        }
    }
    
    function goodFeedback () {
        resultFeedback.innerHTML = goodFeedbackQuiz;
        resultsRatio.style.color = 'green';
        resultsPercent.style.color = 'green';
        bestResultsContainer.style.color = 'green';
        
    }
    
    function badFeedback () {
        resultFeedback.innerHTML = badFeedbackQuiz;
        resultsRatio.style.color = 'red';
        resultsPercent.style.color = 'red';
        bestResultsContainer.style.color = '#69696C';
    }

    // Скрыть текущий вопрос, отобразить следующий
    function toggleActivSlide () {
        slides.forEach((item, idx) => {
            item.classList.remove('quiz-active-slide');
            if(idx == currentSlide) {
                item.classList.add('quiz-active-slide');
            } 
        });
        currentSlide++;
    }

    function showSlide() {
        toggleActivSlide();
        
        if (currentSlide === slides.length) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
        addSliderTextStyle();
        buttonNextDisabled();
    }
  
    // Показать следующий вопрос
    function showNextSlide() {
        showSlide();
        
    }

    // Сделать кнопку "Следующий вопрос" активной
    function buttonNextEnabled () {
        const buttonNext = document.querySelectorAll('.btn-next');
        buttonNext.forEach((item) => {
            item.removeAttribute('disabled', '');
            item.classList.remove('btn-next-disabled');
            item.classList.add('btn-next-enabled');
        });
    }
    // Деактивация кнопки "Следующий вопрос"
    function buttonNextDisabled () {
        const isEnabled = document.querySelectorAll('.btn-next');
        isEnabled.forEach((item) => {
            item.setAttribute('disabled', '');
            item.classList.add('btn-next-disabled');
            item.classList.remove('btn-next-enabled');
        });
    }

    // Добавялем стили текста для вопросов/ответов
    function addSliderTextStyle () {
        const quizQuestionTextStyle = document.querySelector('.quiz-question');
        const quizAnswersTextStyle = document.querySelector('.quiz-answers');

        quizAnswersTextStyle.classList.add('text-b3');
        quizQuestionTextStyle.classList.add('text-b2');
    }
  
    // Создать "вопросник"
    buildQuiz();
  
    // Пагинация
    const nextButton = document.querySelector(".next");
    const slides = document.querySelectorAll(".quiz-slide");
    const activeAnswears = document.querySelectorAll('.js-quiz-cleaner');
    let currentSlide = 0;
  
    // Показать первый слайд
    showSlide();

    // Очистить все ответы в тесте
    function cleanActiveAnswears () {
        activeAnswears.forEach((item) => {
            item.checked = false;
        })
    }

    // Сбросить тестирование
    function cleanSlider () {
        currentSlide = 0;
        showSlide();
    }
    
    const activeSlide = document.querySelectorAll('.quiz-answers');

    // Объединённая функция для события Click
    function nextButtonClick () {
        showNextSlide();
        buttonNextDisabled();
    }

    // Разблокируем кнопку "Следующий вопрос" после выбора ответа
    activeSlide.forEach((item) => {
        item.addEventListener('click', buttonNextEnabled);
        }
    );
   
    // Прослушиватели событий
    submitButton.addEventListener('click', showResults);
    nextButton.addEventListener("click", nextButtonClick);
    buttonStartQuiz.addEventListener('click', nextSection);
    buttonRepeatQuiz.addEventListener('click', repeatQuiz);
})();