/* neasAnimate.js
*  Animations and styling
*/

function displayInformation(){
	var imgs = document.images,
    len = imgs.length,
    counter = 0;

	[].forEach.call( imgs, function( img ) {
	    img.addEventListener( 'load', incrementCounter, false );
	    console.log('hi')
	} );

	function incrementCounter() {
	    counter++;
	    if ( counter === len ) {
	        console.log( 'All images loaded!' );
	    }
	}
}

function setBackground(fragmentId){
    //console.log(fragmentId);
    switch(fragmentId){
        case 'fitness':
            document.body.id = 'fitnessBackground';
            break;
        case 'about':
            document.body.id= 'aboutBackground';
            break;
        case 'adventure':
            document.body.id = 'adventureBackground';
            break;
        case 'development':
            document.body.id = 'developmentBackground';
            displayInformation();
            break;
        default:
            document.body.id = 'landingBackground';
    }
}