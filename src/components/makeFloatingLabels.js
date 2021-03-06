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
