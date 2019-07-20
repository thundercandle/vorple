const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );

const expect = chai.expect;
const { flagValue, vorple } = require( "../utility" );

describe( "layout", () => {
    describe( "UI blocking", () => {
        it( "blocks typing", () => {
            vorple( "layout", "block" );
            $( "#lineinput-field" ).setValue( "abc" );
            expect( $( "#lineinput-field" ).getValue() ).to.equal( "" );
            vorple( "layout", "unblock" );
            $( "#lineinput-field" ).setValue( "def" );
            expect( $( "#lineinput-field" ).getValue() ).to.equal( "def" );
        });

        it( "blocks clicks", () => {
            vorple( "layout", "block" );

            // confirm that the link is there
            expect( ".link-click" ).to.exist;

            // Selenium throws an error if the element is not clickable,
            // catch and ignore
            try {
                $( ".link-click" ).click();
            }
            catch( e ) {}

            // clicking shouldn't have run the command
            expect( flagValue( "link clicked" ) ).to.be.false;

            vorple( "layout", "unblock" );
        });
    });
});