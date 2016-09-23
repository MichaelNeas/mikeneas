/*neas.js
* Michael Neas
*/

function setActiveLink(fragmentId){
    var navLocation = document.getElementById("navbar"),
        links = navLocation.children,
        i, link, pageName;
    for(i = 0; i < links.length; i++){
        link = links[i];
        pageName = link.getAttribute("href").substr(1);
        if(pageName === fragmentId){
            link.setAttribute("id", "activeButton");
        } else{
            link.removeAttribute("id");
        }
    }
}

function getContent(fragmentId, callback){
    //ajax request
    var request = new XMLHttpRequest();
    //callback with content from file
    request.onload = function(){
        callback(request.responseText);
    }
    //fetch partial html
    request.open("GET", "pages/" + fragmentId + ".html");
    request.send(null);
}

function navigation(){
    var mainContent = document.getElementById("mainContent");
    //remove hash tag
    fragmentId = location.hash.substr(1);
    //passing callback function for async calls
    getContent(fragmentId, function(content){
        mainContent.innerHTML = content;
    });
    setActiveLink(fragmentId);
}

//if no location hash, send em home
if(!location.hash){
    location.hash = "#home";
}

//initial hash
navigation();

window.addEventListener("hashchange", navigation);