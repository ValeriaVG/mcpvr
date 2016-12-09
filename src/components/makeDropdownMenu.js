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
        var menu = triggers[i].querySelector(':scope > UL');
        if(!menu.classList.contains('horizontal')){
          menu.style.marginLeft=triggers[i].clientStyle().width;
          menu.style.top=triggers[i].offsetTop+"px";
        }

        trigger.removeEventListener('click',showDropdownMenu);
        trigger.removeEventListener('mouseover',showDropdownMenu);
        trigger.removeEventListener('click',hideDropdownMenu);
        trigger.removeEventListener('mouseout',hideDropdownMenu);


        trigger.addEventListener(show, showDropdownMenu);
        trigger.addEventListener(hide, hideDropdownMenu);

    }
};
