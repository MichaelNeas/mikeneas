(function () {
  let loadedPageCache = {};

  function navigation() {
    let mainContent = document.getElementById("mainContent");
    fragmentId = location.hash.substr(1);
    if (fragmentId === "") fragmentId = 'home';
    getContent(fragmentId, content => {
      mainContent.innerHTML = content;
      if (fragmentId === 'contact') clickME();
    });
    pageManipulations(fragmentId);
  }

  function getContent(fragmentId, callback) {
    if (loadedPageCache[fragmentId]) callback(loadedPageCache[fragmentId]);else {
      let path = "pages/" + fragmentId + ".html";
      fetchFile(path, content => {
        loadedPageCache[fragmentId] = content;
        callback(content);
      });
    }
  }

  function fetchFile(path, callback) {
    let request = new XMLHttpRequest();

    request.onload = () => callback(request.responseText);

    request.open("GET", path);
    request.send(null);
  }

  function pageManipulations(fragid) {
    setActiveLink(fragid);
    setBackground(fragid);
  }

  function setActiveLink(fragmentId) {
    let navLocation = document.getElementById("navbar"),
        links = navLocation.children,
        i,
        link,
        pageName;

    for (i = 0; i < links.length; i++) {
      link = links[i];
      pageName = link.getAttribute("href").substr(1);
      if (pageName === fragmentId) link.setAttribute("id", "activeButton");else link.removeAttribute("id");
    }
  }

  if (!location.hash) location.hash = "#home";
  navigation();
  window.addEventListener("hashchange", navigation);
})();