(function () {
  document.addEventListener('DOMContentLoaded', function () {
    let slider = document.querySelectorAll('.slider');
    let slides = slider.querySelectorAll('.slide');
    let activeSlides = 'slide--active';
    let viewed = 'viewed';
    let slideCount = slides.length;
    let controlButtons = slider.querySelectorAll('.button-radio');
    let prevButton = slider.querySelector('.button-prev');
    let nextButton = slider.querySelector('.button-next');
    let activeButton = 'active';
    let inactiveButton = 'aria-disabled';
    let currentButton = 'aria-current';
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
          updateSlider(idx)
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
        updateSlider(idx)
      } else if (event.key === 'ArrowRight' && currentSlide < slideCount - 1) {
        currentSlide++;
        updateSlider()
      }
    })
      
    updateSlider(idx)
  })
})();