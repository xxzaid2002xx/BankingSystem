

document.getElementById("myButton").onclick = function() {
    var inputVal = document.getElementById("myInput").value;
    var inputVall = document.getElementById("myInput1").value;
    if (inputVal === "admin" && inputVall === "admin") {
        window.location.href = "page1.html";    
    }else{
        playSound()
    }
}

function playSound() {
    var sound = document.getElementById("mySound");
    sound.play();
}
