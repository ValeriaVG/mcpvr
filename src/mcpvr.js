(function() {
    'use strict';
    window.mcpvr = function(action) {
        /*Always*/
        /*Adjust height of equal-height columns*/
        makeColumnsEqual();

        switch (action) {
            case 'ready':
                /*Only when ready*/
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
