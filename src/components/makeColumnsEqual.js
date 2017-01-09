/**
 * Makes columns that are at the same level equal
 * @param  {[type]} rowSelector [description]
 * @return {[type]}             [description]
 */
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
