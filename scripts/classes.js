/*
 * File: classes.js
 * Purpose: Display a list of classes for a teacher
 * Ready function: classes_ready
 */

/*
 * Page Events
 */

$("#logout").click(function(){
    localStorage.clear();
    window.location.href = "index.html";
});

$("body").on("click", "a.classroom", function(){
    //console.log("Link clicked");
    window.classID = $(this).attr("id");
    window.className = $(this).attr("name");
});

/*
 * API Data
 */

var userid = localStorage.getItem("UserID");

SycamoreApi("User/"+userid+"/Classes", "classes_ready");

function classes_ready(data){
    var listitems = "";
    $.each(data, function(type, classes){
        listitems += "<li class='table-view-divider'>"+type+"</li>";

        $.each(classes, function(index, value){
            listitems += "<li class='table-view-cell'>";
            listitems += "<a class='push-right classroom' id='"+value.ID+"' name='"+value.Name+"' href='lessons.html'>";
            listitems += "<strong>"+value.Name+"</strong>";
            listitems += "</a></li>";
        });

    });

    $("ul").empty().append(listitems);

}
