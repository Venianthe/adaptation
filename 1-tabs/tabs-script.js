(function () {
    let jsTriggers = document.querySelectorAll('.js-tab-trigger');
    let viewed = ['1'];

    jsTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            let id = this.getAttribute('data-tab'),
            content = document.querySelector('.js-tab-content[data-tab="'+id+'"]'),
            activeTrigger = document.querySelector('.js-tab-trigger.active'),
            activeContent = document.querySelector('.js-tab-content.active');
    
            activeTrigger.classList.remove('active');
            trigger.classList.add('active', 'viewed');
    
            activeContent.classList.remove('active');
            content.classList.add('active');

            if (trigger.classList.contains('viewed') == true) {
                if (viewed.includes(id) == false)
                viewed.push(id);
            }

            let button = document.querySelector('.btn-next');
        
            if (viewed.length === 4) {
                button.classList.remove('btn-next_disabled');
                button.classList.add('btn-next_enabled');
                button.removeAttribute('disabled', '');
            }
        });
    });
})();