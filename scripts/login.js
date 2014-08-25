$(document).on("deviceready", function(){

    var client_id = "53c7d7c38f7d6"; // Replace text in quotes with your API Key
    var callback_uri = "sycamorelessons://login.html";
    //var callback_uri = "http://127.0.0.1/SycamoreLessons/login.html";
    
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
    
    function me_ready(data) {
        $.each(data, function(key, value){
            localStorage.setItem(key, value);
        });
    
        //localStorage.setItem("Me", JSON.stringify(data) );
    
        console.log("Grabbed me");
        // Uncomment the following line to redirect
        window.location.href = "classes.html";
    }
    
    // Function to store the access token in the client's local (persistent) storage once authentication is completed
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

    //window.open(url,"_self");
    //window.open(url, '_blank', 'location=no,toolbar=no');
    var authWindow = window.open(url, '_blank', 'location=yes,toolbar=yes');

    $(authWindow).on('loadstart', function(e) {
        console.log("Loading started");
        var url = e.originalEvent.url;
        
        console.log("URL: " + url);

        var rawParams = url.split("#");
        console.log("raw params: " + rawParams);

        var oAuthData = parseParams(rawParams[1]);
        console.log("oauth data: " + oAuthData);
                    
        //var token = /\?#access_token=(.+)$/.exec(url);
        //var error = /\?#error=(.+)$/.exec(url);

        console.log("Token: " + token);
        
        if (token || error) {
            authWindow.close();
            
            //var rawParams = window.location.hash.substring(1);
            //var oAuthData = parseParams(rawParams);

            //choose which type of storage you'd like to keep your token in
            setLocalStorage(token);

            //fetch and store data about this user
            SycamoreApi("Me", "me_ready");
        }

    });

});