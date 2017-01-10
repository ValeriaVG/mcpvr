/*! MCPVR - v0.0.1 - 2017-01-11
* https://valeriavg.github.io/mcpvr/
* Copyright (c) 2017 ValeriaVG <valeria.viana.gusmao@gmail.com>; Licensed GPL-3.0 */
var makeColumnsEqual = function(selector) {

    if (selector === undefined) {
        selector = '.equal-height';
    }
    var items = document.querySelectorAll(selector);
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var top = item.offsetTop;
        var columns = item.children;
        var columnsAreInLine = false;

        var row = {
            'height': 0,
            'columns': []
        };
        var rows = [];


        for (var j = 0; j < columns.length; j++) {
            columnsAreInLine = (columns[j].offsetTop === top);

            if (!columnsAreInLine) {
                rows.push(row);
                top = columns[j].offsetTop;
                row = {
                    'height': 0,
                    'columns': []
                };
            }
            if (columns[j].clientHeight > row.height) {
                row.height = columns[j].clientHeight;
            }
            row.columns.push(columns[j]);

        }
        if (columns.length > 0) {
            rows.push(row);
        }
        for (var k = 0; k < rows.length; k++) {
          var cols=rows[k].columns;
          var h=rows[k].height;
            for (var l = 0; l < cols.length; l++) {
                cols[l].style.height = h + 'px';
            }

        }
    }
};

var showDropdownMenu = function(event) {
  var menu = this.querySelector(':scope > UL');
  menu.style.minWidth=this.clientStyle().width;
menu.style.left=this.parentElement.clientStyle().width;


    menu.setAttribute('class','shown');
};
var hideDropdownMenu = function(event) {
  var menu = this.querySelector(':scope > UL');
  menu.setAttribute('class','');
};

var makeDropdownMenu = function(selector) {
    if (selector === undefined) {
        selector = '.dropdown';
    }
    var triggers = document.querySelectorAll(selector);
    for (var i = 0; i < triggers.length; i++) {
        var trigger = triggers[i];
        var show = 'mouseover';
        var hide = 'mouseleave';
        if (window.ontouchstart !== undefined) {
            show = 'click';
            hide = 'click';
        }
        var menu = triggers[i].querySelector(':scope > UL');
        if(!menu.classList.contains('horizontal')){

          //menu.style.top=(triggers[i].offsetTop-1-triggers[i].parentElement.offsetTop)+"px";
        }

        trigger.removeEventListener('click',showDropdownMenu);
        trigger.removeEventListener('mouseover',showDropdownMenu);
        trigger.removeEventListener('click',hideDropdownMenu);
        trigger.removeEventListener('mouseout',hideDropdownMenu);


        trigger.addEventListener(show, showDropdownMenu);
        trigger.addEventListener(hide, hideDropdownMenu);

    }
};

