var client_id = "53c7d7c38f7d6"; // Replace text in quotes with your API Key
var callback_uri = "http://127.0.0.1:8080/SycamoreLessons/login.html";

// Function to parse parameters values from hash when these are returned after call to authenticate
function parseParams (params) {
    var sycamoreAuth = Array();
    var authData = params.split("&",4);
    for (i=0; i < authData.length; i++) {
        var paramVal = authData[i].split("=",2);
        sycamoreAuth.push(paramVal[1]);
    }

    return sycamoreAuth;
}

//called after initial auth request to forward into the app
function me_ready(data) {
    $.each(data, function(key, value){
        localStorage.setItem(key, value);
    });

    window.location.href = "classes.html";
}


// Function to store the access token in the client's local (persistent) storage
function setLocalStorage(token){
    localStorage.setItem("sycamore_auth", token);
    return;
}

var path = 'https://app.sycamoreeducation.com/oauth/authorize.php?';
var queryParams = ['client_id=' + client_id,
                   'redirect_uri=' + callback_uri,
                   'scope=general open individual',
                   'response_type=token'];
var query = queryParams.join('&');
var url = path + query;

if (!authWindow) {
    var authWindow = window.open(url, '_blank', 'location=no,toolbar=no');
}
  
$(authWindow).on('loadstart', function(e) {
    console.log("Loading started");
    var url = e.originalEvent.url;
    
    var rawParams = url.hash.substring(1);
    var oAuthData = parseParams(rawParams);
    //var token = /\?#access_token=(.+)$/.exec(url);
    //var error = /\?error=(.+)$/.exec(url);

    console.log(oAuthData);
    
    if (oAuthData[0] || error) {
        authWindow.close();
    
        //choose which type of storage you'd like to keep your token in
        setLocalStorage(oAuthData[0]);
        //setSessionStorage(oAuthData[0]);
        //setCookie(oAuthData[0]);
    
        //fetch and store data about this user
        SycamoreApi("Me", "me_ready");
    }
});

    