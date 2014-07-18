/*
 * File: lessons.js
 * Purpose: Display a list of lessons for a class
 * Ready function: lessons_ready
 */

/*
 * Page Events
 */

$(".title").html(window.className);

$("body").on("click", "a.lessonplan", function(){
    window.lessonID = $(this).attr("id");
});

/*
 * API Data
 */

SycamoreApi("School/"+localStorage.schoolID+"/Classes/"+window.classID, "subjects_ready");

function subjects_ready(data) {
    //console.log(data);
}

// GRAB SubjectIDs from API and store them in Subject array to use/display

SycamoreApi("Class/"+window.classID+"/Lessons", "lessons_ready");

function lessons_ready(data){

    var listitems = "";
    $.each(data, function(index, value){
        listitems += "<li class='table-view-cell'>";
        listitems += "<a class='push-right lessonplan' id='"+value.ID+"' href='lesson.html'>";
        listitems += "<strong>"+value.Date+"</strong> " +value.Title;
        listitems += "<span class='badge'>Subject</span>";
        listitems += "</a></li>";
    });

    $("ul").empty().append(listitems);

}