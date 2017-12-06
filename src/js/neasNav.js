/* neasNav.js
*  Navigation and image loading 
*/
(function () {

    let loadedPageCache = {};

    function navigation(){
        let mainContent = document.getElementById("mainContent");
        //remove hash tag
        fragmentId = location.hash.substr(1);
        //passing callback function for async calls
        getContent(fragmentId, function(content){
            mainContent.innerHTML = content;
            if(fragmentId === 'contact')
                clickME();
        });
        pageManipulations(fragmentId);
    }

    function getContent(fragmentId, callback){
        if(loadedPageCache[fragmentId])
            callback(loadedPageCache[fragmentId]);
        else {
            let path = "pages/" + fragmentId + ".html";
            fetchFile(path, function (content){
                loadedPageCache[fragmentId] = content;
                callback(content);
            });
        }
    }

    function fetchFile(path, callback){
        //ajax request
        let request = new XMLHttpRequest();
        //callback with content from file
        request.onload = function(){
            callback(request.responseText);
        }
        //fetch partial html
        request.open("GET", path);
        request.send(null);
    }


    function pageManipulations(fragid){
        
        setActiveLink(fragmentId);
        setBackground(fragmentId);
    }

    function setActiveLink(fragmentId){
        let navLocation = document.getElementById("navbar"),
            links = navLocation.children,
            i, link, pageName;
        for(i = 0; i < links.length; i++){
            link = links[i];
            pageName = link.getAttribute("href").substr(1);
            if(pageName === fragmentId)
                link.setAttribute("id", "activeButton");
            else
                link.removeAttribute("id");
            
        }
    }

    //if no location hash, send em home
    if(!location.hash){
        location.hash = "#home";
    }

    //initial hash
    navigation();

    window.addEventListener("hashchange", navigation);
}());