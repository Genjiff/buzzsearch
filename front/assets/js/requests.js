function requestApi(url, xhr, onSucccessCallback, onErrorCallback) {
    console.log("Requesting " + url);

    xhr.open("GET", url, true);
    xhr.addEventListener("load", onSucccessCallback);    
    xhr.onerror = onErrorCallback;
    xhr.send();
}

function renderTwitterResults(url, section) {
    var xhr = new XMLHttpRequest();
    var callback = function () {
        if (xhr.status !== 200) {
            displayErrorMessage('#tweets-section .not-found', 'Erro, tente mais tarde.');   
        }

        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            if (json.length == 0) {
                displayErrorMessage('#tweets-section .not-found', 'Não foram encontrados tweets.');
            } 
            
            json.forEach(function (element) {
                renderTweetBox(section, element);
            });
        }

        removeLoading(section);
    };

    requestApi(url, xhr, callback);
}

function renderGithubResults(url, section) {
    var xhr = new XMLHttpRequest();
    var callback = function () {
        if (xhr.status !== 200) {
            displayErrorMessage('#github-section .not-found', 'Erro, tente mais tarde.');   
        }

        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            if (json.items.length == 0) {
                displayErrorMessage('#github-section .not-found', 'Não foram encontrados repositórios.');
            } 

            json.items.forEach(function (element) {
                renderRepository(section, element);
            });
        }

        removeLoading(section);
    };

    requestApi(url, xhr, callback);
}

function renderMeetupResults(map, section, url) {
    var xhr = new XMLHttpRequest();
    var callback = function () {

        if (xhr.status !== 200) {
            displayErrorMessage('#maps-section .not-found', 'Erro, tente mais tarde.');   
        }

        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);

            if (json.length == 0) {
                displayErrorMessage('#maps-section .not-found', 'Não foram encontrados eventos.');
            } 
            
            json.forEach(function (techEvent) {
                renderMarkerOnMap(techEvent, map);
            });
        }

        removeLoading(section);
    };
    requestApi(url, xhr, callback);
}
