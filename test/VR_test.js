(function($) {
    /*
      ======== A Handy Little QUnit Reference ========
      http://api.qunitjs.com/

      Test methods:
        module(name, {[setup][ ,teardown]})
        test(name, callback)
        expect(numberOfAssertions)
        stop(increment)
        start(decrement)
      Test assertions:
        ok(value, [message])
        equal(actual, expected, [message])
        notEqual(actual, expected, [message])
        deepEqual(actual, expected, [message])
        notDeepEqual(actual, expected, [message])
        strictEqual(actual, expected, [message])
        notStrictEqual(actual, expected, [message])
        throws(block, [expected], [message])
    */

    module('jQuery#MCPVR', {
        // This will run before each test in this module.
        setup: function() {

            this.root = $('#qunit-fixture');
              this.elems = this.root.children();
            this.baseline = 20; //base-line in pixels
        }
    });

    test('has rhythm', function() {
        //expect(1);
        var baseline=this.baseline;
        this.elems.each(function() {

            strictEqual($(this).outerHeight() % baseline, 0, $(this).prop('tagName')+"#"+$(this).prop('id')+'.'+'.'+$(this).prop('class').split(" ").join(".") + ' should have vertical rhythm');
        });
        $("#lorem").children().each(function() {
            strictEqual($(this).outerHeight() % baseline, 0, $(this).prop('tagName') + ' should have vertical rhythm');
        });
        /*
        test('has right colors', function() {

          $("#text-colors").children().each(function(){
              strictEqual($(this).css('color'), palette[$(this).prop('class').] , $(this).prop('class')+' should be ');
            });
        });
        */

    });

}(jQuery));
