function getTechName() {
	var url = new URL(window.location.href);
	return url.searchParams.get("techName");	
}

function displaySearchedTechName() {
	document.querySelector('#search-key-section h2').innerHTML += "<b>" + techName + "</b>";
}

function displayErrorMessage(selector, message) {
	var notfound = document.querySelector(selector);
    var text = document.createTextNode(message);
    notfound.appendChild(text);
    notfound.classList.remove('invisible');
}

function removeLoading(selector) {
	var loadingSelector = selector + ' .loading';
	var loading = document.querySelector(loadingSelector);
	var contains = loading.classList.contains('invisible');

	if (!contains) {
		loading.classList.add('invisible');
	}
}

function showLoading(selector) {
	var loadingSelector = selector + ' .loading';
	var loading = document.querySelector(loadingSelector);
	var contains = loading.classList.contains('invisible');

	if (contains) {
		loading.classList.remove('invisible');
	}
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

function renderTweetBox(section, element) {
	var tweetBoxModel = document.getElementsByClassName('tweet-box');
    var newTweetBox = tweetBoxModel[0].cloneNode();

    newTweetBox.classList.remove("invisible");

    newTweetBox.innerHTML = element.html;
    document.querySelector(section).appendChild(newTweetBox);
}

function renderRepository(section, repository) {
    var partial = "<div class='repository'>"+
        "<h3><a href='"+ repository.html_url  +"' target='_blank'>" + repository.full_name + "</a></h3>" +
        "<ul>"+
            "<li>Estrelas: "+ repository.stargazers_count +"</li>"+
            "<li>Forks: " + repository.forks + "</li>"+
        "</ul>"+
    "</div>";

    document.querySelector(section).innerHTML += partial;
}

function getInfoWindow(techEvent) {
    var location = getFormattedLocation(techEvent);
    return "<h1>"+techEvent.name+"</h1><br /><br />"
           + location + 
           "<a href='" + techEvent.link + "' target='_blank'>Acessar página</a>";
}

function renderMarkerOnMap(techEvent, map) {
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

}