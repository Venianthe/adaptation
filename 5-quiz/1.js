(function(){
    // Переменные
    const buttonStartQuiz = document.querySelector('.btn-start-enabled');
    const sectionCover = document.getElementById('cover');
    const sectionQuiz = document.getElementById('quiz');
    const sectionResults= document.querySelector('.results');
    const quizContainer = document.querySelector('.quiz');
    const submitButton = document.querySelector('.submit');
    const isEnabled = document.querySelector('.btn-next');
     
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
    function nextSection() {
        if (sectionCover.classList.contains !== 'hidden') {
            sectionCover.classList.add('hidden');
            sectionQuiz.classList.remove('hidden');
        }
        // if (sectionCover.classList.contains == 'hidden' && sectionQuiz.classList.contains !== 'hidden') {
        //     sectionQuiz.classList.add('hidden');
        //     sectionResults.classList.remove('hidden');
        // }
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
                                <input class="quiz-radio" type="radio" name="question${questionNumber}" value="${letter}"/>
                                ${currentQuestion.answers[letter]}
                            </div>
                        </label> 
                        `
                    );
                    // Добавляем стиль текста
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
  
    function showResults() {
  
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
  
        // показать количество правильных ответов от общего числа
        resultsContainer.innerHTML = `${numCorrect} из ${myQuestions.length}`;
    }
  
    function showSlide(n) {
        slides[currentSlide].classList.remove('quiz-active-slide');
        slides[n].classList.add('quiz-active-slide');
        currentSlide = n;

        if (currentSlide === slides.length-1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
        addSliderTextStyle();
    }
  
    // Показать следующий вопрос
    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    // Сделать кнопку "Следующий вопрос" активной
    function buttonNextEnabled () {
        const buttonNext = document.querySelector('.next');

        buttonNext.removeAttribute('disabled', '');
        buttonNext.classList.remove('btn-next-disabled');
        buttonNext.classList.add('btn-next-enabled');

    }

    // function buttonNextDisabled () {
    //     if ()
    // }

    // Добавялем стили текста для вопросов/ответов
    function addSliderTextStyle () {
        const quizQuestionTextStyle = document.querySelector('.quiz-question');
        const quizAnswersTextStyle = document.querySelector('.quiz-answers');

        quizAnswersTextStyle.classList.add('text-b3');
        quizQuestionTextStyle.classList.add('text-b2');
    }
  
    // Начать все сначала
    buildQuiz();
  
    // Пагинация
    // const previousButton = document.getElementById("previous");
    const nextButton = document.querySelector(".next");
    const slides = document.querySelectorAll(".quiz-slide");
    let currentSlide = 0;
  
    // Показать первый слайд
    showSlide(currentSlide);

    const isSelected = document.querySelector('.quiz-answers');
  
    // Прослушиватели событий
    submitButton.addEventListener('click', showResults);
    nextButton.addEventListener("click", showNextSlide);
    buttonStartQuiz.addEventListener('click', nextSection);
    isSelected.addEventListener('click', buttonNextEnabled);
  })();
  
// // Проверка выбора радиокнопки в группе
// const isSelected = document.querySelector('input[type="radio"][name="groupName"]:checked') !== null;
// console.log(isSelected ? "Радиокнопка выбрана!" : "Выберите опцию.");

// const checkedRadio = document.querySelector('input[type="radio"][name="radioGroup"]:checked');
// const value = checkedRadio ? checkedRadio.value : null;
// console.log(value ? `Выбрано значение: ${value}` : 'Радиокнопка не выбрана.');