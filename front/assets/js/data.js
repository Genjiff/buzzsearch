function getGithubUrl(techName) {
  return "https://api.github.com/search/repositories?q=topic:" + techName + "&language=" + techName + "&sort=stars&per_page=9";
}

function getMeetupUrl(techName) {
  return "http://127.0.0.1:5000/meetup/" + techName;
}

function getTwitterUrl(techName) {
  return "http://127.0.0.1:5000/twitter/" + techName;
}