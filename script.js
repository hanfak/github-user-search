// github user finder example

$(document).ready(function() {
  $(document).on('keypress', '#username', function(event) {
    if (event.which === 13) { // check the key was <enter>
      var input = $(this);
      var username = input.val();

      console.log("username was: " + username);
      getGithubInfo(username);
    }
  });
});


function getGithubInfo(username) {
  var url = "https://api.github.com/users/" + username;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();

  var data = xmlhttp.responseText;

  console.log(data);
}
