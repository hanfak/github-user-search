// github user finder example

$(document).ready(function() {
  $(document).on('keypress', '#username', function(event) {
    if (event.which === 13) { // check the key was <enter>
      var input = $(this);
      var username = input.val();
      $(this).val("");
      var response = getGithubInfo(username);
      if (response.status == 200) {
        showUser(JSON.parse(response.responseText));
        console.log(JSON.parse(response.responseText));
      } else {
        //other
      }
    }
  });
});


function getGithubInfo(username) {
  var url = "https://api.github.com/users/" + username;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();

  return xmlhttp;
}

function showUser(user) {
  $('#profile .information').show();
  $('#profile .avatar').show();
  $('#profile h2').html(user.login + " is GitHub user #" + user.id);
  $('#profile .information').html("<a class='profile' href='"+user.html_url+"'> Go to "+ user.name+"'s profile</a>");
  $('#profile .avatar').html("<img src=" +user.avatar_url + "/>");
}
