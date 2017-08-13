var techName = getTechName();
document.querySelector('#search-key-section h2').innerHTML += "<b>" + techName + "</b>";

// Called by maps api as a callback
function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('meetupMapResults'), {
        zoom: 1,
        center: uluru
    });

    var meetupUrl = getMeetupUrl(techName);
    renderMeetupResults(map, meetupUrl);
}

function initTweets() {
    var twitterUrl = getTwitterUrl(techName);
    renderTwitterResults(twitterUrl, 'tweets-section');
}

initTweets();

function initRepositories() {
    var githubUrl = getGithubUrl(techName);
    renderGithubResults(githubUrl, "github-section");
}

initRepositories();

