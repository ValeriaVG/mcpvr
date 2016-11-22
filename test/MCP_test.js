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
    function rgb2hex( rgb ) {
        if ( /^#[0-9A-F]{6}$/i.test( rgb ) ) {
            return rgb;
        }

        rgb = rgb.match( /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/ );

        function hex( x ) {
            return ( "0" + parseInt( x ).toString( 16 ) ).slice( -2 );
        }
        return "#" + hex( rgb[ 1 ] ) + hex( rgb[ 2 ] ) + hex( rgb[ 3 ] );
    }

    QUnit.module( "Material color palette", {

        // This will run before each test in this module.
        beforeEach: function( assert ) {

            this.root = $( "#qunit-fixture" );

        }
    } );

    QUnit.test( "has right bg colors", function( assert ) {

        this.root.find( "#bg-colors>div" ).each( function() {
            assert.strictEqual( rgb2hex( $( this ).css( "background-color" ) ), $( this ).text(), $( this ).prop( "class" ) + " should be " + $( this ).text() );
        } );
    } );

    QUnit.test( "has right text colors", function( assert ) {

        this.root.find( "#text-colors>div" ).each( function() {
            assert.strictEqual( rgb2hex( $( this ).css( "color" ) ), $( this ).text(), $( this ).prop( "class" ) + " should be " + $( this ).text() );
        } );
    } );
    QUnit.test( "has right opaque colors", function( assert ) {

        this.root.find( "#opaque-colors>div.bg" ).each( function() {
            var tmp = $( "<div/>" ).css( "background-color", $( this ).text() );
            $( this.root ).append( tmp );

            assert.strictEqual( $( this ).css( "background-color" ), $( tmp ).css( "background-color" ), $( this ).prop( "class" ) + " should be " + $( this ).text() );
            tmp.remove();
        } );
        this.root.find( "#opaque-colors>div.text" ).each( function() {
            var tmp = $( "<div/>" ).css( "color", $( this ).text() );
            $( this.root ).append( tmp );
            assert.strictEqual( $( this ).css( "color" ), $( tmp ).css( "color" ), $( this ).prop( "class" ) + " should be " + $( this ).text() );
            tmp.remove();
        } );
    } );

} )( QUnit, jQuery ) );
