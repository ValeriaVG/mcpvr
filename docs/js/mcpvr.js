/*! MCPVR - v0.0.1 - 2016-12-06
* https://valeriavg.github.io/mcpvr/
* Copyright (c) 2016 ValeriaVG <valeria.viana.gusmao@gmail.com>; Licensed GPL-3.0 */
var dockTo=function(elementSelector,dockSelector){
  var element=document.querySelector(elementSelector);
  var dock=document.querySelector(dockSelector);
};

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
      
        for (i = 0; i < rows.length; i++) {
            for (j = 0; j < rows[i].columns.length; j++) {
                rows[i].columns[j].style.height = rows[i].height + 'px';
            }

        }
    }
};

var showDropdownMenu = function(event) {
  var menu = this.querySelector(':scope > UL');
  menu.style.minWidth=this.clientStyle().width;
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

HTMLElement.prototype.clientStyle = function(pseudo){
  if(pseudo===undefined){
    pseudo=null;
  }
  return window.getComputedStyle(this, pseudo);
};

(function() {
    'use strict';
    window.mcpvr = function(action) {
        /*Always*/
        /*Adjust height of equal-height columns*/
        makeColumnsEqual();
        makeDropdownMenu();
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
