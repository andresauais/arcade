var mainArr = JSON.parse(localStorage.getItem("arr"));
document.getElementById("scoreboardBtn").addEventListener("click", ()=>{
    disappearGamesContainer();
    document.getElementById("scoreboardBtn").disabled = true;
    var scoreboardContainer = document.createElement("div");
    scoreboardContainer.setAttribute("id", "scoreboardContainer");
    
    var scoreboardGrid = document.createElement("div");
    scoreboardGrid.setAttribute("id", "scoreboardGrid");
    scoreboardGrid.setAttribute("class", "tab");

    var whackScoreContent = document.createElement("div");
    whackScoreContent.setAttribute("id", "whackScoreContent");
    whackScoreContent.setAttribute("class", "tabcontent");

    var whackScore = document.createElement("button");
    whackScore.textContent = "Whack a Mole";
    whackScore.setAttribute("id", "whackScore");
    whackScore.setAttribute("class", "tablinks");
    scoreboardGrid.append(whackScore);

    var spaceScoreContent = document.createElement("div");
    spaceScoreContent.setAttribute("id", "spaceScoreContent");
    spaceScoreContent.setAttribute("class", "tabcontent");

    var spaceScore = document.createElement("button");
    spaceScore.textContent = "Space Invaders";
    spaceScore.setAttribute("id", "spaceScore");
    spaceScore.setAttribute("class", "tablinks");
    scoreboardGrid.append(spaceScore);

    scoreboardGrid.append(whackScoreContent);
    scoreboardGrid.append(spaceScoreContent);
    scoreboardContainer.append(scoreboardGrid);

    var backBtn = document.createElement("button");
    backBtn.innerHTML = "Back to Games";
    backBtn.addEventListener("click", ()=>{
        scoreboardContainer.remove();
        gamesContainer.style.display = "flex";
        /*gamesContainer.style.flexDirection = "column";*/
        document.getElementById("scoreboardBtn").disabled = false;
    });

    scoreboardContainer.append(backBtn);
    gamingArea.append(scoreboardContainer);

    whackScore.addEventListener("click", openScore);

    spaceScore.addEventListener("click", openScore);

    function scoresWhack(){
        function compare(a, b) {
            if (a.whack < b.whack){
                return 1;
            }
            if (a.whack > b.whack){
                return -1;
            }
            return 0;
        }
        mainArr.sort(compare);
        mainArr.forEach(element => {
            var div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-around";
            var name = document.createElement("h4");
            name.textContent = element.name;
            div.append(name);
            var scoresName = document.createElement("h4");
            scoresName.textContent = element.whack;
            div.append(scoresName);
            whackScoreContent.append(div);
        });
    }
    function scoresSpace(){
        function compare(a, b) {
            if (a.space < b.space){
                return 1;
            }
            if (a.space > b.space){
                return -1;
            }
                return 0;
        }
        mainArr.sort(compare);
        mainArr.forEach(element => {
            var div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-around";
            var name = document.createElement("h4");
            name.textContent = element.name;
            div.append(name);
            var scoresName = document.createElement("h4");
            scoresName.textContent = element.space;
            div.append(scoresName);
            spaceScoreContent.append(div);
        });
    }
    scoresWhack();
    scoresSpace();

})
function openScore() {
    var i, tab, tablinks;
    tab = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tab.length; i++) {
        tab[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(event.target.id + "Content").style.display = "block";
    //e.currentTarget.className += " active";
    }


