
var showModal = function(modal) {

    document.body.setAttribute("class", "modal-opened");
    document.querySelector(modal).setAttribute('class', 'modal shown');
};
var hideModal = function(modal) {
    document.body.setAttribute("class", "");
    document.querySelector(modal).setAttribute('class', 'modal');
};
var showAttachedModal = function(event) {
    var trigger = this;
    var modalSelector = trigger.getAttribute('data-modal');
    if (modalSelector.length === 0) {
        modalSelector = trigger.getAttribute('href');
    }
    showModal(modalSelector);
};
var hideAttachedModal = function(event) {
    var trigger = this;
    var modalSelector = trigger.getAttribute('data-modal');
    if (modalSelector.length === 0) {
        modalSelector = trigger.getAttribute('href');
    }
    hideModal(modalSelector);
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

        if (modal !== null) {


            var closers = modal.querySelectorAll(".close");
            for (var j = 0; j < closers.length; j++) {
                closers[j].addEventListener('click', hideAttachedModal);
            }
            trigger.addEventListener('click', showAttachedModal);



        }

    }

    if (document.location.hash.length > 0) {
        if (document.querySelector(document.location.hash).hasClass("modal")) {
            showModal(document.location.hash);
        }

    }
};
