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

    QUnit.module( "Columns", {

        // This will run before each test in this module.
        beforeEach: function( assert ) {

            this.root = $( "#qunit-fixture" );
            this.columns = 12;

        }
    } );

    QUnit.test( "are equal-height", function( assert ) {

        //Expect(1);
        var row = $( "#qunit-fixture" ).find( ".equal-height" );

        var h = $( row ).css( "height" );
        makeColumnsEqual();
        row.children().each( function() {
          assert.strictEqual( $( this ).css( "height" ), h, $( this ).text() + " should have height of " + h );
        } );


        makeColumnsEqual('.not-equal-height');
        var row = $( "#qunit-fixture" ).find( ".not-equal-height" );


          assert.notEqual( $(row.children()[0] ).css( "height" ), h, $( this ).text() + " should not have height of " + h );
      

    } );

} )( QUnit, jQuery ) );
