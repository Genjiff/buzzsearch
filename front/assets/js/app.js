function checkConnection() {
    var req = new XMLHttpRequest();
    req.open("GET", "https://api.github.com/search/repositories?q=language=python&sort=stars&per_page=1", true);
    req.onreadystatechange = function receiveResponse() {
        // Ready State == 4: The operation is complete (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)
        if (this.readyState == 4) {
            if (this.status == 200) {
                initTweets();
                initRepositories();
            } else if ( this.status == 0) {
                handleNoConnection();
            }
        }
    };
    req.send("");
    req = null;
}

var techName = getTechName();
displaySearchedTechName(techName);
checkConnection();
