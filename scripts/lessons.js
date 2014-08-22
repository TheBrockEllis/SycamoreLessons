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

SycamoreApi("School/"+localStorage.SchoolID+"/Classes/"+window.classID, "subjects_ready");

var subjects = {};
function subjects_ready(data) {
    //console.log(data);
    if(data.Gradebook.Subjects){
        $.each(data.Gradebook.Subjects, function(index, value){
            var subject_name = value.Name;
            var subject_id = value.ID;
            
            //console.log("Name: " + subject_name + " and ID " + subject_id);
            
            subjects[subject_id] = subject_name; 
        });
    }
    
    //load lessons after subjects are ready
    SycamoreApi("Class/"+window.classID+"/Lessons", "lessons_ready");
    
} //end subjects_ready

function lessons_ready(data){

    var listitems = "";
    $.each(data, function(index, value){
        listitems += "<li class='table-view-cell'>";
        listitems += "<a class='push-right lessonplan' id='"+value.ID+"' href='lesson.html'>";
        listitems += "<strong>"+value.Title+"</strong><p>" +value.Date+"</p>";
        if(subjects.length > 0)listitems += "<span class='badge'>"+ subjects[value.SubjectID] +"</span>";
        listitems += "</a></li>";
    });
    
    $("ul").empty().append(listitems);

} //end lessons_ready
