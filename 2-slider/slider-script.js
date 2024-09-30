(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = slider.querySelectorAll('.slide');
    const activeSlides = 'slide--active';
    const viewed = 'viewed';
    const slideCount = slides.length;
    const controlButtons = slider.querySelectorAll('.button-radio');
    const prevButton = slider.querySelector('.button-prev');
    const nextButton = slider.querySelector('.button-next');
    const activeButton = 'active';
    const inactiveButton = 'aria-disabled';
    const currentButton = 'aria-current';
    let currentSlide = 0;
    let viewedSliders = [];
    
    function updateSlider() {
      slides.forEach((slide, index) => {
        if(index === currentSlide) {
          slide.classList.add(activeSlides);
          slide.classList.add(viewed);
        } else {
          slide.classList.remove(activeSlides);
        }
      })
      
      let viewedSliders = document.querySelectorAll('.slide.viewed');
      let buttonNext = document.querySelector('.btn-next');
      
      if (slides.length === viewedSliders.length) {
        buttonNext.classList.remove('btn-next_disabled');
        buttonNext.classList.add('btn-next_enabled');
        buttonNext.removeAttribute('disabled', '');
      }

      controlButtons.forEach((button, index) => {
        if (index === currentSlide) {
          button.classList.add(activeButton);
          button.setAttribute(currentButton, true);
        } else {
          button.classList.remove(activeButton);
          button.removeAttribute(currentButton, true);
        }
        
        prevButton.setAttribute(inactiveButton, currentSlide === 0);
        nextButton.setAttribute(inactiveButton, currentSlide === slideCount - 1);
      })
    }
    
    controlButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (index < slideCount) {
          currentSlide = index;
          updateSlider()
        }
      })
    })
    
    prevButton.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider()
      }
    })
    
    nextButton.addEventListener('click', () => {
      if (currentSlide < slideCount - 1) {
        currentSlide++;
        updateSlider()
      }

    })
      
    slider.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft' && currentSlide > 0) {
        currentSlide--;
        updateSlider()
      } else if (event.key === 'ArrowRight' && currentSlide < slideCount - 1) {
        currentSlide++;
        updateSlider()
      }
    })
      
    updateSlider()
  })
})();