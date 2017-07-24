function getGithubUrl(techName) {
  return "https://api.github.com/search/repositories?q=topic:" + techName + "&language=" + techName + "&sort=stars&per_page=10";
}

function getMeetupUrl(techName) {
  return "http://127.0.0.1:5000/meetup/" + techName;
}

function getTwitterUrl(techName) {
  return "";
}