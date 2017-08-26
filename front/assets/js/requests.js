function requestApi(url, xhr, onSucccessCallback, onErrorCallback) {
    console.log("Requesting " + url);

    xhr.open("GET", url, true);
    xhr.onload = onSucccessCallback;
    xhr.onerror = onErrorCallback;
    xhr.send();
}

function renderTwitterResults(url, section) {
    var xhr = new XMLHttpRequest();
    var callback = function () {
        removeLoading(section);

        if (xhr.status !== 200) {
            displayErrorMessage('#tweets-section .error-message', 'Erro, tente mais tarde.');
        }

        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            if (json.length == 0) {
                displayErrorMessage('#tweets-section .error-message', 'Não foram encontrados tweets.');
            } 
            
            json.forEach(function (element) {
                renderTweetBox(section, element);
            });
        }
    };

    var errorCallback = function() {
        removeLoading(section);
        displayErrorMessage('#tweets-section .error-message', 'Erro, tente mais tarde.');
    }
    requestApi(url, xhr, callback, errorCallback);
}

function renderGithubResults(url, section) {
    var xhr = new XMLHttpRequest();
    var callback = function () {
        removeLoading(section);

        if (xhr.status !== 200) {
            displayErrorMessage('#github-section .error-message', 'Erro, tente mais tarde.');   
        }

        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            if (json.items.length == 0) {
                displayErrorMessage('#github-section .error-message', 'Não foram encontrados repositórios.');
            } 

            json.items.forEach(function (element) {
                renderRepository(section, element);
            });
        }
    };

    var errorCallback = function(e) {
        removeLoading(section);
        displayErrorMessage('#github-section .error-message', 'Erro, tente mais tarde.');
    }
    requestApi(url, xhr, callback, errorCallback);
}

function renderMeetupResults(map, section, url) {
    var xhr = new XMLHttpRequest();
    var callback = function () {
        removeLoading(section);

        if (xhr.status !== 200) {
            displayErrorMessage('#maps-section .error-message', 'Erro, tente mais tarde.');   
        }

        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);

            if (json.length == 0) {
                displayErrorMessage('#maps-section .error-message', 'Não foram encontrados eventos.');
            } 
            
            json.forEach(function (techEvent) {
                renderMarkerOnMap(techEvent, map);
            });
        }
    };

    var errorCallback = function() {
        removeLoading(section);
        displayErrorMessage('#maps-section .error-message', 'Erro, tente mais tarde.');
    }
    requestApi(url, xhr, callback, errorCallback);
}
