/*neas.js
* Michael Neas
*/
(function () {

    var loadedPageCache = {};

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

    function fetchFile(path, callback){
        //ajax request
        var request = new XMLHttpRequest();
        //callback with content from file
        request.onload = function(){
            callback(request.responseText);
        }
        //fetch partial html
        request.open("GET", path);
        request.send(null);
    }

    function getContent(fragmentId, callback){
        if(loadedPageCache[fragmentId]){
            callback(loadedPageCache[fragmentId]);
        } else{
            var path = "pages/" + fragmentId + ".html";
            fetchFile(path, function (content){
                loadedPageCache[fragmentId] = content;
                callback(content);
            });
        }
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
        document.body.style.backgroundColor="tomato";
    }

    //if no location hash, send em home
    if(!location.hash){
        location.hash = "#home";
    }

    //initial hash
    navigation();

    window.addEventListener("hashchange", navigation);
}());