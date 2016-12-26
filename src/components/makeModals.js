/*jshint loopfunc: true */
var showModal = function(modal) {
    document.body.setAttribute("class", "modal-opened");
    modal.setAttribute('class', 'modal shown');
};
var hideModal = function(modal) {
    document.body.setAttribute("class", "");
    modal.setAttribute('class', 'modal');
};

var makeModals = function(selector) {
    if (selector === undefined) {
        selector = '[data-modal]';
    }
    var triggers = document.querySelectorAll(selector);
    for (var i = 0; i < triggers.length; i++) {
        var trigger = triggers[i];
        var modalSelector = trigger.getAttribute('data-modal');
        if (modalSelector.length === 0) {
            modalSelector = trigger.getAttribute('href');
        }
        var modal = document.querySelector(modalSelector);
        var closers = modal.querySelectorAll(".close");
        for (var j = 0; j < closers.length; j++) {
            closers[j].addEventListener('click', function(event) {
                hideModal(modal);
            });
        }
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            showModal(modal);
        });

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                hideModal(modal);
            }
        });

    }

    if(document.location.hash.length>0){
      if(document.querySelector(document.location.hash).hasClass("modal")){
        showModal(document.querySelector(document.location.hash));
      }
    }
};
