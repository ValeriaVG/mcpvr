
( ( function( QUnit, $ ) {
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

    QUnit.module( "Vertical Rhythm", {

        // This will run before each test in this module.
        beforeEach: function( assert ) {

            this.root = $( "#qunit-fixture" );
              this.elems = this.root.children();
            this.baseline = 20; //Base-line in pixels
        }
    } );

    QUnit.test( "has rhythm", function( assert ) {

        //Expect(1);
        var baseline = this.baseline;
        this.elems.each( function() {

            assert.strictEqual( $( this ).outerHeight() % baseline, 0, $( this ).prop( "tagName" ) + "#" + $( this ).prop( "id" ) + "." + "." + $( this ).prop( "class" ).split( " " ).join( "." ) + " should have vertical rhythm" );
        } );
        $( "#lorem" ).children().each( function() {
            assert.strictEqual( $( this ).outerHeight() % baseline, 0, $( this ).prop( "tagName" ) + " should have vertical rhythm" );
        } );


    } );

} )( QUnit, jQuery ) );
