var techName = getTechName();

// Called by maps api as a callback
function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	var map = new google.maps.Map(document.getElementById('meetupMapResults'), {
	  zoom: 4,
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
	
}

// var githubUrl = getGithubUrl(techName);
// renderGithubResults(githubUrl, "githubResults");
