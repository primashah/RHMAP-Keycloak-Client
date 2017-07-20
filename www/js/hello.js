document.getElementById("login").onclick = function () {
  document.getElementById("spinner").style.display = "block"
  document.getElementById("description").innerHTML = ""
  keycloakAuth.init({
    onLoad: 'login-required'
  }).success(function () {}).error(function (e) {});

}

document.getElementById("logout").onclick = function () {
  document.getElementById("spinner").style.display = "block"
  document.getElementById("description").innerHTML = ""
  keycloakAuth.logout();

}
document.getElementById("userProfile").onclick = function () {
  document.getElementById("spinner").style.display = "block"
  if (keycloakAuth && keycloakAuth.loadUserProfile) {
    keycloakAuth.loadUserProfile().success(function (profile) {
      document.getElementById("spinner").style.display = "none"
      document.getElementById("description").innerHTML = "<b>User Info</b> <br/>First Name : <b>" + profile.firstName + " </b></br> Last Name: <b>" + profile.lastName + "</b>";
    }).error(function (e) {
      document.getElementById("spinner").style.display = "none";
      var _erromsg = e === 403 ? "Unauthorised Access" : e;
      alert("Error Loading User Profile. Reponse from Keycloak:  " + _erromsg);

    })
  } else {
    alert("User is not logged in");
  }

}
document.getElementById('say_hello').onclick = function () {
  document.getElementById('cloudResponse').innerHTML = "<p>Calling Cloud.....</p>";
  $fh.cloud({
      path: 'hello',
      
      headers: {
        'Authorization': 'Bearer ' + keycloakAuth.token
      },
      data: {
        hello: document.getElementById('hello_to').value
      }
    },
    function (res) {
      document.getElementById('cloudResponse').innerHTML = "<p>" + res.msg + "</p>";
    },
    function (msg, err) {
      document.getElementById('cloudResponse').innerHTML = "<p> Calling Cloud Failed</p>";
      alert('Cloud call failed with error message: ' + msg + '. Error properties: ' + JSON.stringify(err));
    }
  );
};