var makeFloatingLabels = function(selector) {
    if (selector === undefined) {
        selector = '.form';
    }
    var inputTypes = ['text', 'email', 'tel', 'password', 'number'];
    var items = document.querySelectorAll(selector);

    var adjustLabels = function(event) {
        var value;

        if (event.clipboardData) {
            value = event.clipboardData.getData('text');
        } else {
            value = event.target.value;
        }
        var label = document.querySelector('LABEL[for="' + event.target.getAttribute("id") + '"]');

        if (event.type === 'focus') {
            label.setAttribute('class', 'active');
        }
        value = value.trim();
        if (value.length === 0) {
            label.setAttribute('class', 'hidden');
        } else {
            if (event.type === 'blur') {
                label.removeAttribute('class');
            } else {
                label.setAttribute('class', 'active');
            }
        }

    };


    for (var i = 0; i < items.length; i++) {
        var input, label;
        var inputs = items[i].querySelectorAll('input');
        var textareas = items[i].querySelectorAll('textarea');
        for (var j = 0; j < inputs.length; j++) {
            input = inputs[j];
            if ((inputTypes.indexOf(input.getAttribute('type')) !== -1)) {
                //Adding labels and needed data attributes
                label = document.createElement('LABEL');
                label.setAttribute('for', i + '_' + j);
                label.textContent = input.getAttribute('placeholder');
                input.setAttribute('id', i + '_' + j);
                if (input.value.length === 0) {
                    label.setAttribute('class', 'hidden');
                }
                input.parentNode.insertBefore(label, input);
                //Here goes the magic
                input.addEventListener('keyup', adjustLabels);
                input.addEventListener('focus', adjustLabels);
                input.addEventListener('blur', adjustLabels);
                input.addEventListener('paste', adjustLabels);
            }
        }

        for (j = 0; j < textareas.length; j++) {
            input = textareas[j];
            label = document.createElement('LABEL');
            label.setAttribute('for', i + '_' + j + inputs.length);
            label.textContent = input.getAttribute('placeholder');
            input.setAttribute('id', i + '_' + j + inputs.length);
            if (input.value.length === 0) {
                label.setAttribute('class', 'hidden');
            }
            input.parentNode.insertBefore(label, input);
            //Here goes the magic
            input.addEventListener('keyup', adjustLabels);
            input.addEventListener('focus', adjustLabels);
            input.addEventListener('blur', adjustLabels);
            input.addEventListener('paste', adjustLabels);
        }
    }
};

var showModal = function(modal) {
    document.body.setAttribute("class", "modal-opened");
    document.querySelector(modal).setAttribute('class', 'modal shown');
};

var hideModal = function(modal) {
    document.body.setAttribute("class", "");
    document.querySelector(modal).setAttribute('class', 'modal');
};

var showAttachedModal = function(event) {
    event.preventDefault();
    var trigger = this;
    var modalSelector = trigger.getAttribute('data-modal');
    if (modalSelector.length === 0) {
        modalSelector = trigger.getAttribute('href');
    }
    showModal(modalSelector);
};

var hideAttachedModal = function(event) {


    var trigger = event.target;
    var modalSelector=null;
    modalSelector = trigger.getAttribute('data-modal');
    if (modalSelector === null) {
        modalSelector = trigger.getAttribute('href');
    }
    if (document.querySelector(modalSelector) !== null) {
        event.preventDefault();
        hideModal(modalSelector);
    }
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



            trigger.addEventListener('click', showAttachedModal);



        }

    }

    var modals = document.querySelectorAll('.modal');
    for (i = 0; i < modals.length; i++) {
        var closers = modals[i].querySelectorAll(".close");
        var mselector = '#' + modals[i].getAttribute('id');

        for (var j = 0; j < closers.length; j++) {
            closers[j].setAttribute('data-modal', mselector);
            closers[j].addEventListener('click', hideAttachedModal);
        }
        modals[i].setAttribute('data-modal', mselector);
        modals[i].addEventListener('click', hideAttachedModal);

    }

    if (document.location.hash.length > 0) {
        if (document.querySelector(document.location.hash).hasClass("modal")) {
            showModal(document.location.hash);
        }

    }
};

HTMLElement.prototype.clientStyle = function(pseudo){
  if(pseudo===undefined){
    pseudo=null;
  }
  return window.getComputedStyle(this, pseudo);
};

HTMLElement.prototype.hasClass = function(className){

  return this.getAttribute("class").indexOf(className)!==-1;
};

(function() {
    'use strict';
    window.mcpvr = function(action) {
        /*Always*/
        /*Adjust height of equal-height columns*/
        makeColumnsEqual();
        makeDropdownMenu();
        makeModals();
        switch (action) {
            case 'ready':
                /*Only when ready*/
                makeFloatingLabels();
                break;
            case 'resize':
                /*Only when resized*/
                break;
            default:

                break;
        }
    };

    document.addEventListener('DOMContentLoaded', function(event) {
        mcpvr('ready');
    });
    window.addEventListener('resize', function(event) {
        mcpvr('resize');
    });
}());
