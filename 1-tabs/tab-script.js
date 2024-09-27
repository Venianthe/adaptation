(function () {
    let jsTriggers = document.querySelectorAll('.js-tab-trigger');
    let contant = document.querySelectorAll('.js-tab-content');
    let viewed = ['1'];

    jsTriggers.forEach(function(trigger, idx) {

        trigger.addEventListener('click', function() {
            
            
            contant.forEach((item) => {
                item.classList.remove('active');
            })
            contant[idx].classList.add('active');
            trigger.classList.add('viewed');
    
            let jsTriggersViewed = document.querySelectorAll('.js-tab-trigger.viewed');
            let button = document.querySelector('.btn-next');

            if (jsTriggers.length === jsTriggersViewed.length) {
                button.classList.remove('btn-next_disabled');
                button.classList.add('btn-next_enabled');
                button.removeAttribute('disabled', '');
            }
        });
    });
})();