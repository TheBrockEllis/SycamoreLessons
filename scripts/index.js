var checkPage = function(){
    //Only run if twitter-widget exists on page
    //console.log("Checking page");
    var elm = document.getElementsByClassName("content")[0];
    var script = elm.id;
    //console.log(script);
    if(script) {
        $.getScript("scripts/"+elm.id+".js")
        .done(function( script, textStatus ) {
            //console.log( textStatus );
        })
        .fail(function( jqxhr, statusText, errorThrown ) {
            //console.log(errorThrown);
            //console.log(statusText);
            //console.log(jqxhr);
        });
    }
};

window.addEventListener('push', checkPage);

jQuery.ajaxSetup({
    cache: false
});

function SycamoreApi(endpoint, callback, params, data){
    //console.log("Attempting to call API");
    //console.log("Endpoint: " + endpoint);
    //console.log("Callback: " + callback);

    $.ajax({
        url: "https://app.sycamoreeducation.com/api/v1/"+endpoint,
        type: "GET",
        crossDomain: true,
        datatype: 'json',
        processData: false,
        beforeSend: function(xhr){
            var access_token = localStorage.getItem("sycamore_auth");
            xhr.setRequestHeader('Authorization', 'Bearer '+access_token);
        }
    })
    .done(function(data, statusText, xhr){
        //console.log("data: " + data);
        //console.log("status text: " + statusText);
        //console.log("xhrs: " + xhr);
        window[ callback ](data);
    })
    .fail(function(xhr, textStatus, errorThrown) {
        //console.log(xhr);
        //console.log(textStatus);
        //console.log(errorThrown);
    });
}
