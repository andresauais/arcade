var mainArr = JSON.parse(localStorage.getItem("arr"));
var gamesContainer = document.getElementById("gamesContainer");
var goToArcadeBtn = document.getElementById("goToArcade");
var arcade = document.getElementById("arcade");
var usernameInput = document.getElementById("usernameInput");

goToArcadeBtn.addEventListener("click", ()=>{
    if(usernameInput.value != "" && usernameInput.value != undefined){
        document.getElementById("start").style.display = "none";
        arcade.style.display = "block";
    }
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
                mainArr.push({name: usernameInput.value, space: 0, whack: 0});
                localStorage.setItem("arr", JSON.stringify(mainArr));
            }
        }
    });
}


