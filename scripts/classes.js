/*
 * File: classes.js
 * Purpose: Display a list of classes for a teacher
 * Ready function: classes_ready
 */

console.log("Got to classes.js");

SycamoreApi("Me", "classes_ready");

function classes_ready(){

    $("#logout").click(function(){
        localStorage.clear();
        window.location.href = "index.html";
    });

    //SycamoreApi("look for my classes")
}

