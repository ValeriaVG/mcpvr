((function(QUnit, $) {
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

    QUnit.module("Forms", {

        // This will run before each test in this module.
        beforeEach: function(assert) {

            this.root = $("#qunit-fixture");
            this.columns = 12;
            makeFloatingLabels();

        }
    });

    QUnit.test("has labels", function(assert) {

        assert.ok(this.root.find("input").length == this.root.find("label").length);
        this.root.find("label").each(function() {
            var label = this;
            var input = $("input[id=" + $(label).attr("for") + "]");
            assert.equal($(input).attr("placeholder"), $(label).text());
        });



    });

  /*  QUnit.test("makes labels active on typing", function(assert) {



        this.root.find("label").each(function() {
            var label = this;
            console.log(label);
            var input = $("input[id=" + $(label).attr("for") + "]");

            input.val('test');
            input.trigger('keyup');
            console.log(input[0].value);

            assert.ok($(label).hasClass('active'));
        });



    });*/

})(QUnit, jQuery));
