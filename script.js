// github user finder example

$(document).ready(function() {
  $("#username").focus();
  $(".details").hide();

  $(document).on('keypress', '#username', function(event) {
    if (event.which === 13) { // check the key was <enter>
      var input = $(this);
      var username = input.val();
      $(this).val("");
      getGithubInfo(username);
    }
  });
});

function noUserExist(username) {
  $('#profile h2').html("No user by the name, " + username + ", exists.");
  $('#profile .information').hide();
  $('#profile .avatar').hide();
  $('#profile .details').hide();
}

function getGithubInfo(username) {
  var url = "https://api.github.com/users/" + username;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.onload = function (e) {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        showUser(JSON.parse(xmlhttp.responseText));
        console.log(JSON.parse(xmlhttp.responseText));
      } else {
        noUserExist(username);
      }
    }
  };
  xmlhttp.onerror = function (e) {
    console.error(xmlhttp.statusText);
  };
  xmlhttp.send(null);
}

function showUser(user) {
  $('#profile .information').show();
  $('#profile .details').show();
  $('#profile .avatar').show();
  $('#profile h2').html(user.login + " is GitHub user #" + user.id);
  $('#profile .information').html("<a class='profile' href='"+user.html_url+"'> Go to "+ user.name+"'s profile</a>");
  $('#profile .avatar').html("<img src=" +user.avatar_url + "/>");
  $('#profile .details #followers').html( user.followers );
  $('#profile .details #following').html( user.following );
  $('#profile .details #location').html( user.location );
  $('#profile .details #repos').html( user.public_repos );
}
