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

(function () {
    window.addEventListener('scroll', function () {
        if (window.location.hash === '#home') {
            const windowScroll = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            document.querySelector('.header-logo').style.transform = 'translate(0px, ' + windowScroll / 4 + '%)';
        }
    });

    const startDateTime = new Date(1993, 3, 21, 4, 42, 52, 0); // YYYY (M-1) D H m s ms (start time and date from DB)
    const startStamp = startDateTime.getTime();

    let newDate = new Date();
    let newStamp = newDate.getTime();
    let timer;

    function updateClock() {
        newDate = new Date();
        newStamp = newDate.getTime();
        let diff = Math.round((newStamp - startStamp) / 1000);

        let d = Math.floor(diff / (24 * 60 * 60));
        diff = diff - d * 24 * 60 * 60;
        let h = Math.floor(diff / (60 * 60));
        diff = diff - h * 60 * 60;
        let m = Math.floor(diff / 60);
        diff = diff - m * 60;
        let s = diff;
        if (window.location.hash === '#home') {
            document.getElementById("time-elapsed").innerHTML = `<h4>${d} days, ${h} hour(s), ${m} minute(s), ${s} second(s) spent alive?</h4>`;
        }
    }

    setInterval(updateClock, 1000);

    const contactButton = document.querySelector('.bouncy-button');
})();