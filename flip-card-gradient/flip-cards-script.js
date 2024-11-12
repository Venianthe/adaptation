(function () {
    const flipCards = Array.from(document.querySelectorAll(".card-flip")); // считываем все элементы в массив

    flipCards.forEach((fCard) => {
        fCard.addEventListener("click", flipped);
    });


    function flipped(e) {
        let currentCard = e.target.closest(".card-flip-content"); // определяем текущую карточку
        currentCard.classList.toggle("is-flipped"); 
        currentCard.classList.add("viewed"); // присваиваем ему "просмотрено"
        controlViewed();
    }

    function controlViewed() {
        let viewedBoxes = document.querySelectorAll('.viewed');
        let buttonNext = document.querySelector('.btn-next');
        
        if (flipCards.length == viewedBoxes.length) {
            buttonNext.classList.remove('btn-next_disabled');
            buttonNext.classList.add('btn-next_enabled');
            buttonNext.removeAttribute('disabled', '');
        }
    }
})();
// let card = document.querySelector(".cardFlip-content");

// let flipped = () => card.classList.toggle("is-flipped");

// card.addEventListener("click", flipped);