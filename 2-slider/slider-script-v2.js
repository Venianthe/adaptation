(function () {
    let sliders = document.querySelectorAll('.slider');
    // sliders - список всех элементов с классом class="slider"
    // sliders[0] — первый элемент, sliders[1] — второй, sliders[i] — i-тый.
    
    for (let i = 0; i < sliders.length; i++) {
        // Перебирает все, вызывает функцию для каждого.
        init_slider(sliders[i]);
    }
    
    function init_slider(slider) {
        // Значение slider: Очередной sliders[i], переданный при вызове функции.
        
        let slide = slider.querySelectorAll('.slide');
        // Вместо document.query... Получается список всех class="slide"
        // которые находятся где-то внутри текущего элемента slider.
        
        let prev = slider.querySelector('.button-prev');
        let next = slider.querySelector('.button-next');
        
        let currentSlide = 0;
        // Номер текущего "открытого" слайда.
        
        next.addEventListener('click', function() {
            slide[currentSlide].classList.remove('active');
            // Открытый слайд. Скрываем.
            
            currentSlide = currentSlide < (slide.length - 1) ? currentSlide + 1 : currentSlide;
            
            slide[currentSlide].classList.add('active');
            slide[currentSlide].classList.add('viewed');
            // Следующий слайд. Показываем.

            let viewedSliders = document.querySelectorAll('.viewed');
            let allSlide = document.querySelectorAll('.slide');
            let buttonNext = document.querySelector('.btn-next');
          
            if (allSlide.length == viewedSliders.length) {
                buttonNext.classList.remove('btn-next_disabled');
                buttonNext.classList.add('btn-next_enabled');
                buttonNext.removeAttribute('disabled', '');
            }
        });  
        
        prev.addEventListener('click', function() {
            slide[currentSlide].classList.remove('active');
            // Открытый слайд. Скрываем.
                
            currentSlide = currentSlide == 0 ? currentSlide : currentSlide - 1;
            
            slide[currentSlide].classList.add('active');
            slide[currentSlide].classList.add('viewed');
            // Предыдущий слайд. Показываем.
        });
    }
    
})();