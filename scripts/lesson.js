/*
 * File: lesson.js
 * Purpose: Display the text of an individual lesson plans
 * Ready function: lesson_ready
 */

/*
 * Page Events
 */

/*
 * API Data
 */

SycamoreApi("Class/"+window.classID+"/Lessons/"+window.lessonID, "lesson_ready");

function lesson_ready(data){

    $(".title").html(data.Title);

    var content = "";
    content += "<h3>Objectives</h3>";
    content += "<p>"+data.Objectives+"</p>";

    content += "<h3>Resources</h3>";
    content += "<p>"+data.Resources+"</p>";

    content += "<h3>Procedures</h3>";
    content += "<p>"+data.Procedures+"</p>";

    content += "<h3>Evaluation</h3>";
    content += "<p>"+data.Evaluation+"</p>";

    content += "<h3>Notes</h3>";
    content += "<p>"+data.Notes+"</p>";

    content += "<h3>Homework</h3>";
    content += "<p>"+data.Homework+"</p>";

    $(".content-padded").empty().append(content);

}