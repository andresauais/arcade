var gamesContainer = document.getElementById("gamesContainer");
var goToArcadeBtn = document.getElementById("goToArcade");
var arcade = document.getElementById("arcade");
var usernameInput = document.getElementById("usernameInput");

goToArcadeBtn.addEventListener("click", ()=>{
    document.getElementById("start").style.display = "none";
    arcade.style.display = "block";
})

function disappearGamesContainer(){
    gamesContainer.style.display = "none";
}

window.onload = function(){
    usernameInput.focus();
    usernameInput.addEventListener("keypress", function(e){
        if(e.keyCode == 13){
            if(usernameInput.value != "" && usernameInput.value != undefined){
                goToArcadeBtn.click();
                document.getElementById("username").innerHTML = usernameInput.value;
            }
        }
    });
}

