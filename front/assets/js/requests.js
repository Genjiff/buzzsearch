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

function getFormattedLocation(techEvent) {
    console.log(techEvent);
    if (techEvent.venue == undefined) return "";

    var content = "<p>Local: ";
    if (techEvent.venue.city !== undefined) {
        content += techEvent.venue.city;
    }

    if (techEvent.venue.state !== undefined) {
        content += " - " + techEvent.venue.state;
    }

    if (techEvent.venue.country !== undefined) {
        content += " - " + techEvent.venue.country.toUpperCase();
    }    

    content += "</p><br />"
    return content;
}

function getInfoWindow(techEvent) {
    var location = getFormattedLocation(techEvent);
    return "<h1>"+techEvent.name+"</h1><br /><br />"
           + location + 
           "<a href='" + techEvent.link + "' target='_blank'>Acessar página</a>";
}

function renderMeetupResults(map, url) {
    console.log("Requesting", url);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            json.forEach(function (techEvent) {
                var content = getInfoWindow(techEvent);
                var infowindow = new google.maps.InfoWindow({
                    content: content
                });

                var position = {'lat': techEvent.group.lat, 'lng': techEvent.group.lon}
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: techEvent.name
                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
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
