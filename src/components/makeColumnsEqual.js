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
