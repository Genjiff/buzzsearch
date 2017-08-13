function renderTwitterResults(url, section) {
    console.log("Requesting twitter results", url);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            json.forEach(function (element) {
                var tweetBoxModel = document.getElementsByClassName('tweet-box');
                var newTweetBox = tweetBoxModel[0].cloneNode();

                newTweetBox.classList.remove("invisible");

                newTweetBox.innerHTML = element.html;
                document.getElementById(section).appendChild(newTweetBox);
            });

            var loading = document.querySelector('#tweets-section .loading');
            loading.classList.add('invisible');
        } else {
            var errorBox = document.querySelector('#error-section');
            errorBox.classList.remove('invisible');

            var loadings = document.querySelectorAll('.loading');
            loadings.forEach(function (element) {
                element.classList.add("invisible");
            });

            var results = document.querySelectorAll('.result-section');
            results.forEach(function (element) {
                element.classList.add("invisible");
            });
        }
    });

    xhr.onerror = function () {
        var errorBox = document.querySelector('#error-section');
        errorBox.classList.remove('invisible');

        var loadings = document.querySelectorAll('.loading');
        loadings.forEach(function (element) {
            element.classList.add("invisible");
        });

        var results = document.querySelectorAll('.result-section');
        results.forEach(function (element) {
            element.classList.add("invisible");
        });

    };
    xhr.send();

}

function renderGithubResults(url, section) {
    console.log("Requesting", url);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            json.items.forEach(function (repository) {
                var partial = "<div class='repository'>"+
                    "<h3><a href='"+ repository.html_url  +"' target='_blank'>" + repository.full_name + "</a></h3>" +
                    "<ul>"+
                        "<li>Estrelas: "+ repository.stargazers_count +"</li>"+
                        "<li>Forks: " + repository.forks + "</li>"+
                    "</ul>"+
                "</div>";

                document.getElementById(section).innerHTML += partial;

                var loading = document.querySelector('#github-section .loading');
                loading.classList.add('invisible');
            });
        } else {
            console.log("Error");
        }
    });
    xhr.send();
}


function renderMeetupResults(map, url) {
    console.log("Requesting", url);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            json.forEach(function (techEvent) {
                var position = {'lat': techEvent.group.lat, 'lng': techEvent.group.lon}
                var marker = new google.maps.Marker({
                    position: position,
                    map: map
                });
            });

            var loading = document.querySelector('#maps-section .loading');
            loading.classList.add('invisible');
        } else {
            console.log("Error");
        }
    });

    xhr.send();
}
