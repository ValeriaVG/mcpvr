/*! MCPVR - v0.0.1 - 2016-11-22
* https://valeriavg.github.io/mcpvr/
* Copyright (c) 2016 ValeriaVG <valeria.viana.gusmao@gmail.com>; Licensed GPL-3.0 */
var dockTo=function(elementSelector,dockSelector){
  var element=document.querySelector(elementSelector);
  var dock=document.querySelector(dockSelector);
};

console.log("before");
var makeColumnsEqual = function(rowSelector) {

        if (rowSelector === undefined) {
            rowSelector = '.equal-height';
        }
        var rows = document.querySelectorAll(rowSelector);
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var height = row.clientHeight;
            var columns = row.children;
            var columnsAreInLine = false;
            for (var j = 0; j < columns.length; j++) {
                columnsAreInLine = (columns[j].offsetTop === row.offsetTop);
            }

            for (j = 0; j < columns.length; j++) {
                if (columnsAreInLine) {
                    columns[j].style.height = height + 'px';
                } else {
                    columns[j].style.height = '';
                }
            }

        }
    };
console.log("after");

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
