(function(){
    // Переменные
    const buttonStartQuiz = document.querySelector('.btn-start-enabled');
    const sectionCover = document.getElementById('cover');
    const sectionQuiz = document.getElementById('quiz');
    const sectionResults= document.getElementById('results');
    const quizContainer = document.querySelector('.quiz');
    const submitButton = document.querySelector('.submit');
    const resultsContainer = document.querySelector('.result-ratio');
    const buttonRepeatQuiz = document.querySelector('.quiz-repeat');
     
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
    }
      
        
    function buildQuiz() {
        // переменная для хранения выходных данных HTML
        const output = [];
        
        
        // по каждому вопросу...
         document.querySelector('.js-title-question').innerHTML =  myQuestions[currentSlide].question
         
        // myQuestions.forEach(
        //     (currentQuestion, questionNumber) => {
    
        //         // переменная для хранения списка возможных ответов
        //         const answers = [];
        
        //         // и для каждого доступного ответа...
        //         for (letter in currentQuestion.answers){
    
        //             // ...добавляем переключатель в формате HTML
        //             answers.push(
        //                 `<label class="quiz-answer-container">
        //                     <div class="quiz-answer">
        //                         <input class="quiz-radio" type="radio" name="question${questionNumber}" value="${letter}"/>
        //                         ${currentQuestion.answers[letter]}
        //                     </div>
        //                 </label> 
        //                 `
        //             );
                    
        //         }
                
        //         // добавляем этот вопрос и ответы на него в выходные данные
        //         output.push(
        //             `<div class="quiz-slide">
        //             <div class="quiz-question"> ${currentQuestion.question} </div>
        //             <div class="quiz-answers"> ${answers.join("")} </div>
        //             </div>`
        //         );
                
        //     }
        // );
  
        
        
        
        // объединяем выходной список в одну строку HTML и размещаем ее на странице
        quizContainer.innerHTML = output.join('');
    }
  
    // Скрыть 3 модуль (Results), отобразить 1 модуль (Cover)
    function repeatQuiz () {
        sectionCover.classList.remove('hidden');
        sectionResults.classList.add('hidden');

        const bestResults = document.querySelector('.best-result');
        // Показываем лучший результат после нажатия "Повторить тест"
        bestResults.classList.remove('hidden');
        // cleanSlider();
        currentSlide = 0;

        buildQuiz();
        
        showSlide();
        
        
    } 
    
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
  
        // показать количество правильных ответов от общего числа
        resultsContainer.innerHTML = `${numCorrect} из ${myQuestions.length}`;
    }
  
    function showSlide() {

        
       

        // slides[currentSlide].classList.remove('quiz-active-slide');

        // slides[currentSlide + 1].classList.add('quiz-active-slide');

        slides.forEach((item, idx) => {
            item.classList.remove('quiz-active-slide');
            if(idx == currentSlide) {
                item.classList.add('quiz-active-slide');
            } 
        })

        currentSlide++
        // console.log(slides[currentSlide + 1]);
        
        
        // currentSlide = n;

        if (currentSlide === slides.length-1) {
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
        showSlide(currentSlide + 1);
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
  
    // Начать все сначала
    buildQuiz();
  
    // Пагинация
    const nextButton = document.querySelector(".next");
    const slides = document.querySelectorAll(".quiz-slide");
    let slide = document.querySelector('.quiz-slide');
    let currentSlide = 0;
  
    // Показать первый слайд
    showSlide();

    function cleanSlider () {
        currentSlide = 0;
        showSlide(0);
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