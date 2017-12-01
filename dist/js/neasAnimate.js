/* neasAnimate.js
*  Animations and styling
*/

function displayInformation(aye) {
    console.log(aye);
    aye.height *= 1.5;
    aye.width *= 1.5;
    aye.nextElementSibling.style.display = "block";
    aye.onmouseleave = function () {
        aye.nextElementSibling.style.display = "none";
        aye.height /= 1.5;
        aye.width /= 1.5;
    };
}

function setBackground(fragmentId) {
    //console.log(fragmentId);
    switch (fragmentId) {
        case 'life':
            document.body.id = 'fitnessBackground';
            break;
        case 'about':
            document.body.id = 'aboutBackground';
            break;
        case 'showcase':
            document.body.id = 'adventureBackground';
            break;
        case 'development':
            document.body.id = 'developmentBackground';
            break;
        default:
            document.body.id = 'landingBackground';
    }
}