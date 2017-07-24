function getGithubUrl(techName) {
  return "https://api.github.com/search/repositories?q=topic:" + techName + "&language=" + techName + "&sort=stars&per_page=10";
}

function getMeetupUrl(techName) {
  return "";
}

function getTwitterUrl(techName) {
  return "";
}