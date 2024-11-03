(function () {
    const boxes = Array.from(document.querySelectorAll(".box")); // считываем все элементы аккордеона в массив

    boxes.forEach((box) => {
        box.addEventListener("click", boxHandler); // при нажатии на бокс вызываем ф-ию boxHanlder
    });


    function boxHandler(e) {
        e.preventDefault(); // сбрасываем стандартное поведение
        let currentBox = e.target.closest(".box"); // определяем текущий бокс
        let currentContent = e.target.nextElementSibling; // находим скрытый контент
        currentBox.classList.toggle("active"); // присваиваем ему активный класс
        currentBox.classList.add("viewed"); // присваиваем ему "просмотрено"
        let boxLeftLine = currentBox.querySelector(".box-red-line");
        let contentGreyLine = currentBox.querySelector(".content")
        if (currentBox.classList.contains("active")) {
            // если класс активный ..
            currentContent.style.maxHeight = currentContent.scrollHeight + "px"; // открываем контент
            boxLeftLine.style.visibility = "visible";
            contentGreyLine.style.borderTopWidth = "1px";
        } else {
            // в противном случае
            currentContent.style.maxHeight = 0; // скрываем контент
            boxLeftLine.style.visibility = "hidden";
            contentGreyLine.style.borderTopWidth = "0";
        }
        controlViewed();
    }

    function controlViewed() {
        let viewedBoxes = document.querySelectorAll('.viewed');
        let buttonNext = document.querySelector('.btn-next');
        
        if (boxes.length == viewedBoxes.length) {
            buttonNext.classList.remove('btn-next_disabled');
            buttonNext.classList.add('btn-next_enabled');
            buttonNext.removeAttribute('disabled', '');
        }
    }

})();