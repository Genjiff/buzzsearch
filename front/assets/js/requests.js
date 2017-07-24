
function renderGithubResults(url, section) {
  console.log("Requesting", url);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.addEventListener("load", function() {
    if (xhr.status == 200) {
      var json = JSON.parse(xhr.responseText);
      json.items.forEach(function(repository) {

        console.log(repository); 
        var html = "<div><h2><a href='"+ repository.html_url + "'>" + repository.full_name + "</a></h2>"+
                      "<ul>" +
                      "<li>Stars: " + repository.stargazers_count + "</li>" + 
                      "<li>Forks: " + repository.forks + "</li>" + 
                      "</ul></div><br>";

        document.getElementById(section).innerHTML += html;


      });   
    } else {
      console.log("Error");
    }
  });

  xhr.send();
}
