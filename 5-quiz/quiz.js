(function(){
    // Функции
    function buildQuiz(){
      // переменная для хранения выходных данных HTML
      const output = [];
  
      // по каждому вопросу...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // переменная для хранения списка возможных ответов
          const answers = [];
  
          // и для каждого доступного ответа...
          for(letter in currentQuestion.answers){
  
            // ...добавляем переключатель в формате HTML
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}"/>
                ${currentQuestion.answers[letter]}
              `
            );
          }
  
          // добавляем этот вопрос и ответы на него в выходные данные
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // объединяем выходной список в одну строку HTML и размещаем ее на странице
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // собираем контейнеры с ответами из викторины
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
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
  
          // раскрасить ответы зеленым цветом
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // если ответ неверный или пустой
        else{
          // раскрасить ответы красным цветом
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // показать количество правильных ответов от общего числа
      resultsContainer.innerHTML = `${numCorrect} из ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Переменные
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
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
          c: "Это не я, меня сюда силой привели"
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
  
    // Начать все сначала
    buildQuiz();
  
    // Пагинация
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Показать первый слайд
    showSlide(currentSlide);
  
    // Прослушиватели событий
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  